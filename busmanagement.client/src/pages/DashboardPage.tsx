import { useEffect, useMemo, useState } from 'react';
import type { busResponseDto } from '../types/bus/busResponseDto';
import type { petrolResponseDto } from '../types/Petrol/PetrolResponseDto';
import type { meterResponseDto } from '../types/Meter/meterResponseDto';
import { currentMonthKey, monthKeyFromDate, monthLabelFromKey } from '../components/Dashboardutils ';
import { busService } from '../services/busService';
import { meterService } from '../services/meterService';
import { petrolService } from '../services/PetrolService';
import type { addPetrolDto } from '../types/Petrol/AddPetrolDto';
import StatCard from '../components/StatCard';
import BusBreakdownRow from '../components/BusBreakdownRow';
import AddPetrolSheet from '../components/AddPetrolSheet';

const currency = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const DashboardPage = () => {
    const [buses, setBuses] = useState<busResponseDto[]>([]);
    const [meterEntries, setMeterEntries] = useState<meterResponseDto[]>([]);
    const [petrolEntries, setPetrolEntries] = useState<petrolResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthKey());
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
        const [busData, meterData, petrolData] = await Promise.all([
            busService.getAllBuses(),
            meterService.getAllMeter(),
            petrolService.getAllPetrol(),
      ]);
      setBuses(busData);
      setMeterEntries(meterData);
      setPetrolEntries(petrolData);
    } catch {
      setError('Could not load the dashboard. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Months that actually have data, plus the current month so the dropdown is never empty.
  const availableMonths = useMemo(() => {
      const keys = new Set<string>([currentMonthKey()]);
      meterEntries.forEach((m) => keys.add(monthKeyFromDate(m.travelDate)));
    petrolEntries.forEach((p) => keys.add(monthKeyFromDate(p.fillDate)));
    return Array.from(keys).sort((a, b) => (a < b ? 1 : -1));
  }, [meterEntries, petrolEntries]);

  const monthMeterEntries = useMemo(
    () => meterEntries.filter((m) => monthKeyFromDate(m.travelDate) === selectedMonth),
    [meterEntries, selectedMonth],
  );

  const monthPetrolEntries = useMemo(
    () =>
      petrolEntries
        .filter((p) => monthKeyFromDate(p.fillDate) === selectedMonth)
        .sort((a, b) => new Date(b.fillDate).getTime() - new Date(a.fillDate).getTime()),
    [petrolEntries, selectedMonth],
  );

  const distanceByBus = useMemo(() => {
    const map = new Map<number, number>();
    monthMeterEntries.forEach((m) => {
      const distance = m.eveningMeterReading - m.morningMeterReading;
      map.set(m.busId, (map.get(m.busId) ?? 0) + distance);
    });
    return map;
  }, [monthMeterEntries]);

  const costByBus = useMemo(() => {
    const map = new Map<number, number>();
    monthPetrolEntries.forEach((p) => {
      map.set(p.busId, (map.get(p.busId) ?? 0) + p.totalCost);
    });
    return map;
  }, [monthPetrolEntries]);

  const totalDistance = useMemo(
    () => Array.from(distanceByBus.values()).reduce((sum, d) => sum + d, 0),
    [distanceByBus],
  );

  const totalCost = useMemo(
    () => monthPetrolEntries.reduce((sum, p) => sum + p.totalCost, 0),
    [monthPetrolEntries],
  );

  const totalLiters = useMemo(
    () => monthPetrolEntries.reduce((sum, p) => sum + p.liters, 0),
    [monthPetrolEntries],
  );

  const costPerKm = totalDistance > 0 ? totalCost / totalDistance : null;
  const mileage = totalLiters > 0 ? totalDistance / totalLiters : null;

  const busBreakdown = useMemo(() => {
    return buses
      .map((bus) => ({
        busNum: bus.busNum,
        distance: distanceByBus.get(bus.busId) ?? 0,
        cost: costByBus.get(bus.busId) ?? 0,
      }))
      .filter((row) => row.distance > 0 || row.cost > 0)
      .sort((a, b) => b.distance - a.distance);
  }, [buses, distanceByBus, costByBus]);

    const handleSavePetrol = async (payload: addPetrolDto) => {
    setSaving(true);
    setError(null);
    try {
      await petrolService.addPetrol(payload);
      await loadAll();
      setAddOpen(false);
    } catch {
      setError('Could not save the fill-up. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const busNumById = useMemo(() => {
    const map = new Map<number, string>();
    buses.forEach((b) => map.set(b.busId, b.busNum));
    return map;
  }, [buses]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      <header className="sticky top-0 z-20 bg-[#16213A] px-5 pt-6 pb-5 text-[#FAF9F6] shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <p className="text-xs tracking-wide text-[#8B96AC]">Fleet management</p>
        <div className="mt-1 flex items-end justify-between">
          <h1 className="font-display text-3xl leading-none">Dashboard</h1>
        </div>

        <div className="mt-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3.5 py-2.5 text-sm font-medium text-[#FAF9F6] outline-none focus:bg-white/20 [&>option]:text-[#16213A]"
          >
            {availableMonths.map((key) => (
                <option key={key} value={key}>
                    {monthLabelFromKey(key)}
              </option>
            ))}
          </select>
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
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-[#EFEDE6]" />
            ))}
          </div>
        )}

        {!loading && !error && (
          <>
                      <div className="grid grid-cols-2 gap-3">
                          <StatCard icon="🛣️" label="Distance covered" value={`${totalDistance.toLocaleString('en-IN')} km`} />
                          <StatCard icon="⛽" label="Petrol expense" value={currency(totalCost)} hint={`${totalLiters} L filled`} />
                          <StatCard
                            icon="💸"
                            label="Cost per km"
                            value={costPerKm !== null ? `₹${costPerKm.toFixed(2)}` : '—'}
                          />
                          <StatCard
                            icon="📈"
                            label="Mileage"
                            value={mileage !== null ? `${mileage.toFixed(1)} km/L` : '—'}
                          />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="font-display text-lg text-[#16213A]">By bus</h2>
              <span className="text-xs text-[#9CA3AF]">{monthLabelFromKey(selectedMonth)}</span>
            </div>

            {busBreakdown.length === 0 ? (
              <p className="mt-3 rounded-xl bg-white px-4 py-6 text-center text-sm text-[#6B7280] shadow-sm">
                No distance or petrol data for this month yet.
              </p>
            ) : (
              <div className="mt-3 divide-y divide-[#E7E4DA] overflow-hidden rounded-xl bg-white shadow-sm">
                 {busBreakdown.map((row) => (
                  <BusBreakdownRow key={row.busNum} busNum={row.busNum} distance={row.distance} cost={row.cost} />                 
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <h2 className="font-display text-lg text-[#16213A]">Fill-up log</h2>
            </div>

            {monthPetrolEntries.length === 0 ? (
              <p className="mt-3 rounded-xl bg-white px-4 py-6 text-center text-sm text-[#6B7280] shadow-sm">
                No fill-ups logged this month yet.
              </p>
            ) : (
              <div className="mt-3 divide-y divide-[#E7E4DA] overflow-hidden rounded-xl bg-white shadow-sm">
                {monthPetrolEntries.map((p) => (
                  <div key={p.petrolId} className="flex items-center gap-4 px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FDF1DC] text-base">
                      ⛽
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base leading-tight text-[#16213A]">
                        {busNumById.get(p.busId) ?? `Bus #${p.busId}`}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {new Date(p.fillDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} ·{' '}
                        {p.liters} L
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-[#16213A]">{currency(p.totalCost)}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <button
        onClick={() => setAddOpen(true)}
        aria-label="Log a fill-up"
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#16213A] shadow-[0_6px_18px_rgba(245,166,35,0.45)] transition-transform active:scale-95"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#16213A" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>

          <AddPetrolSheet
        open={addOpen}
        saving={saving}
        buses={buses}
        onClose={() => setAddOpen(false)}
        onSave={handleSavePetrol}
      />
    </div>
  );
};

export default DashboardPage;
