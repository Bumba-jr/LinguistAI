import type { Language } from '../store/useAppStore';

// tesseract.js and pdfjs-dist are two of the heaviest dependencies in the app
// and are only needed the moment a user actually drops a file, so they are
// dynamically imported below instead of being part of the entry bundle.
let tesseractPromise: Promise<typeof import('tesseract.js')> | null = null;
const loadTesseract = async (): Promise<typeof import('tesseract.js')> => {
  tesseractPromise ??= import('tesseract.js');
  const mod = await tesseractPromise;
  // tesseract.js is a CJS module (`export =`) — some interop builds expose it
  // only under .default, others as the namespace itself.
  return ((mod as any).default ?? mod);
};

let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;
const loadPdfjs = () => (pdfjsPromise ??= (async () => {
  const pdfjs = await import('pdfjs-dist');
  // Use local worker via Vite's ?url import for better reliability
  const { default: pdfWorker } = await import('pdfjs-dist/build/pdf.worker.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
  return pdfjs;
})());

const OCR_LANGUAGES: Record<Language, string> = {
  French: 'fra+eng',
  Spanish: 'spa+eng',
  German: 'deu+eng',
  Japanese: 'jpn+eng',
  Italian: 'ita+eng',
  Portuguese: 'por+eng',
  Chinese: 'chi_sim+eng',
};

const recognize = async (image: File | HTMLCanvasElement, language: Language) => {
  const Tesseract = await loadTesseract();
  const { data: { text } } = await Tesseract.recognize(image, OCR_LANGUAGES[language] ?? 'eng');
  return text.trim();
};

export const extractTextFromImage = async (file: File, language: Language = 'French'): Promise<string> => {
  const text = await recognize(file, language);
  if (!text) throw new Error('No readable text was found. Try a clearer image or paste the text directly.');
  return text;
};

export const extractTextFromPDF = async (file: File, language: Language = 'French'): Promise<string> => {
  const pdfjs = await loadPdfjs();
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages: string[] = [];
  let scannedPages = 0;

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).filter(Boolean).join(' ').trim();
      if (pageText.length >= 10) {
        pages.push(pageText);
        page.cleanup();
        continue;
      }

      // Scanned pages have no text layer. Render just those pages locally and
      // OCR them in the selected study language.
      scannedPages += 1;
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      try {
        const context = canvas.getContext('2d');
        if (!context) throw new Error(`Could not render PDF page ${pageNumber} for OCR.`);
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const scannedText = await recognize(canvas, language);
        if (scannedText) pages.push(scannedText);
      } finally {
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
      }
    }
  } finally {
    await pdf.destroy();
  }

  const fullText = pages.join('\n\n').trim();
  if (!fullText) throw new Error('No readable text was found. This PDF may be blank or too blurry to scan.');
  if (scannedPages > 0) console.info(`[fileService] OCR processed ${scannedPages} scanned PDF page(s).`);
  return fullText;
};
