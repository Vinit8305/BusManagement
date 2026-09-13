import { useState } from 'react';
import type { busResponseDto } from '../types/bus/busResponseDto';
import type { addPetrolDto } from '../types/Petrol/AddPetrolDto';

interface Props {
  open: boolean;
    saving: boolean;
    buses: busResponseDto[];
    onClose: () => void;
    onSave: (payload: addPetrolDto) => void;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const AddPetrolSheet = ({ open, saving, buses, onClose, onSave }: Props) => {
  const [busId, setBusId] = useState('');
  const [fillDate, setFillDate] = useState(todayIso());
  const [liters, setLiters] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const litersNum = Number(liters);
  const priceNum = Number(pricePerLiter);
  const totalNum = Number(totalCost);

  const isValid =
    busId.length > 0 &&
    fillDate.length > 0 &&
    liters.trim().length > 0 &&
    !Number.isNaN(litersNum) &&
    litersNum > 0 &&
    pricePerLiter.trim().length > 0 &&
    !Number.isNaN(priceNum) &&
    priceNum > 0 &&
    totalCost.trim().length > 0 &&
    !Number.isNaN(totalNum) &&
    totalNum > 0;

  const applyComputedTotal = (nextLiters: string, nextPrice: string) => {
    const l = Number(nextLiters);
    const p = Number(nextPrice);
    if (!Number.isNaN(l) && !Number.isNaN(p) && l > 0 && p > 0) {
      setTotalCost((l * p).toFixed(2));
    }
  };

  const handleLitersChange = (value: string) => {
    setLiters(value);
    applyComputedTotal(value, pricePerLiter);
  };

  const handlePriceChange = (value: string) => {
    setPricePerLiter(value);
    applyComputedTotal(liters, value);
  };

  const reset = () => {
    setBusId('');
    setFillDate(todayIso());
    setLiters('');
    setPricePerLiter('');
    setTotalCost('');
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
      busId: Number(busId),
      fillDate,
      liters: litersNum,
      pricePerLiter: priceNum,
      totalCost: totalNum,
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={handleClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <h2 className="font-display text-2xl text-[#16213A]">Log a fill-up</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Record petrol for a bus.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Bus</label>
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
            {touched && busId.length === 0 && <p className="mt-1 text-xs text-[#B23A2B]">Select a bus.</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Fill-up date</label>
            <input
              type="date"
              value={fillDate}
              onChange={(e) => setFillDate(e.target.value)}
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#16213A]">Liters</label>
              <input
                value={liters}
                onChange={(e) => handleLitersChange(e.target.value)}
                inputMode="decimal"
                placeholder="e.g. 40"
                className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#16213A]">Price / liter</label>
              <input
                value={pricePerLiter}
                onChange={(e) => handlePriceChange(e.target.value)}
                inputMode="decimal"
                placeholder="e.g. 96.50"
                className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Total cost</label>
            <input
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              inputMode="decimal"
              placeholder="Auto-calculated, edit if it differs"
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
            <p className="mt-1 text-xs text-[#6B7280]">
              Fills in automatically from liters × price — adjust to match your receipt if it differs.
            </p>
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
            {saving ? 'Saving…' : 'Log fill-up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPetrolSheet;
