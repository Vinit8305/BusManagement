import { Bus, LayoutDashboard, Users, Fuel, Route, LogOut } from "lucide-react";

function sidebar() {
    return (
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
    )
}