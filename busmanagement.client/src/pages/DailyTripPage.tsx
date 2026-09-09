import { useEffect, useMemo, useState } from 'react';
import type { addDailyTripDto } from '../types/DailyTrip/addMeterDto';
import type { busResponseDto } from '../types/bus/busResponseDto';
import type { meterResponseDto } from '../types/Meter/meterResponseDto';
import { dailyService } from '../services/dailyService';
import { busService } from '../services/busService';
import { meterService } from '../services/meterService';
import DailyTripRow from '../components/DailyTripRow';
import AddDailyTripSheet, { type employeeResponseDto } from '../components/AddDailyTripSheet';
import DailyTripDetailsSheet from '../components/DailyTripDetailsSheet';
import ConfirmDialog from '../components/ConfirmDialog';
import MonthlyStatsCard from '../components/MonthlyStatsCard';
import MonthChips from '../components/MonthChips';
import type { dailyResponseDto } from '../types/DailyTrip/dailyResponseDto';
import { exportMonthToCsv, groupByMonth, monthKey } from '../types/DailyTripUtils';

// TODO: replace with your real employee service once it exists — same
// shape as busService.getAllBuses(). Kept as a stub so this file compiles
// and the page degrades gracefully (empty driver list) until then.
const employeeServiceStub = {
  getAllEmployees: async (): Promise<employeeResponseDto[]> => [],
};

const DailyTripPage = () => {
    const [trips, setTrips] = useState<dailyResponseDto[]>([]);
  const [buses, setBuses] = useState<busResponseDto[]>([]);
  const [meters, setMeters] = useState<meterResponseDto[]>([]);
  const [employees, setEmployees] = useState<employeeResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState<dailyResponseDto | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [activeMonth, setActiveMonth] = useState<string>('');

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tripData, busData, meterData, empData] = await Promise.all([
        dailyService.getAllDailyTrip(),
        busService.getAllBuses(),
        meterService.getAllMeter(),
        employeeServiceStub.getAllEmployees(),
      ]);
      setTrips(tripData);
      setBuses(busData);
      setMeters(meterData);
      setEmployees(empData);
      setActiveMonth((prev) => {
          if (prev) return prev;
          return tripData.length > 0 ? monthKey(tripData[0].tripDate) : monthKey(new Date().toISOString());
      });
    } catch {
      setError('Could not load daily trips. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const monthGroups = useMemo(() => groupByMonth(trips), [trips]);

  const unassignedMeters = useMemo(() => {
    const usedMeterIds = new Set(trips.map((t) => t.meterId));
    return meters.filter((m) => !usedMeterIds.has(m.meterId));
  }, [trips, meters]);

  const currentGroup = monthGroups.find((g) => g.key === activeMonth) ?? monthGroups[0];

  const filteredTrips = (currentGroup?.trips ?? []).filter((trip) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return trip.busNum?.toLowerCase().includes(q) || trip.name?.toLowerCase().includes(q);
  });

  const handleSave = async (payload: addDailyTripDto) => {
    setSaving(true);
    setError(null);
    try {
      await dailyService.addDailyTrip(payload);
      await loadAll();
      setAddOpen(false);
    } catch {
      setError('Could not save the trip. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTrip) return;
    const target = selectedTrip;
    setConfirmOpen(false);
    setSelectedTrip(null);
    try {
      // await dailyService.deleteDailyTrip(target.tripId);
      setTrips((prev) => prev.filter((t) => t.tripId !== target.tripId));
    } catch {
      setError('Could not remove the trip. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      <header className="sticky top-0 z-20 bg-[#16213A] px-5 pt-6 pb-5 text-[#FAF9F6] shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <p className="text-xs tracking-wide text-[#8B96AC]">Fleet management</p>
        <div className="mt-1 flex items-end justify-between">
          <h1 className="font-display text-3xl leading-none">Daily trips</h1>
          {currentGroup && (
                      <button
                          onClick={() => exportMonthToCsv(currentGroup)}
              className="text-xs font-medium text-[#F5A623] underline underline-offset-2"
            >
              Export CSV
            </button>
          )}
        </div>

        <div className="mt-4">
          <MonthChips
            months={monthGroups.map((g) => ({ key: g.key, label: g.label }))}
            activeKey={activeMonth}
            onSelect={setActiveMonth}
          />
        </div>

        {currentGroup && (
          <div className="mt-4">
            <MonthlyStatsCard group={currentGroup} />
          </div>
        )}

        <div className="mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by bus number or driver"
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

        {!loading && filteredTrips.length === 0 && !error && (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFEDE6] text-2xl">
              🚌
            </div>
            <p className="font-display text-xl text-[#16213A]">
              {trips.length === 0 ? 'No trips logged yet' : 'No trips match that filter'}
            </p>
            <p className="mt-1 max-w-[240px] text-sm text-[#6B7280]">
              {trips.length === 0
                ? 'Assign a driver to a meter reading to log the first trip.'
                : 'Try a different month or search term.'}
            </p>
          </div>
        )}

        {!loading && filteredTrips.length > 0 && (
          <div className="divide-y divide-[#E7E4DA] overflow-hidden rounded-xl bg-white shadow-sm">
            {filteredTrips.map((trip) => (
              <DailyTripRow key={trip.tripId} trip={trip} onTap={() => setSelectedTrip(trip)} />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setAddOpen(true)}
        aria-label="Log a trip"
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#16213A] shadow-[0_6px_18px_rgba(245,166,35,0.45)] transition-transform active:scale-95"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#16213A" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>

      <AddDailyTripSheet
        open={addOpen}
        saving={saving}
        buses={buses}
        meters={unassignedMeters}
        employees={employees}
        onClose={() => setAddOpen(false)}
        onSave={handleSave}
      />

      <DailyTripDetailsSheet
        trip={confirmOpen ? null : selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onDeleteRequest={() => setConfirmOpen(true)}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Remove this trip?"
        description="This daily trip record will be removed. This can't be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default DailyTripPage;
