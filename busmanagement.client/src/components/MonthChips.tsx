interface Props {
  months: { key: string; label: string }[];
  activeKey: string;
  onSelect: (key: string) => void;
}

const MonthChips = ({ months, activeKey, onSelect }: Props) => {
  if (months.length === 0) return null;

  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {months.map((m) => {
        const active = m.key === activeKey;
        return (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-[#F5A623] text-[#16213A]' : 'bg-white/10 text-[#C9D0DE]'
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
};

export default MonthChips;
