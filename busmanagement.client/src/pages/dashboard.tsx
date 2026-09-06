import React, { useState } from 'react';
import {
    Bus, Users, Fuel, Route, BarChart3, LayoutDashboard,
    Plus, Search, Edit, Trash2, ChevronDown, Download,
    Gauge, IndianRupee, Zap, Calculator, TrendingUp, AlertTriangle, LogOut
} from 'lucide-react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';

// Sample Analytical Data (Monthly Distance vs Fuel Cost Trend)
const trendData = [
    { month: 'Jan', kmRun: 4200, fuelAmount: 100800, avgMileage: 4.0 },
    { month: 'Feb', kmRun: 4500, fuelAmount: 108000, avgMileage: 4.1 },
    { month: 'Mar', kmRun: 4100, fuelAmount: 98400, avgMileage: 3.9 },
    { month: 'Apr', kmRun: 4800, fuelAmount: 115200, avgMileage: 4.0 },
    { month: 'May', kmRun: 5100, fuelAmount: 122400, avgMileage: 4.2 },
    { month: 'Jun', kmRun: 4900, fuelAmount: 117600, avgMileage: 4.0 },
    { month: 'Jul', kmRun: 4700, fuelAmount: 112800, avgMileage: 3.9 },
    { month: 'Aug', kmRun: 4850, fuelAmount: 116400, avgMileage: 4.0 },
];

// Sample Daily Operations Data (DailyTripInfo + Meter + Fuel + Emp + Bus Join)
const initialDailyLogs = [
    {
        tripId: 101,
        tripDate: '2026-08-10',
        busNum: 'MH04-AB-1234',
        empName: 'Rajesh Sharma',
        empId: 'EMP-102',
        morningReading: 145200,
        eveningReading: 145420,
        distanceKm: 220,
        refuelQty: 55.0,
        fuelAmount: 5280,
        avgMileage: 4.0,
    },
    {
        tripId: 102,
        tripDate: '2026-08-10',
        busNum: 'MH04-CD-5678',
        empName: 'Suresh Verma',
        empId: 'EMP-105',
        morningReading: 98150,
        eveningReading: 98460,
        distanceKm: 310,
        refuelQty: 72.0,
        fuelAmount: 6912,
        avgMileage: 4.3,
    },
    {
        tripId: 103,
        tripDate: '2026-08-09',
        busNum: 'MH04-EF-9012',
        empName: 'Amit Kumar',
        empId: 'EMP-108',
        morningReading: 210400,
        eveningReading: 210580,
        distanceKm: 180,
        refuelQty: 58.0,
        fuelAmount: 5568,
        avgMileage: 3.1, // Low Mileage Alert
    },
];

