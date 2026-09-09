import type { dailyResponseDto } from "../types/DailyTrip/dailyResponseDto";
import { getTripDiesel, getTripDistance } from "../types/DailyTripUtils";


interface Props {
    trip: dailyResponseDto;
  onTap: () => void;
}

const DailyTripRow = ({ trip, onTap }: Props) => {
    const distance = getTripDistance(trip);
    const diesel = getTripDiesel(trip);
  const date = new Date(trip.tripDate);

  return (
    <button
      onClick={onTap}
      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors active:bg-[#F5F3EE]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFEDE6] text-sm font-semibold text-[#16213A]">
          {trip.busNum ? trip.busNum.slice(-2) : '—'}
        </div>
        <div>
          <p className="font-medium text-[#16213A]">{trip.busNum}</p>
          <p className="text-xs text-[#8B96AC]">
            {trip.name} · {date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-base text-[#16213A]">{distance.toFixed(0)} km</p>
        <p className="text-xs text-[#8B96AC]">{diesel > 0 ? `${diesel.toFixed(1)} L` : '—'}</p>
      </div>
    </button>
  );
};

export default DailyTripRow;
