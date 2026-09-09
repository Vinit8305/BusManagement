import { useEffect, useMemo, useState } from 'react';
import type { meterResponseDto } from '../types/Meter/meterResponseDto';
import type { busResponseDto } from '../types/bus/busResponseDto';
import { meterService } from '../services/meterService';
import { busService } from '../services/busService';
import type { addMeterDto } from '../types/Meter/addMeterDto';
import MeterRow from '../components/MeterRow';
import AddMeterSheet from '../components/AddMeterSheet';
import MeterDetailsSheet from '../components/MeterDetailsSheet';
import ConfirmDialog from '../components/ConfirmDialog';


const MetersPage = () => {
    const [entries, setEntries] = useState<meterResponseDto[]>([]);
    const [buses, setBuses] = useState<busResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [selectedEntry, setSelectedEntry] = useState<meterResponseDto | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const busNumById = useMemo(() => {
    const map = new Map<number, string>();
    buses.forEach((bus) => map.set(bus.busId, bus.busNum));
    return map;
  }, [buses]);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
      try {
          const [meterData, busData] = await Promise.all([meterService.getAllMeter(), busService.getAllBuses()]);
      const sorted = [...meterData].sort(
        (a, b) => new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime(),
      );
      setEntries(sorted);
      setBuses(busData);
    } catch {
      setError('Could not load the meter log. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const busNum = busNumById.get(entry.busId) ?? '';
    return busNum.toLowerCase().includes(q);
  });

  const totalDistance = entries.reduce((sum, e) => sum + (e.eveningMeterReading - e.morningMeterReading), 0);

    const handleSave = async (payload: addMeterDto) => {
    setSaving(true);
    setError(null);
    try {
      await meterService.addBus(payload);
      await loadAll();
      setAddOpen(false);
    } catch {
      setError('Could not save the reading. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEntry) return;
    const target = selectedEntry;
    setConfirmOpen(false);
    setSelectedEntry(null);
    try {
      await meterService.deleteBus(target.meterId);
      setEntries((prev) => prev.filter((e) => e.meterId !== target.meterId));
    } catch {
      setError('Could not remove the entry. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      <header className="sticky top-0 z-20 bg-[#16213A] px-5 pt-6 pb-5 text-[#FAF9F6] shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <p className="text-xs tracking-wide text-[#8B96AC]">Fleet management</p>
        <div className="mt-1 flex items-end justify-between">
          <h1 className="font-display text-3xl leading-none">Meter log</h1>
          <p className="text-sm text-[#C9D0DE]">{totalDistance.toLocaleString('en-IN')} km logged</p>
        </div>

        <div className="mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by bus number"
            className="w-full rounded-lg bg-white/10 px-3.5 py-2.5 text-sm text-[#FAF9F6] placeholder:text-[#8B96AC] outline-none focus:bg-white/20"
          />
        </div>
      </header>

      <main className="px-4 pt-4">
        {error && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-[#E4B8AC] bg-[#FBEAE5] px-4 py-3 text-sm text-[#8A3222]">
            <span>{error}</span>
            <button onClick={loadAll} className="font-medium underline underline-offset-2">
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-[#EFEDE6]" />
            ))}
          </div>
        )}

        {!loading && filteredEntries.length === 0 && !error && (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFEDE6] text-2xl">
              🛞
            </div>
            <p className="font-display text-xl text-[#16213A]">
              {entries.length === 0 ? 'No readings logged yet' : 'No entries match that search'}
            </p>
            <p className="mt-1 max-w-[240px] text-sm text-[#6B7280]">
              {entries.length === 0
                ? 'Log the first meter reading to start tracking distance.'
                : 'Try a different bus number.'}
            </p>
          </div>
        )}

        {!loading && filteredEntries.length > 0 && (
          <div className="divide-y divide-[#E7E4DA] overflow-hidden rounded-xl bg-white shadow-sm">
                      {filteredEntries.map((entry) => (
                          <MeterRow
                key={entry.meterId}
                entry={entry}
                busNum={busNumById.get(entry.busId)}
                onTap={() => setSelectedEntry(entry)}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setAddOpen(true)}
        aria-label="Log a reading"
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#16213A] shadow-[0_6px_18px_rgba(245,166,35,0.45)] transition-transform active:scale-95"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#16213A" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>

          <AddMeterSheet
        open={addOpen}
        saving={saving}
        buses={buses}
        onClose={() => setAddOpen(false)}
        onSave={handleSave}
      />

          <MeterDetailsSheet
        entry={confirmOpen ? null : selectedEntry}
        busNum={selectedEntry ? busNumById.get(selectedEntry.busId) : undefined}
        onClose={() => setSelectedEntry(null)}
        onDeleteRequest={() => setConfirmOpen(true)}
      />

          <ConfirmDialog
        open={confirmOpen}
        title="Remove this reading?"
        description="This meter entry will be removed from the log. This can't be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MetersPage;
