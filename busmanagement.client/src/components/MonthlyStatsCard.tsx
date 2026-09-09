import type { MonthGroup } from '../utils/dailyTripUtils';

interface Props {
  group: MonthGroup;
}

const StatBlock = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex-1 rounded-lg bg-white/10 px-3 py-2.5">
    <p className="text-[11px] text-[#8B96AC]">{label}</p>
    <p className={`mt-0.5 font-display text-lg leading-none ${accent ? 'text-[#F5A623]' : 'text-[#FAF9F6]'}`}>
      {value}
    </p>
  </div>
);

const MonthlyStatsCard = ({ group }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2.5 rounded-xl bg-white/[0.06] p-3">
      <StatBlock
        label="Distance covered"
        value={`${group.totalDistance.toLocaleString('en-IN', { maximumFractionDigits: 0 })} km`}
        accent
      />
      <StatBlock label="Diesel consumed" value={`${group.totalDiesel.toFixed(1)} L`} />
      <StatBlock label="Avg mileage" value={group.avgMileage > 0 ? `${group.avgMileage.toFixed(1)} km/l` : '—'} />
      <StatBlock label="Trips, buses used" value={`${group.tripCount}, ${group.busesUsed}`} />
    </div>
  );
};

export default MonthlyStatsCard;
