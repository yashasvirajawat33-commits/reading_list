import { BookOpen, BookMarked, BookCheck } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const stats = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      accent: 'text-stone-700',
      bg: 'bg-stone-100',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookMarked,
      accent: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Finished',
      value: finished,
      icon: BookCheck,
      accent: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-3 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm sm:flex-row sm:gap-3 sm:text-left"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.accent}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-serif text-xl font-semibold leading-none text-stone-800 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 truncate text-xs text-stone-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