export default function Dashboard() {
    const [selectedBus, setSelectedBus] = useState('all');
    const [dateFilter, setDateFilter] = useState('this_month');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="bg-slate-900 text-slate-100 min-h-screen flex overflow-hidden font-sans">

            {/* ---------------- SIDEBAR NAVIGATION ---------------- */}
            <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
                <div>
                    {/* Brand Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg">
                            <Bus className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-lg text-white tracking-wide">
                            FleetTrack <span className="text-indigo-400 text-xs font-normal px-2 py-0.5 bg-indigo-950 rounded border border-indigo-800/50">PRO</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-1.5">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('buses')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'buses' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
                        >
                            <Bus className="w-4 h-4" />
                            <span>Bus Management</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('employees')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'employees' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
                        >
                            <Users className="w-4 h-4" />
                            <span>Employees & Staff</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('fuel')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'fuel' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
                        >
                            <Fuel className="w-4 h-4" />
                            <span>Fuel Records</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('trips')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'trips' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
                        >
                            <Route className="w-4 h-4" />
                            <span>Daily Trip & Meter Logs</span>
                        </button>
                    </nav>
                </div>

                {/* User Footer */}
                <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center border border-indigo-500/30 text-sm">
                            AD
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-200">Admin User</p>
                            <p className="text-xs text-slate-500">Fleet Manager</p>
                        </div>
                    </div>
                    <button className="text-slate-500 hover:text-slate-300 p-1.5 rounded-md hover:bg-slate-800 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button> 
                </div>
            </aside>

            {/* ---------------- MAIN CONTENT AREA ---------------- */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Header Controls Bar */}
                <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold text-white">Bus Performance Dashboard</h1>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Active Fleet Tracking
                        </span>
                    </div>

                    {/* Filters & Actions */}
                    <div className="flex items-center gap-3">
                        {/* Bus Select Filter */}
                        <div className="relative">
                            <select
                                value={selectedBus}
                                onChange={(e) => setSelectedBus(e.target.value)}
                                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="all">All Buses (Active Fleet)</option>
                                <option value="MH04-AB-1234">MH04-AB-1234</option>
                                <option value="MH04-CD-5678">MH04-CD-5678</option>
                                <option value="MH04-EF-9012">MH04-EF-9012</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                        </div>

                        {/* Date Filter (Since Started Date / Monthly / Yearly) */}
                        <div className="relative">
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="since_started">Since Bus Started Date</option>
                                <option value="this_month">This Month (Aug 2026)</option>
                                <option value="last_month">Last Month</option>
                                <option value="this_year">This Year (2026)</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                        </div>

                        {/* Add Daily Entry Action */}
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all">
                            <Plus className="w-4 h-4" />
                            <span>+ Add Entry</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable View Area */}
                <main className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* 1. KPI SCORECARDS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Total Distance Traveled */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs font-semibold uppercase tracking-wider">Total Distance Run</span>
                                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                                    <Gauge className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-baseline justify-between">
                                <h2 className="text-2xl font-bold text-white">4,850 <span className="text-sm font-normal text-slate-400">KM</span></h2>
                                <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
                                    <TrendingUp className="w-3 h-3" /> +12%
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Evening - Morning Odometer Sum</p>
                        </div>

                        {/* Total Fuel Expense */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs font-semibold uppercase tracking-wider">Total Fuel Expense</span>
                                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                                    <IndianRupee className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-baseline justify-between">
                                <h2 className="text-2xl font-bold text-white">₹ 1,16,400</h2>
                                <span className="text-xs font-medium text-slate-400">1,212.5 Liters</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Avg Diesel Rate: ₹96 / L</p>
                        </div>

                        {/* Average Fuel Mileage */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs font-semibold uppercase tracking-wider">Fuel Average (Mileage)</span>
                                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                                    <Zap className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-baseline justify-between">
                                <h2 className="text-2xl font-bold text-emerald-400">4.00 <span className="text-sm font-normal text-slate-400">KM/L</span></h2>
                                <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-medium">Optimal</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Target Average: 3.8 - 4.2 KM/L</p>
                        </div>

                        {/* Cost Per KM */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
                            <div className="flex items-center justify-between text-slate-400 mb-2">
                                <span className="text-xs font-semibold uppercase tracking-wider">Cost Per Kilometer</span>
                                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                                    <Calculator className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-baseline justify-between">
                                <h2 className="text-2xl font-bold text-white">₹ 24.00 <span className="text-sm font-normal text-slate-400">/ KM</span></h2>
                                <span className="text-xs font-medium text-rose-400 flex items-center gap-0.5">
                                    <TrendingUp className="w-3 h-3" /> +2.1%
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Fuel Cost ÷ Total KM Traveled</p>
                        </div>

                    </div>

                    {/* 2. ANALYTICS & CHARTS SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Composed Bar + Line Chart */}
                        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-200">Distance Traveled vs Fuel Cost Trend</h3>
                                    <p className="text-xs text-slate-400">Monthly overview of kilometer run against fuel expenses</p>
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="month" stroke="#94a3b8" />
                                        <YAxis yAxisId="left" stroke="#6366f1" />
                                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                                        <Bar yAxisId="left" dataKey="kmRun" name="Distance (KM)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                        <Line yAxisId="right" type="monotone" dataKey="fuelAmount" name="Fuel Cost (₹)" stroke="#10b981" strokeWidth={2} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Fleet Status & Low Efficiency Alert */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Fleet Mileage Performance</h3>
                                <p className="text-xs text-slate-400 mb-4">Vehicle efficiency rating distribution</p>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                                            <span>High Mileage (&gt; 4.0 KM/L)</span>
                                            <span className="text-emerald-400">12 Buses (75%)</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full w-[75%]"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                                            <span>Average Mileage (3.5 - 4.0 KM/L)</span>
                                            <span className="text-amber-400">3 Buses (18%)</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <div className="bg-amber-500 h-full w-[18%]"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                                            <span>Low Mileage Alert (&lt; 3.5 KM/L)</span>
                                            <span className="text-rose-400">1 Bus (7%)</span>
                                        </div>
                                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <div className="bg-rose-500 h-full w-[7%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Alert Notification Card */}
                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mt-4 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-rose-300">Fuel Average Drop Alert</p>
                                    <p className="text-[11px] text-rose-200/80">Bus MH04-EF-9012 recorded 3.1 KM/L mileage yesterday. Requires mechanic inspection.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 3. CRUD DATA TABLE (DAILY TRIP & METER LOGS) */}
                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden">

                        {/* Table Header Controls */}
                        <div className="p-5 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-slate-200">Daily Operations & Meter Records</h3>
                                <p className="text-xs text-slate-400">Track and manage daily meter readings, distance, and fuel logs</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search Bus / Driver..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-slate-900 border border-slate-700 text-xs rounded-lg pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
                                    />
                                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                                </div>

                                <button className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Export</span>
                                </button>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-700/60">
                                    <tr>
                                        <th className="py-3.5 px-4">Trip Date</th>
                                        <th className="py-3.5 px-4">Bus Number</th>
                                        <th className="py-3.5 px-4">Driver Name</th>
                                        <th className="py-3.5 px-4 text-right">Morning Meter</th>
                                        <th className="py-3.5 px-4 text-right">Evening Meter</th>
                                        <th className="py-3.5 px-4 text-right">Distance (KM)</th>
                                        <th className="py-3.5 px-4 text-right">Refuel Qty</th>
                                        <th className="py-3.5 px-4 text-right">Fuel Cost</th>
                                        <th className="py-3.5 px-4 text-center">Average (KM/L)</th>
                                        <th className="py-3.5 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/40 text-xs">
                                    {initialDailyLogs.map((log) => (
                                        <tr key={log.tripId} className={`hover:bg-slate-700/30 transition-colors ${log.avgMileage < 3.5 ? 'bg-rose-500/5' : ''}`}>
                                            <td className="py-3 px-4 font-medium text-white">{log.tripDate}</td>
                                            <td className="py-3 px-4 font-semibold text-slate-200">{log.busNum}</td>
                                            <td className="py-3 px-4">
                                                <span className="text-slate-200">{log.empName}</span>
                                                <span className="block text-[10px] text-slate-500">{log.empId}</span>
                                            </td>
                                            <td className="py-3 px-4 text-right font-mono">{log.morningReading.toLocaleString()}</td>
                                            <td className="py-3 px-4 text-right font-mono">{log.eveningReading.toLocaleString()}</td>
                                            <td className="py-3 px-4 text-right font-semibold text-indigo-400 font-mono">{log.distanceKm} KM</td>
                                            <td className="py-3 px-4 text-right font-mono">{log.refuelQty} L</td>
                                            <td className="py-3 px-4 text-right font-semibold text-amber-400 font-mono">₹ {log.fuelAmount.toLocaleString()}</td>
                                            <td className="py-3 px-4 text-center">
                                                <span className={`px-2 py-0.5 rounded border font-bold ${log.avgMileage < 3.5 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                                    {log.avgMileage.toFixed(2)}
                                                </span>
                                            </td>
                                            {/* CRUD Action Buttons */}
                                            <td className="py-3 px-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="text-slate-400 hover:text-indigo-400 p-1 hover:bg-slate-700 rounded transition-colors" title="Edit Entry">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-slate-400 hover:text-rose-400 p-1 hover:bg-slate-700 rounded transition-colors" title="Delete Entry">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                            <span>Showing 3 of 48 daily entries</span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded border border-slate-700 opacity-50 cursor-not-allowed">Previous</button>
                                <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700">Next</button>
                            </div>
                        </div>

                    </div>

                </main>
            </div>

        </div>
    );
}