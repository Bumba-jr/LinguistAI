// IndexedDB offline cache for lectures and flashcards
const DB_NAME = 'linguistai_offline';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

const openDB = (): Promise<IDBDatabase> => {
    if (db) return Promise.resolve(db);
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = e => {
            const d = (e.target as IDBOpenDBRequest).result;
            if (!d.objectStoreNames.contains('lectures')) d.createObjectStore('lectures', { keyPath: 'id' });
            if (!d.objectStoreNames.contains('flashcards')) d.createObjectStore('flashcards', { keyPath: 'id' });
            if (!d.objectStoreNames.contains('notes')) d.createObjectStore('notes', { keyPath: 'id' });
        };
        req.onsuccess = e => { db = (e.target as IDBOpenDBRequest).result; resolve(db!); };
        req.onerror = () => reject(req.error);
    });
};

const put = async (store: string, item: any) => {
    const d = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = d.transaction(store, 'readwrite');
        tx.objectStore(store).put(item);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};

const getAll = async <T>(store: string): Promise<T[]> => {
    const d = await openDB();
    return new Promise((resolve, reject) => {
        const tx = d.transaction(store, 'readonly');
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result as T[]);
        req.onerror = () => reject(req.error);
    });
};

const remove = async (store: string, id: string) => {
    const d = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = d.transaction(store, 'readwrite');
        tx.objectStore(store).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};

export const offlineCache = {
    saveLecture: (lecture: any) => put('lectures', lecture),
    getLectures: () => getAll<any>('lectures'),
    removeLecture: (id: string) => remove('lectures', id),
    saveFlashcard: (card: any) => put('flashcards', card),
    getFlashcards: () => getAll<any>('flashcards'),
    saveNote: (note: any) => put('notes', { ...note, id: note.id || 'default' }),
    getNotes: () => getAll<any>('notes'),
};

export const isOnline = () => navigator.onLine;
