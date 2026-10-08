export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; badge: string; dot: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  reading: {
    label: 'Reading',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
  },
  finished: {
    label: 'Finished',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
};

export const STATUS_ORDER: ReadingStatus[] = [
  'want-to-read',
  'reading',
  'finished',
];

export type FilterValue = 'all' | ReadingStatus;
