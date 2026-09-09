import { useState } from 'react';
import type { addEmployeeDto } from '../../types/employee/addEmployeeDto';
import type { busResponseDto } from '../../types/bus/busResponseDto';

interface Props {
  open: boolean;
  saving: boolean;
  buses: busResponseDto[];
  onClose: () => void;
  onSave: (payload: addEmployeeDto) => void;
}

const ROLES = ['Driver', 'Conductor', 'Mechanic', 'Cleaner', 'Supervisor', 'Other'];

const todayIso = () => new Date().toISOString().slice(0, 10);

const AddEmployeeSheet = ({ open, saving, buses, onClose, onSave }: Props) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [contactNumber, setContactNumber] = useState('');
  const [salary, setSalary] = useState('');
  const [joinDate, setJoinDate] = useState(todayIso());
  const [busId, setBusId] = useState<string>('');
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const isValid =
    name.trim().length > 0 &&
    contactNumber.trim().length > 0 &&
    salary.trim().length > 0 &&
    !Number.isNaN(Number(salary)) &&
    busId.length > 0;

  const reset = () => {
    setName('');
    setRole(ROLES[0]);
    setContactNumber('');
    setSalary('');
    setJoinDate(todayIso());
    setBusId('');
    setTouched(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid) return;
    onSave({
      name: name.trim(),
      role,
      contactNumber: contactNumber.trim(),
      salary: Number(salary),
      joinDate,
      busId: Number(busId),
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={handleClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <h2 className="font-display text-2xl text-[#16213A]">Add an employee</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Bring someone onto the crew.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
            {touched && name.trim().length === 0 && (
              <p className="mt-1 text-xs text-[#B23A2B]">Enter a name.</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Contact number</label>
            <input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="e.g. 98765 43210"
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
            {touched && contactNumber.trim().length === 0 && (
              <p className="mt-1 text-xs text-[#B23A2B]">Enter a contact number.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#16213A]">Salary</label>
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 25000"
                className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
              />
              {touched && (salary.trim().length === 0 || Number.isNaN(Number(salary))) && (
                <p className="mt-1 text-xs text-[#B23A2B]">Enter a valid amount.</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#16213A]">Joined on</label>
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Assigned bus</label>
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            >
              <option value="">Select a bus</option>
              {buses.map((bus) => (
                <option key={bus.busId} value={bus.busId}>
                  {bus.busNum}
                </option>
              ))}
            </select>
            {touched && busId.length === 0 && (
              <p className="mt-1 text-xs text-[#B23A2B]">Assign a bus.</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 rounded-lg border border-[#D9D5C9] py-3 text-sm font-medium text-[#16213A]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 rounded-lg bg-[#16213A] py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Add employee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeSheet;
