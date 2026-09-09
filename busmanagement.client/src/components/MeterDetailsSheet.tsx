import type { meterResponseDto } from '../../types/Meter/meterResponseDto';

interface Props {
  entry: meterResponseDto | null;
  busNum?: string;
  onClose: () => void;
  onDeleteRequest: () => void;
}

const formatDate = (value: Date | string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const MeterDetailsSheet = ({ entry, busNum, onClose, onDeleteRequest }: Props) => {
  if (!entry) return null;

  const distance = entry.eveningMeterReading - entry.morningMeterReading;

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={onClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-[#16213A] text-[#F5A623]">
            <span className="font-display text-lg leading-none">{distance}</span>
            <span className="mt-0.5 text-[10px] leading-none text-[#C9D0DE]">km</span>
          </div>
          <div>
            <h2 className="font-display text-2xl leading-tight text-[#16213A]">{busNum ?? `Bus #${entry.busId}`}</h2>
            <p className="mt-0.5 text-sm text-[#6B7280]">{formatDate(entry.travelDate)}</p>
          </div>
        </div>

        <dl className="mt-5 space-y-3 border-t border-[#E7E4DA] pt-4">
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Morning reading</dt>
            <dd className="font-medium text-[#16213A]">{entry.morningMeterReading.toLocaleString('en-IN')}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Evening reading</dt>
            <dd className="font-medium text-[#16213A]">{entry.eveningMeterReading.toLocaleString('en-IN')}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Distance covered</dt>
            <dd className="font-medium text-[#16213A]">{distance.toLocaleString('en-IN')} km</dd>
          </div>
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1 text-xs font-medium text-[#6B7280]">Morning photo</p>
            <a href={entry.morningMeterImgUrl} target="_blank" rel="noreferrer">
              <img
                src={entry.morningMeterImgUrl}
                alt="Morning meter reading"
                className="h-24 w-full rounded-lg border border-[#E7E4DA] object-cover"
              />
            </a>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-[#6B7280]">Evening photo</p>
            <a href={entry.eveningMeterImgUrl} target="_blank" rel="noreferrer">
              <img
                src={entry.eveningMeterImgUrl}
                alt="Evening meter reading"
                className="h-24 w-full rounded-lg border border-[#E7E4DA] object-cover"
              />
            </a>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#D9D5C9] py-3 text-sm font-medium text-[#16213A]"
          >
            Close
          </button>
          <button
            onClick={onDeleteRequest}
            className="flex-1 rounded-lg bg-[#B23A2B] py-3 text-sm font-medium text-white"
          >
            Remove entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeterDetailsSheet;
