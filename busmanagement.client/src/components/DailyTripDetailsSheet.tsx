import type { dailyResponseDto } from "../types/DailyTrip/dailyResponseDto";
import { getTripDiesel, getTripDistance, parseNumber } from "../types/DailyTripUtils";

interface Props {
  trip: dailyResponseDto | null;
  onClose: () => void;
  onDeleteRequest: () => void;
}

const DailyTripDetailsSheet = ({ trip, onClose, onDeleteRequest }: Props) => {
  if (!trip) return null;
  const distance = getTripDistance(trip);
  const diesel = getTripDiesel(trip);

  return (
    <div className="fixed inset-0 z-30 flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full rounded-t-2xl bg-[#FAF9F6] p-5 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA]" />

        <h2 className="font-display text-xl text-[#16213A]">{trip.busNum}</h2>
        <p className="text-sm text-[#6B7280]">
          {new Date(trip.tripDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-lg bg-[#EFEDE6] px-3 py-2.5">
            <p className="text-[11px] text-[#8B96AC]">Driver</p>
            <p className="mt-0.5 font-medium text-[#16213A]">{trip.name}</p>
          </div>
          <div className="rounded-lg bg-[#EFEDE6] px-3 py-2.5">
            <p className="text-[11px] text-[#8B96AC]">Distance</p>
            <p className="mt-0.5 font-medium text-[#16213A]">{distance.toFixed(0)} km</p>
          </div>
          <div className="rounded-lg bg-[#EFEDE6] px-3 py-2.5">
                      <p className="text-[11px] text-[#8B96AC]">Mileage</p>
                      <p className="mt-0.5 font-medium text-[#16213A]">{parseNumber(trip.average).toFixed(1)} km/l</p>
          </div>
          <div className="rounded-lg bg-[#EFEDE6] px-3 py-2.5">
            <p className="text-[11px] text-[#8B96AC]">Diesel used</p>
            <p className="mt-0.5 font-medium text-[#16213A]">{diesel.toFixed(1)} L</p>
          </div>
          <div className="rounded-lg bg-[#EFEDE6] px-3 py-2.5">
            <p className="text-[11px] text-[#8B96AC]">Morning reading</p>
            <p className="mt-0.5 font-medium text-[#16213A]">{trip.morningMeterReading.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-lg bg-[#EFEDE6] px-3 py-2.5">
            <p className="text-[11px] text-[#8B96AC]">Evening reading</p>
            <p className="mt-0.5 font-medium text-[#16213A]">{trip.eveningMeterReading.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#E7E4DA] py-3 text-sm font-medium text-[#6B7280]"
          >
            Close
          </button>
          <button
            onClick={onDeleteRequest}
            className="flex-1 rounded-lg border border-[#E4B8AC] bg-[#FBEAE5] py-3 text-sm font-medium text-[#8A3222]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyTripDetailsSheet;
