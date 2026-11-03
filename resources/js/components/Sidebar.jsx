import React from 'react';
import { 
    LayoutDashboard, 
    Calendar, 
    CalendarCheck, 
    Users, 
    Sparkles, 
    UserCheck, 
    PlusCircle,
    ChevronLeft,
    ChevronRight,
    Clock
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, onOpenNewAppointment, collapsed, setCollapsed }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'calendar', label: 'Agenda & Calendario', icon: Calendar },
        { id: 'appointments', label: 'Lista de Citas', icon: CalendarCheck },
        { id: 'clients', label: 'Clientes', icon: Users },
        { id: 'services', label: 'Servicios', icon: Sparkles },
        { id: 'professionals', label: 'Manicuristas', icon: UserCheck },
    ];

    return (
        <aside className={`h-screen sticky top-0 bg-[#16161A] border-r border-white/10 flex flex-col transition-all duration-300 z-30 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Header Brand */}
            <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
                {!collapsed ? (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg text-white font-display tracking-tight block">NAILKERY</span>
                            <span className="text-[11px] text-indigo-400 font-medium tracking-wider uppercase block">Citas & Salón</span>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                )}

                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
                    title={collapsed ? "Expandir" : "Colapsar"}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Quick Action Button */}
            <div className="p-4">
                <button
                    onClick={onOpenNewAppointment}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E6] hover:to-[#7C4DFF] text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 transform active:scale-95"
                >
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>Nueva Cita</span>}
                </button>
            </div>

            {/* Nav List */}
            <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto py-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                isActive 
                                    ? 'bg-[#1E1E24] text-white border border-indigo-500/30 shadow-md shadow-indigo-500/10' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#6366F1]' : 'text-gray-400'}`} />
                            {!collapsed && <span>{item.label}</span>}
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_#6366F1]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer Status */}
            <div className="p-4 border-t border-white/10">
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} bg-[#1E1E24]/60 p-2.5 rounded-xl border border-white/5`}>
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Clock className="w-4 h-4" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#16161A]"></span>
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-white truncate">Nailkery Studio</p>
                            <p className="text-[11px] text-emerald-400 font-medium truncate">En línea • Laravel + MySQL</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
