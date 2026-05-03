import type { Method } from '../types';

interface Props {
  methods: Method[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function MethodSelector({ methods, selectedId, onChange }: Props) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
        Profile method
      </p>
      <div className="flex flex-wrap gap-2">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              m.id === selectedId
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      {methods.find(m => m.id === selectedId) && (
        <p className="mt-2 text-xs text-gray-500 italic">
          {methods.find(m => m.id === selectedId)!.description}
        </p>
      )}
    </div>
  );
}
