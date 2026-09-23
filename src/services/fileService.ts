import { extractTextWithAI } from './aiService';

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

export const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    const Tesseract = await loadTesseract();
    const { data: { text } } = await Tesseract.recognize(file, 'fra+eng', {
      logger: m => console.log(m)
    });

    if (text && text.trim().length > 20) {
      return text;
    }

    // If local OCR is poor, fallback to Gemini
    console.log('Local OCR returned little text, falling back to AI...');
    return await extractTextWithAI(file);
  } catch (error) {
    console.warn('Local OCR failed, falling back to AI:', error);
    return await extractTextWithAI(file);
  }
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const pdfjs = await loadPdfjs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    if (fullText && fullText.trim().length > 20) {
      return fullText;
    }

    // If PDF has no text layer (scanned), fallback to Gemini
    console.log('PDF has no text layer, falling back to AI...');
    return await extractTextWithAI(file);
  } catch (error) {
    console.warn('PDF extraction failed, falling back to AI:', error);
    return await extractTextWithAI(file);
  }
};
