interface Props {
  busNum: string;
  distance: number;
  cost: number;
}

const currency = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const BusBreakdownRow = ({ busNum, distance, cost }: Props) => {
  const costPerKm = distance > 0 ? cost / distance : null;

  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#16213A] font-display text-sm text-[#F5A623]">
        {busNum.slice(0, 3).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-base leading-tight text-[#16213A]">{busNum}</p>
        <p className="text-xs text-[#6B7280]">
          {distance.toLocaleString('en-IN')} km · {currency(cost)}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-medium text-[#16213A]">{costPerKm !== null ? `₹${costPerKm.toFixed(2)}` : '—'}</p>
        <p className="text-[10px] text-[#9CA3AF]">per km</p>
      </div>
    </div>
  );
};

export default BusBreakdownRow;
