import { useEffect, useMemo, useState } from 'react';
import type { busResponseDto } from '../types/bus/busResponseDto';
import type { meterResponseDto } from '../types/Meter/meterResponseDto';
import type { addDailyTripDto } from '../types/DailyTrip/addMeterDto';

// Swap this for your real employee type/service — it's shaped to match the
// busResponseDto pattern already used elsewhere in the app.
export interface employeeResponseDto {
  empId: number;
  name: string;
}

interface Props {
  open: boolean;
  saving: boolean;
  buses: busResponseDto[];
  meters: meterResponseDto[]; // meter readings not yet linked to a daily trip
  employees: employeeResponseDto[];
  onClose: () => void;
  onSave: (payload: addDailyTripDto) => void;
}

const AddDailyTripSheet = ({ open, saving, buses, meters, employees, onClose, onSave }: Props) => {
  const [meterId, setMeterId] = useState<number | ''>('');
  const [empId, setEmpId] = useState<number | ''>('');
  const [dieselLiters, setDieselLiters] = useState('');

  useEffect(() => {
    if (!open) {
      setMeterId('');
      setEmpId('');
      setDieselLiters('');
    }
  }, [open]);

  const selectedMeter = useMemo(() => meters.find((m) => m.meterId === meterId), [meters, meterId]);
  const selectedBus = useMemo(
    () => (selectedMeter ? buses.find((b) => b.busId === selectedMeter.busId) : undefined),
    [selectedMeter, buses],
  );

  const distance = selectedMeter
    ? Math.max(0, selectedMeter.eveningMeterReading - selectedMeter.morningMeterReading)
    : 0;
  const liters = parseFloat(dieselLiters);
  const average = liters > 0 && distance > 0 ? distance / liters : 0;

  const canSave = meterId !== '' && empId !== '' && liters > 0 && !saving;

  const handleSave = () => {
    if (!selectedMeter || !selectedBus || empId === '') return;
    const employee = employees.find((e) => e.empId === empId);
    if (!employee) return;

    onSave({
      busId: selectedBus.busId,
      empId: employee.empId,
      meterId: selectedMeter.meterId,
      tripDate: selectedMeter.travelDate,
      busNum: selectedBus.busNum,
      name: employee.name,
      morningMeterReading: selectedMeter.morningMeterReading,
      eveningMeterReading: selectedMeter.eveningMeterReading,
      distanceCoverd: distance.toFixed(1),
      average: average.toFixed(2),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full rounded-t-2xl bg-[#FAF9F6] p-5 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA]" />
        <h2 className="font-display text-xl text-[#16213A]">Log a daily trip</h2>
        <p className="mt-0.5 text-sm text-[#6B7280]">Assign a driver to a meter reading and record diesel used.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-[#6B7280]">Meter reading</label>
            <select
              value={meterId}
              onChange={(e) => setMeterId(e.target.value ? Number(e.target.value) : '')}
              className="mt-1 w-full rounded-lg border border-[#E7E4DA] bg-white px-3 py-2.5 text-sm text-[#16213A] outline-none focus:border-[#16213A]"
            >
              <option value="">Select an unassigned reading</option>
              {meters.map((m) => {
                const bus = buses.find((b) => b.busId === m.busId);
                return (
                  <option key={m.meterId} value={m.meterId}>
                    {bus?.busNum ?? `Bus #${m.busId}`} · {new Date(m.travelDate).toLocaleDateString('en-IN')} ·{' '}
                    {Math.max(0, m.eveningMeterReading - m.morningMeterReading)} km
                  </option>
                );
              })}
            </select>
            {meters.length === 0 && (
              <p className="mt-1 text-xs text-[#8A3222]">
                No unassigned meter readings. Log one in the meter log first.
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B7280]">Driver</label>
            <select
              value={empId}
              onChange={(e) => setEmpId(e.target.value ? Number(e.target.value) : '')}
              className="mt-1 w-full rounded-lg border border-[#E7E4DA] bg-white px-3 py-2.5 text-sm text-[#16213A] outline-none focus:border-[#16213A]"
            >
              <option value="">Select a driver</option>
              {employees.map((e) => (
                <option key={e.empId} value={e.empId}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B7280]">Diesel used (litres)</label>
            <input
              type="number"
              inputMode="decimal"
              value={dieselLiters}
              onChange={(e) => setDieselLiters(e.target.value)}
              placeholder="e.g. 18.5"
              className="mt-1 w-full rounded-lg border border-[#E7E4DA] bg-white px-3 py-2.5 text-sm text-[#16213A] outline-none focus:border-[#16213A]"
            />
          </div>

          {selectedMeter && (
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-[#EFEDE6] px-3 py-2.5 text-center">
              <div>
                <p className="text-[11px] text-[#8B96AC]">Distance</p>
                <p className="font-display text-base text-[#16213A]">{distance.toFixed(0)} km</p>
              </div>
              <div>
                <p className="text-[11px] text-[#8B96AC]">Mileage</p>
                <p className="font-display text-base text-[#16213A]">{average > 0 ? average.toFixed(1) : '—'}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#8B96AC]">Diesel</p>
                <p className="font-display text-base text-[#16213A]">{liters > 0 ? liters.toFixed(1) : '—'} L</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#E7E4DA] py-3 text-sm font-medium text-[#6B7280]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 rounded-lg bg-[#F5A623] py-3 text-sm font-semibold text-[#16213A] disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save trip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDailyTripSheet;
