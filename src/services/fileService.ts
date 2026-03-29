import Tesseract from 'tesseract.js';
import * as pdfjs from 'pdfjs-dist';
import { extractTextWithAI } from './aiService';

// Use local worker via Vite's ?url import for better reliability
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromImage = async (file: File): Promise<string> => {
  try {
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
