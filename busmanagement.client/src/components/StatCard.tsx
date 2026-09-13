interface Props {
  icon: string;
  label: string;
  value: string;
  hint?: string;
}

const StatCard = ({ icon, label, value, hint }: Props) => (
  <div className="rounded-xl bg-white p-4 shadow-sm">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF9F6] text-base">{icon}</div>
    <p className="mt-2 text-xs font-medium text-[#6B7280]">{label}</p>
    <p className="mt-0.5 font-display text-2xl text-[#16213A]">{value}</p>
    {hint && <p className="mt-1 text-xs text-[#9CA3AF]">{hint}</p>}
  </div>
);

export default StatCard;
