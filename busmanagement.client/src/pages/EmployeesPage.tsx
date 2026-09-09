import { useEffect, useMemo, useState } from 'react';
import type { employeeResponseDto } from '../types/employee/employeeResponseDto';
import type { busResponseDto } from '../types/bus/busResponseDto';
import type { addEmployeeDto } from '../types/employee/addEmployeeDto';
import EmployeeRow from '../components/EmployeeRow';
import AddEmployeeSheet from '../components/AddEmployeeSheet';
import EmployeeDetailsSheet from '../components/EmployeeDetailsSheet';
import ConfirmDialog from '../components/ConfirmDialog';
import {employeeService}  from '../services/employeeService';
import { busService } from '../services/busService';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState<employeeResponseDto[]>([]);
    const [buses, setBuses] = useState<busResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<employeeResponseDto | null>(null);
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
      const [employeeData, busData] = await Promise.all([
          employeeService.getAllEmployee(),
          busService.getAllBuses(),
      ]);
      setEmployees(employeeData);
      setBuses(busData);
    } catch {
      setError('Could not load the crew. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return emp.name.toLowerCase().includes(q) || emp.role.toLowerCase().includes(q);
  });

    const handleSave = async (payload: addEmployeeDto) => {
    setSaving(true);
    setError(null);
    try {
      await employeeService.addBus(payload);
      await loadAll();
      setAddOpen(false);
    } catch {
      setError('Could not save the employee. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEmployee) return;
    const target = selectedEmployee;
    setConfirmOpen(false);
    setSelectedEmployee(null);
    try {
      await employeeService.deleteBus(target.empId);
      setEmployees((prev) => prev.filter((e) => e.empId !== target.empId));
    } catch {
      setError('Could not remove the employee. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      <header className="sticky top-0 z-20 bg-[#16213A] px-5 pt-6 pb-5 text-[#FAF9F6] shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <p className="text-xs tracking-wide text-[#8B96AC]">Fleet management</p>
        <div className="mt-1 flex items-end justify-between">
          <h1 className="font-display text-3xl leading-none">Crew</h1>
          <p className="text-sm text-[#C9D0DE]">{employees.length} employees</p>
        </div>

        <div className="mt-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or role"
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

        {!loading && filteredEmployees.length === 0 && !error && (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EFEDE6] text-2xl">
              🧑‍✈️
            </div>
            <p className="font-display text-xl text-[#16213A]">
              {employees.length === 0 ? 'No crew members yet' : 'No one matches that search'}
            </p>
            <p className="mt-1 max-w-[240px] text-sm text-[#6B7280]">
              {employees.length === 0
                ? 'Add your first employee to build the crew.'
                : 'Try a different name or role.'}
            </p>
          </div>
        )}

        {!loading && filteredEmployees.length > 0 && (
          <div className="divide-y divide-[#E7E4DA] overflow-hidden rounded-xl bg-white shadow-sm">
                      {filteredEmployees.map((emp) => (
                          <EmployeeRow
                key={emp.empId}
                employee={emp}
                busNum={busNumById.get(emp.busId)}
                onTap={() => setSelectedEmployee(emp)}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => setAddOpen(true)}
        aria-label="Add employee"
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5A623] text-[#16213A] shadow-[0_6px_18px_rgba(245,166,35,0.45)] transition-transform active:scale-95"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="#16213A" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>

          <AddEmployeeSheet
        open={addOpen}
        saving={saving}
        buses={buses}
        onClose={() => setAddOpen(false)}
        onSave={handleSave}
      />

          <EmployeeDetailsSheet
        employee={confirmOpen ? null : selectedEmployee}
        busNum={selectedEmployee ? busNumById.get(selectedEmployee.busId) : undefined}
        onClose={() => setSelectedEmployee(null)}
        onDeleteRequest={() => setConfirmOpen(true)}
      />

          <ConfirmDialog
        open={confirmOpen}
        title={`Remove ${selectedEmployee?.name ?? ''}?`}
        description="This employee will be removed from the crew. This can't be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default EmployeesPage;
