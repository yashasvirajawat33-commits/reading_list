import { useCallback, useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Book[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(loadBooks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
      /* ignore quota errors */
    }
  }, [books]);

  const addBook = useCallback(
    (title: string, status: ReadingStatus): string | null => {
      const trimmed = title.trim();
      if (!trimmed) return null;
      if (trimmed.length > 60) {
        return 'Book title must be 60 characters or fewer.';
      }
      const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');
      const exists = books.some(
        (b) => b.title.toLowerCase().replace(/\s+/g, ' ') === normalized
      );
      if (exists) {
        return 'This book is already in your reading list.';
      }
      const book: Book = {
        id: crypto.randomUUID(),
        title: trimmed,
        status,
        createdAt: Date.now(),
      };
      setBooks((prev) => [book, ...prev]);
      return null;
    },
    [books]
  );

  const updateStatus = useCallback((id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { books, addBook, updateStatus, removeBook };
}
