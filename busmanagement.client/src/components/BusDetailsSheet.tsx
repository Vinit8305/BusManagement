import type { busResponseDto } from '../../types/bus/busResponseDto';

interface Props {
  bus: busResponseDto | null;
  onClose: () => void;
  onDeleteRequest: () => void;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BusDetailsSheet = ({ bus, onClose, onDeleteRequest }: Props) => {
  if (!bus) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={onClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <div className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl font-display text-xl ${
              bus.isActive ? 'bg-[#16213A] text-[#F5A623]' : 'bg-[#E7E4DA] text-[#8A8272]'
            }`}
          >
            {bus.busNum.slice(0, 3).toUpperCase()}
          </div>
          <div>
            <h2 className="font-display text-2xl leading-tight text-[#16213A]">{bus.busNum}</h2>
            <span
              className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                bus.isActive ? 'bg-[#E4F3E9] text-[#2E8B57]' : 'bg-[#F5E7E3] text-[#B23A2B]'
              }`}
            >
              {bus.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <dl className="mt-5 space-y-3 border-t border-[#E7E4DA] pt-4">
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Fleet ID</dt>
            <dd className="font-medium text-[#16213A]">#{bus.busId}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">In service since</dt>
            <dd className="font-medium text-[#16213A]">{formatDate(bus.busStartedDateAt)}</dd>
          </div>
        </dl>

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
            Remove bus
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusDetailsSheet;
