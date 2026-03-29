import React, { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useAppStore } from '../store/useAppStore';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, CloudCheck, Cloud, Sparkles, BookOpen } from 'lucide-react';
import { saveNote } from '../services/dbService';
import { debounce } from 'lodash';

const Editor = () => {
  const { notes, setNotes, user, setGenerationMode } = useAppStore();
  const [isSaving, setIsSaving] = React.useState(false);

  const debouncedSave = useCallback(
    debounce(async (content: string, userId: string) => {
      setIsSaving(true);
      try {
        await saveNote(content, userId);
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }, 2000),
    []
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing your notes here...',
      }),
    ],
    content: notes,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setNotes(html);
      if (user) {
        debouncedSave(html, user.id);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] max-w-none p-4',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-xl bg-white shadow-sm overflow-hidden" id="note-editor-container">
      <div className="border-b bg-stone-50 p-2 flex flex-wrap items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-stone-200 ${editor.isActive('bold') ? 'bg-stone-200' : ''}`}
            id="btn-bold"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-stone-200 ${editor.isActive('italic') ? 'bg-stone-200' : ''}`}
            id="btn-italic"
          >
            <Italic size={18} />
          </button>
          <div className="w-px h-6 bg-stone-300 mx-1 self-center" />
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-stone-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-stone-200' : ''}`}
            id="btn-h1"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-stone-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-stone-200' : ''}`}
            id="btn-h2"
          >
            <Heading2 size={18} />
          </button>
          <div className="w-px h-6 bg-stone-300 mx-1 self-center" />
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-stone-200 ${editor.isActive('bulletList') ? 'bg-stone-200' : ''}`}
            id="btn-bullet-list"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-stone-200 ${editor.isActive('orderedList') ? 'bg-stone-200' : ''}`}
            id="btn-ordered-list"
          >
            <ListOrdered size={18} />
          </button>
        </div>

        {user && (
          <div className="px-3 flex items-center gap-2 text-xs font-medium text-stone-400">
            {isSaving ? (
              <>
                <Cloud className="w-4 h-4 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CloudCheck className="w-4 h-4 text-emerald-500" />
                <span>Saved to cloud</span>
              </>
            )}
          </div>
        )}
      </div>
      <EditorContent editor={editor} />
      
      <div className="p-4 border-t bg-stone-50 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => {
            setGenerationMode('lecture');
            setTimeout(() => {
              const generateBtn = document.getElementById('btn-generate');
              if (generateBtn) generateBtn.click();
            }, 100);
          }}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all"
          id="btn-generate-lecture-from-editor"
        >
          <BookOpen size={18} />
          Generate Lecture
        </button>
        <button
          onClick={() => {
            setGenerationMode('quiz');
            setTimeout(() => {
              const generateBtn = document.getElementById('btn-generate');
              if (generateBtn) generateBtn.click();
            }, 100);
          }}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100"
          id="btn-generate-quiz-from-editor"
        >
          <Sparkles size={18} />
          Generate Quiz
        </button>
      </div>
    </div>
  );
};

export default Editor;
