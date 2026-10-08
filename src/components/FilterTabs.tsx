import { STATUS_META, STATUS_ORDER, type FilterValue } from '@/types';

interface FilterTabsProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

const TAB_LABELS: Record<FilterValue, string> = {
  all: 'All',
  'want-to-read': 'Want to Read',
  reading: 'Reading',
  finished: 'Finished',
};

const TAB_ORDER: FilterValue[] = ['all', ...STATUS_ORDER];

export function FilterTabs({ value, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TAB_ORDER.map((tab) => {
        const active = value === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            {tab !== 'all' && (
              <span
                className={`h-2 w-2 rounded-full ${STATUS_META[tab].dot}`}
              />
            )}
            {TAB_LABELS[tab]}
            <span
              className={`rounded-full px-1.5 text-xs ${
                active
                  ? 'bg-white/20 text-white'
                  : 'bg-stone-100 text-stone-500'
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
