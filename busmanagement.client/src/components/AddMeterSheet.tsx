import { useState } from 'react';
import type { addMeterDto } from '../../types/Meter/addMeterDto';
import type { busResponseDto } from '../../types/bus/busResponseDto';

interface Props {
  open: boolean;
  saving: boolean;
  buses: busResponseDto[];
  onClose: () => void;
  onSave: (payload: addMeterDto) => void;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const ImagePreview = ({ url }: { url: string }) => {
  const [failed, setFailed] = useState(false);

  if (!url.trim()) return null;
  if (failed) {
    return <p className="mt-1.5 text-xs text-[#B23A2B]">Couldn't load a preview for that URL.</p>;
  }

  return (
    <img
      src={url}
      onError={() => setFailed(true)}
      alt=""
      className="mt-1.5 h-20 w-full rounded-lg border border-[#D9D5C9] object-cover"
    />
  );
};

const AddMeterSheet = ({ open, saving, buses, onClose, onSave }: Props) => {
  const [busId, setBusId] = useState('');
  const [travelDate, setTravelDate] = useState(todayIso());
  const [morningReading, setMorningReading] = useState('');
  const [eveningReading, setEveningReading] = useState('');
  const [morningImgUrl, setMorningImgUrl] = useState('');
  const [eveningImgUrl, setEveningImgUrl] = useState('');
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const morningNum = Number(morningReading);
  const eveningNum = Number(eveningReading);

  const isValid =
    busId.length > 0 &&
    travelDate.length > 0 &&
    morningReading.trim().length > 0 &&
    eveningReading.trim().length > 0 &&
    !Number.isNaN(morningNum) &&
    !Number.isNaN(eveningNum) &&
    eveningNum >= morningNum &&
    morningImgUrl.trim().length > 0 &&
    eveningImgUrl.trim().length > 0;

  const reset = () => {
    setBusId('');
    setTravelDate(todayIso());
    setMorningReading('');
    setEveningReading('');
    setMorningImgUrl('');
    setEveningImgUrl('');
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
      travelDate: new Date(travelDate),
      morningMeterReading: morningNum,
      eveningMeterReading: eveningNum,
      morningMeterImgUrl: morningImgUrl.trim(),
      eveningMeterImgUrl: eveningImgUrl.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
      <div onClick={handleClose} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 pb-8 shadow-xl sm:rounded-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E7E4DA] sm:hidden" />

        <h2 className="font-display text-2xl text-[#16213A]">Log a reading</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Record today's meter for a bus.</p>

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
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Travel date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#16213A]">Morning reading</label>
              <input
                value={morningReading}
                onChange={(e) => setMorningReading(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 142004"
                className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#16213A]">Evening reading</label>
              <input
                value={eveningReading}
                onChange={(e) => setEveningReading(e.target.value)}
                inputMode="numeric"
                placeholder="e.g. 142146"
                className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
              />
            </div>
          </div>
          {touched && !Number.isNaN(morningNum) && !Number.isNaN(eveningNum) && eveningNum < morningNum && (
            <p className="-mt-2 text-xs text-[#B23A2B]">Evening reading can't be less than the morning reading.</p>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Morning meter photo URL</label>
            <input
              value={morningImgUrl}
              onChange={(e) => setMorningImgUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
            <ImagePreview url={morningImgUrl} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#16213A]">Evening meter photo URL</label>
            <input
              value={eveningImgUrl}
              onChange={(e) => setEveningImgUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-[#D9D5C9] bg-[#FAF9F6] px-3.5 py-2.5 text-[#16213A] outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/30"
            />
            <ImagePreview url={eveningImgUrl} />
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
            {saving ? 'Saving…' : 'Log reading'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMeterSheet;
