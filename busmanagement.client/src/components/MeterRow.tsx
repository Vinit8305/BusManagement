import type { meterResponseDto } from '../../types/Meter/meterResponseDto';

interface Props {
  entry: meterResponseDto;
  busNum?: string;
  onTap: () => void;
}

const formatDate = (value: Date | string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const MeterRow = ({ entry, busNum, onTap }: Props) => {
  const distance = entry.eveningMeterReading - entry.morningMeterReading;

  return (
    <button
      onClick={onTap}
      className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors active:bg-[#F7F5F0]"
    >
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#16213A] text-[#F5A623]">
        <span className="font-display text-base leading-none">{distance}</span>
        <span className="mt-0.5 text-[9px] leading-none text-[#C9D0DE]">km</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-lg leading-tight text-[#16213A]">{busNum ?? `Bus #${entry.busId}`}</p>
        <p className="text-sm text-[#6B7280]">{formatDate(entry.travelDate)}</p>
      </div>

      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#C4C0B4]">
        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default MeterRow;
