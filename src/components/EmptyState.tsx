import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500">
        <BookOpen className="h-8 w-8" />
      </div>
      <p className="font-serif text-xl text-stone-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
