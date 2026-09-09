import type { busResponseDto } from '../../types/bus/busResponseDto';

interface Props {
  bus: busResponseDto;
  onTap: () => void;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const BusRow = ({ bus, onTap }: Props) => {
  return (
    <button
      onClick={onTap}
      className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors active:bg-[#F7F5F0]"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-display text-lg ${
          bus.isActive ? 'bg-[#16213A] text-[#F5A623]' : 'bg-[#E7E4DA] text-[#8A8272]'
        }`}
      >
        {bus.busNum.slice(0, 3).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-lg leading-tight text-[#16213A]">{bus.busNum}</p>
        <p className="text-sm text-[#6B7280]">On roster since {formatDate(bus.busStartedDateAt)}</p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
          bus.isActive ? 'bg-[#E4F3E9] text-[#2E8B57]' : 'bg-[#F5E7E3] text-[#B23A2B]'
        }`}
      >
        {bus.isActive ? 'Active' : 'Inactive'}
      </span>

      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#C4C0B4]">
        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default BusRow;
