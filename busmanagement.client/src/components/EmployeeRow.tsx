import type { employeeResponseDto } from '../../types/employee/employeeResponseDto';

interface Props {
  employee: employeeResponseDto;
  busNum?: string;
  onTap: () => void;
}

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const EmployeeRow = ({ employee, busNum, onTap }: Props) => {
  return (
    <button
      onClick={onTap}
      className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors active:bg-[#F7F5F0]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16213A] font-display text-base text-[#F5A623]">
        {initials(employee.name)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-lg leading-tight text-[#16213A]">{employee.name}</p>
        <p className="text-sm text-[#6B7280]">
          {employee.role}
          {busNum ? ` · ${busNum}` : ''}
        </p>
      </div>

      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#C4C0B4]">
        <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default EmployeeRow;
