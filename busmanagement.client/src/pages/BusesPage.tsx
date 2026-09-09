import { useEffect, useState } from 'react';
import type { busResponseDto } from '../types/bus/busResponseDto';
import { busService } from '../services/busService';
import type { addBusDto } from '../types/bus/addBusDto';
import BusRow from '../components/BusRow';
import AddBusSheet from '../components/AddBusSheet';
import BusDetailsSheet from '../components/BusDetailsSheet';
import ConfirmDialog from '../components/ConfirmDialog';

type Filter = 'all' | 'active' | 'inactive';

const BusesPage = () => {
    const [buses, setBuses] = useState<busResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [selectedBus, setSelectedBus] = useState<busResponseDto | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadBuses = async () => {
    setLoading(true);
    setError(null);
      try {
          const data = await busService.getAllBuses();
            setBuses(data);
    } catch {
      setError('Could not load the fleet. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  const filteredBuses = buses.filter((bus) => {
    if (filter === 'active') return bus.isActive;
    if (filter === 'inactive') return !bus.isActive;
    return true;
  });

  const activeCount = buses.filter((b) => b.isActive).length;

    const handleSave = async (payload: addBusDto) => {
    setSaving(true);
    setError(null);
    try {
      await busService.addBus(payload);
      await loadBuses();
      setAddOpen(false);
    } catch {
      setError('Could not save the bus. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBus) return;
    const target = selectedBus;
    setConfirmOpen(false);
    setSelectedBus(null);
    try {
      await busService.deleteBus(target.busId);
      setBuses((prev) => prev.filter((b) => b.busId !== target.busId));
    } catch {
      setError('Could not remove the bus. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      {/* Top app bar */}
      <header className="sticky top-0 z-20 bg-[#16213A] px-5 pt-6 pb-5 text-[#FAF9F6] shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <p className="text-xs tracking-wide text-[#8B96AC]">Fleet management</p>
        <div className="mt-1 flex items-end justify-between">
          <h1 className="font-display text-3xl leading-none">Buses</h1>
          <p className="text-sm text-[#C9D0DE]">
            {activeCount} of {buses.length} on the road
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          {(['all', 'active', 'inactive'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === f
                  ? 'bg-[#F5A623] font-medium text-[#16213A]'
                  : 'bg-white/10 text-[#C9D0DE] hover:bg-white/20'
              }`}
            >
              {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Inactive'}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4">
        {error && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-[#E4B8AC] bg-[#FBEAE5] px-4 py-3 text-sm text-[#8A3222]">
            <span>{error}</span>
            <button onClick={loadBuses} className="font-medium underline underline-offset-2">
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

        {!loading && filteredBuses.length === 0 && !error && (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFEDE6] text-2xl">
              🚌
            </div>
            <p className="font-display text-xl text-[#16213A]">
              {buses.length === 0 ? 'No buses on the roster yet' : 'No buses match this filter'}
            </p>
            <p className="mt-1 max-w-[240px] text-sm text-[#6B7280]">
              {buses.length === 0
                ? 'Add your first bus to start tracking the fleet.'
                : 'Try a different filter to see more buses.'}
            </p>
          </div>
        )}

        {!loading && filteredBuses.length > 0 && (
          <div className="divide-y divide-[#E7E4DA] overflow-hidden rounded-xl bg-white shadow-sm">
                      {filteredBuses.map((bus) => (
                          <BusRow key={bus.busId} bus={bus} onTap={() => setSelectedBus(bus)} />
            ))}
          </div>
        )}
      </main>

      {/* Floating action button */}
      <button
        onClick={() => setAddOpen(true)}
        aria-label="Add bus"
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#16213A] shadow-[0_6px_18px_rgba(245,166,35,0.45)] transition-transform active:scale-95"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#16213A" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>

          <AddBusSheet open={addOpen} saving={saving} onClose={() => setAddOpen(false)} onSave={handleSave} />

          <BusDetailsSheet
        bus={confirmOpen ? null : selectedBus}
        onClose={() => setSelectedBus(null)}
        onDeleteRequest={() => setConfirmOpen(true)}
      />

          <ConfirmDialog
        open={confirmOpen}
        title={`Remove ${selectedBus?.busNum ?? ''}?`}
        description="This bus will be removed from the roster. This can't be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BusesPage;
