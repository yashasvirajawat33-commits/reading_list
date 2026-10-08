import { useState } from 'react';
import { BookPlus, AlertCircle } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type ReadingStatus } from '@/types';

const MAX_TITLE_LENGTH = 60;

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => string | null;
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const result = onAdd(trimmed, status);
    if (result) {
      setError(result);
      return;
    }
    setError(null);
    setTitle('');
    setStatus('want-to-read');
  }

  const isOverLimit = title.trim().length > MAX_TITLE_LENGTH;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="book-title"
            className="mb-1.5 block text-sm font-medium text-stone-600"
          >
            Book title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(null);
            }}
            placeholder="e.g. The Great Gatsby"
            maxLength={MAX_TITLE_LENGTH + 20}
            className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-stone-800 placeholder:text-stone-400 transition focus:bg-white focus:outline-none focus:ring-2 ${
              isOverLimit
                ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                : 'border-stone-300 focus:border-amber-400 focus:ring-amber-200'
            }`}
          />
        </div>
        <div className="sm:w-44">
          <label
            htmlFor="book-status"
            className="mb-1.5 block text-sm font-medium text-stone-600"
          >
            Status
          </label>
          <select
            id="book-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-stone-800 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={!title.trim() || isOverLimit}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-800 px-5 py-2.5 font-medium text-white transition hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <BookPlus className="h-5 w-5" />
          Add Book
        </button>
      </div>

      <div className="mt-2 flex min-h-[1.25rem] items-center justify-between">
        {error ? (
          <p className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        ) : (
          <span />
        )}
        <span
          className={`text-xs ${
            isOverLimit ? 'text-red-500' : 'text-stone-400'
          }`}
        >
          {title.trim().length}/{MAX_TITLE_LENGTH}
        </span>
      </div>
    </form>
  );
}
