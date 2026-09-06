import React, { useState } from 'react';
import {
    Bus, Plus, Search, Edit, Trash2, CheckCircle2, XCircle,
    Calendar, AlertCircle, X, Loader2
} from 'lucide-react';
import { useBuses } from '../hooks/useBus'; // Aapka banaya hua custom hook
import { busService } from '../services/busService';
import type { busResponseDto } from '../types/bus/busResponseDto';

export default function BusPage() {
    const { buses, loading, error, refreshBuses } = useBuses();
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBus, setEditingBus] = useState<busResponseDto | null>(null);

    // Form Fields
    const [busNum, setBusNum] = useState('');
    const [startedDate, setStartedDate] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [formError, setFormError] = useState<string | null>(null);

    // Open Modal for Add
    const handleOpenAddModal = () => {
        setEditingBus(null);
        setBusNum('');
        setStartedDate(new Date().toISOString().split('T')[0]);
        setIsActive(true);
        setFormError(null);
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEditModal = (bus: busResponseDto) => {
        setEditingBus(bus);
        setBusNum(bus.busNum);
        setStartedDate(bus.busStartedDateAt.split('T')[0]);
        setIsActive(bus.isActive);
        setFormError(null);
        setIsModalOpen(true);
    };

    // Submit Add or Update
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setIsSubmitting(true);

        try {
            if (editingBus) {
                // Update Operation
                await busService.updateBus(editingBus.busId, {
                    busId: editingBus.busId,
                    busNum,
                    startedDateBus: startedDate,
                    isActive
                });
            } else {
                // Add New Bus Operation
                await busService.addBus({
                    busNum,
                    busStartedDateAt: startedDate,
                    isActive
                });
            }
            setIsModalOpen(false);
            refreshBuses();
        } catch (err: any) {
            setFormError(err.message || 'Operation failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete Bus
    const handleDelete = async (busId: number) => {
        if (window.confirm('Kya aap is bus ko delete karna chahte hain?')) {
            try {
                await busService.deleteBus(busId);
                refreshBuses();
            } catch (err: any) {
                alert('Delete failed: ' + err.message);
            }
        }
    };

    // Filtered Buses
    const filteredBuses = buses.filter(bus =>
        bus.busNum.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">

            {/* Header Area */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Bus className="w-6 h-6 text-indigo-400" />
                        Bus Fleet Management
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">Add, edit, and track registered buses in your fleet</p>
                </div>

                <button
                    onClick={handleOpenAddModal}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Bus</span>
                </button>
            </div>

            {/* Main Table Card */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden shadow-xl">

                {/* Search & Actions Bar */}
                <div className="p-4 border-b border-slate-700/60 flex items-center justify-between gap-4">
                    <div className="relative w-72">
                        <input
                            type="text"
                            placeholder="Search by Bus Number (e.g. MH04)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-xs rounded-lg pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                        Total Fleet: <strong className="text-slate-200">{buses.length}</strong>
                    </span>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-700/60">
                            <tr>
                                <th className="py-3.5 px-4">Bus ID</th>
                                <th className="py-3.5 px-4">Bus Registration Number</th>
                                <th className="py-3.5 px-4">Operation Started Date</th>
                                <th className="py-3.5 px-4 text-center">Status</th>
                                <th className="py-3.5 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/40 text-xs">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-400">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500 mb-2" />
                                        Loading bus fleet data...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-rose-400">
                                        Error: {error}
                                    </td>
                                </tr>
                            ) : filteredBuses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">
                                        Koi bus nahi mili. Nayi bus add karne ke liye "Add New Bus" dabayein.
                                    </td>
                                </tr>
                            ) : (
                                filteredBuses.map((bus) => (
                                    <tr key={bus.busId} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="py-3.5 px-4 font-mono text-slate-400">#{bus.busId}</td>
                                        <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center gap-2">
                                            <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded">
                                                <Bus className="w-4 h-4" />
                                            </div>
                                            {bus.busNum}
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-300">
                                            {new Date(bus.busStartedDateAt).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            {bus.isActive ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <CheckCircle2 className="w-3 h-3" /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-700 text-slate-400 border border-slate-600">
                                                    <XCircle className="w-3 h-3" /> Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleOpenEditModal(bus)}
                                                    className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/60 rounded-md transition-colors"
                                                    title="Edit Bus"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(bus.busId)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 rounded-md transition-colors"
                                                    title="Delete Bus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ---------------- ADD / EDIT POPUP MODAL ---------------- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Bus className="w-5 h-5 text-indigo-400" />
                                {editingBus ? 'Update Bus Details' : 'Add New Bus to Fleet'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Error */}
                        {formError && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{formError}</span>
                            </div>
                        )}

                        {/* Modal Form */}
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Bus Registration Number
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. MH04-AB-1234"
                                    value={busNum}
                                    onChange={(e) => setBusNum(e.target.value.toUpperCase())}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 uppercase"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Operation Started Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        value={startedDate}
                                        onChange={(e) => setStartedDate(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                                    />
                                    <Calendar className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="w-4 h-4 accent-indigo-600 rounded bg-slate-950 border-slate-800 cursor-pointer"
                                />
                                <label htmlFor="isActive" className="text-xs text-slate-300 cursor-pointer">
                                    Bus is currently active and operating
                                </label>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>{editingBus ? 'Update Bus' : 'Save Bus'}</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}