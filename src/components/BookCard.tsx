import { Trash2 } from 'lucide-react';
import {
  STATUS_META,
  STATUS_ORDER,
  type Book,
  type ReadingStatus,
} from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const meta = STATUS_META[book.status];

  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`}
          />
          <h3 className="font-serif text-lg leading-snug text-stone-800">
            {book.title}
          </h3>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label="Delete book"
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-stone-200 px-2 py-1 text-xs font-medium text-stone-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.badge}`}
        >
          {meta.label}
        </span>
        <select
          value={book.status}
          onChange={(e) =>
            onStatusChange(book.id, e.target.value as ReadingStatus)
          }
          className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-stone-700 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
          aria-label="Change reading status"
        >
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
