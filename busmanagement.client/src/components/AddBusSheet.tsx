import { useState } from 'react';
import type { addBusDto } from '../../types/bus/addBusDto';

interface Props {
  open: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (payload: addBusDto) => void;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const AddBusSheet = ({ open, saving, onClose, onSave }: Props) => {
  const [busNum, setBusNum] = useState('');
  const [busStartedDateAt, setBusStartedDateAt] = useState(todayIso());
  const [isActive, setIsActive] = useState(true);
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const isValid = busNum.trim().length > 0 && busStartedDateAt.length > 0;

  const reset = () => {
    setBusNum('');
    setBusStartedDateAt(todayIso());
    setIsActive(true);
    setTouched(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid) return;
    onSave({ busNum: busNum.trim(), busStartedDateAt, isActive });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={handleClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <h2 className="font-display text-2xl text-[#16213A]">Add a bus</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Put a new bus on the roster.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Bus number</label>
            <input
              value={busNum}
              onChange={(e) => setBusNum(e.target.value)}
              placeholder="e.g. MP09 AB 1234"
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
            {touched && busNum.trim().length === 0 && (
              <p className="mt-1 text-xs text-[#B23A2B]">Enter a bus number.</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">In service since</label>
            <input
              type="date"
              value={busStartedDateAt}
              onChange={(e) => setBusStartedDateAt(e.target.value)}
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#FAF9F6] px-3.5 py-3">
            <div>
              <p className="text-sm font-medium text-[#16213A]">Active</p>
              <p className="text-xs text-[#6B7280]">Bus is currently running routes</p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive((v) => !v)}
              aria-pressed={isActive}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                isActive ? 'bg-[#2E8B57]' : 'bg-[#D1D5DB]'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  isActive ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
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
            {saving ? 'Saving…' : 'Add bus'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBusSheet;
