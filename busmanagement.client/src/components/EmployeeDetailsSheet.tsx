import type { employeeResponseDto } from '../../types/employee/employeeResponseDto';

interface Props {
  employee: employeeResponseDto | null;
  busNum?: string;
  onClose: () => void;
  onDeleteRequest: () => void;
}

const formatDate = (value: Date | string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const EmployeeDetailsSheet = ({ employee, busNum, onClose, onDeleteRequest }: Props) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={onClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16213A] font-display text-lg text-[#F5A623]">
            {initials(employee.name)}
          </div>
          <div>
            <h2 className="font-display text-2xl leading-tight text-[#16213A]">{employee.name}</h2>
            <span className="mt-1 inline-block rounded-full bg-[#F5E9D3] px-2.5 py-0.5 text-xs font-medium text-[#8A6116]">
              {employee.role}
            </span>
          </div>
        </div>

        <dl className="mt-5 space-y-3 border-t border-[#E7E4DA] pt-4">
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Employee ID</dt>
            <dd className="font-medium text-[#16213A]">#{employee.empId}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Contact number</dt>
            <dd className="font-medium text-[#16213A]">{employee.contactNumber}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Salary</dt>
            <dd className="font-medium text-[#16213A]">{formatCurrency(employee.salary)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Joined on</dt>
            <dd className="font-medium text-[#16213A]">{formatDate(employee.joinDate)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-[#6B7280]">Assigned bus</dt>
            <dd className="font-medium text-[#16213A]">{busNum ?? `#${employee.busId}`}</dd>
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
            Remove employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsSheet;
