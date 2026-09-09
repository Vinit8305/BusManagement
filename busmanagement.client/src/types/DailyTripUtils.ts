import type { dailyResponseDto } from "./DailyTrip/dailyResponseDto";

export interface MonthGroup {
    key: string; // "2026-09"
    label: string; // "September 2026"
    trips: dailyResponseDto[];
    totalDistance: number;
    totalDiesel: number;
    avgMileage: number;
    tripCount: number;
    busesUsed: number;
}

export const parseNumber = (value: string | number | undefined | null): number => {
    if (value === undefined || value === null) return 0;
    const n = typeof value === 'number' ? value : parseFloat(value);
    return Number.isFinite(n) ? n : 0;
};

// distanceCoverd comes in as a string from the backend. Fall back to the
// meter readings if it's ever missing/zero so the UI never shows a blank.
export const getTripDistance = (trip: dailyResponseDto): number => {
    const fromField = parseNumber(trip.distanceCoverd);
    if (fromField > 0) return fromField;
    return Math.max(0, trip.eveningMeterReading - trip.morningMeterReading);
};

// The schema has no dedicated "litres used" field, so we back it out of the
// two fields that *do* exist: distance and average (km/l). This means
// diesel totals are only as accurate as the average each trip was saved with.
export const getTripDiesel = (trip: dailyResponseDto): number => {
    const distance = getTripDistance(trip);
    const avg = parseNumber(trip.average);
    if (avg <= 0) return 0;
    return distance / avg;
};

export const monthKey = (dateStr: string): string => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const monthLabel = (key: string): string => {
    const [year, month] = key.split('-').map(Number);
    const d = new Date(year, month - 1, 1);
    return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

export const groupByMonth = (trips: dailyResponseDto[]): MonthGroup[] => {
    const map = new Map<string, dailyResponseDto[]>();
    trips.forEach((trip) => {
        const key = monthKey(trip.tripDate);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(trip);
    });

    const groups: MonthGroup[] = Array.from(map.entries()).map(([key, groupTrips]) => {
        const sorted = [...groupTrips].sort(
            (a, b) => new Date(b.tripDate).getTime() - new Date(a.tripDate).getTime(),
        );
        const totalDistance = sorted.reduce((sum, t) => sum + getTripDistance(t), 0);
        const totalDiesel = sorted.reduce((sum, t) => sum + getTripDiesel(t), 0);
        const busesUsed = new Set(sorted.map((t) => t.busId)).size;
        return {
            key,
            label: monthLabel(key),
            trips: sorted,
            totalDistance,
            totalDiesel,
            avgMileage: totalDiesel > 0 ? totalDistance / totalDiesel : 0,
            tripCount: sorted.length,
            busesUsed,
        };
    });

    return groups.sort((a, b) => (a.key < b.key ? 1 : -1));
};

export const exportMonthToCsv = (group: MonthGroup): void => {
    const header = ['Date', 'Bus', 'Driver', 'Morning', 'Evening', 'Distance (km)', 'Average (km/l)', 'Diesel (L)'];
    const rows = group.trips.map((t) => [
        new Date(t.tripDate).toLocaleDateString('en-IN'),
        t.busNum,
        t.name,
        t.morningMeterReading,
        t.eveningMeterReading,
        getTripDistance(t).toFixed(1),
        parseNumber(t.average).toFixed(2),
        getTripDiesel(t).toFixed(2),
    ]);

    const csv = [header, ...rows].map((r) => r.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-trips-${group.key}.csv`;
    link.click();
    URL.revokeObjectURL(url);
};