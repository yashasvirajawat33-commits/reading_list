import { useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import { useBooks } from '@/hooks/useBooks';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterTabs } from '@/components/FilterTabs';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { Summary } from '@/components/Summary';
import type { FilterValue } from '@/types';

export default function App() {
  const { books, addBook, updateStatus, removeBook } = useBooks();
  const [filter, setFilter] = useState<FilterValue>('all');

  const counts = useMemo<Record<FilterValue, number>>(
    () => ({
      all: books.length,
      'want-to-read': books.filter((b) => b.status === 'want-to-read').length,
      reading: books.filter((b) => b.status === 'reading').length,
      finished: books.filter((b) => b.status === 'finished').length,
    }),
    [books]
  );

  const filteredBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-800 text-amber-400">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold leading-tight text-stone-800">
              Reading List
            </h1>
            <p className="text-sm text-stone-500">
              Track the books you want to read, are reading, and have finished.
            </p>
          </div>
        </header>

        {/* Add form */}
        <div className="mb-6">
          <AddBookForm onAdd={addBook} />
        </div>

        {/* Summary */}
        {books.length > 0 && (
          <div className="mb-6">
            <Summary
              total={counts.all}
              reading={counts.reading}
              finished={counts.finished}
            />
          </div>
        )}

        {/* Filters + content */}
        {books.length > 0 ? (
          <>
            <div className="mb-5">
              <FilterTabs
                value={filter}
                onChange={setFilter}
                counts={counts}
              />
            </div>

            {filteredBooks.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={updateStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-12 text-center text-stone-500">
                No books in this category.
              </p>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
