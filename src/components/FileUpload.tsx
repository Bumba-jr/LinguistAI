import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image as ImageIcon, Loader2, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { extractTextFromImage, extractTextFromPDF } from '../services/fileService';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

const FileUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setExtractedText, setGenerationMode } = useAppStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus('idle');
    setErrorMessage(null);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith('image/')) {
        text = await extractTextFromImage(file);
      }
      
      if (!text || text.trim().length < 10) {
        throw new Error('No readable text found in this file. Please try a different file or copy-paste your notes into the editor.');
      }
      
      setExtractedText(text);
      setStatus('success');
    } catch (error: any) {
      console.error('Extraction failed:', error);
      setErrorMessage(error.message || 'Failed to extract text. Please try a different file.');
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  }, [setExtractedText]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[300px]",
          isDragActive ? "border-emerald-500 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300",
          status === 'success' && "border-emerald-200 bg-emerald-50"
        )}
        id="dropzone"
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-stone-600 font-medium">Extracting text from your file...</p>
            <p className="text-stone-400 text-sm mt-1">This may take a few seconds</p>
          </div>
        ) : status === 'success' ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
            <p className="text-stone-800 font-semibold">Text extracted successfully!</p>
            <p className="text-stone-500 text-sm mt-1">Choose your preferred learning method below</p>
            
            <div className="flex flex-col items-center gap-4 mt-8 w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setGenerationMode('quiz');
                    setTimeout(() => {
                      const generateBtn = document.getElementById('btn-generate');
                      if (generateBtn) generateBtn.click();
                    }, 100);
                  }}
                  className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                  id="btn-generate-quiz-direct"
                >
                  <Sparkles size={18} />
                  Generate Quiz
                </button>

                <button 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setGenerationMode('lecture');
                    setTimeout(() => {
                      const generateBtn = document.getElementById('btn-generate');
                      if (generateBtn) generateBtn.click();
                    }, 100);
                  }}
                  className="flex-1 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-100 flex items-center justify-center gap-2"
                  id="btn-generate-lecture-direct"
                >
                  <BookOpen size={18} />
                  Generate Lecture
                </button>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); setStatus('idle'); }}
                className="text-sm text-stone-400 font-medium hover:text-stone-600 transition-colors"
                id="btn-upload-another"
              >
                Upload another file
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              {isDragActive ? "Drop it here!" : "Upload your notes"}
            </h3>
            <p className="text-stone-500 text-center max-w-xs mb-8">
              Drag and drop your PDF or images here, or click to browse
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-lg text-stone-500 text-sm border border-stone-100">
                <FileText size={14} />
                <span>PDF</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-lg text-stone-500 text-sm border border-stone-100">
                <ImageIcon size={14} />
                <span>Images</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {status === 'error' && (
        <p className="text-red-500 text-sm text-center mt-4 px-4">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
