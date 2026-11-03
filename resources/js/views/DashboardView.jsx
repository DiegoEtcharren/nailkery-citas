import React from 'react';
import { 
    CalendarCheck, 
    DollarSign, 
    Clock, 
    Sparkles, 
    Users, 
    CheckCircle2, 
    AlertCircle, 
    Play, 
    XCircle,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

export default function DashboardView({ 
    stats, 
    loading, 
    onOpenNewAppointment, 
    onUpdateAppointmentStatus, 
    onNavigate 
}) {
    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { today, month, totals, top_services, professionals_stats, upcoming_today } = stats;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
        }).format(val || 0);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmada':
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Confirmada</span>;
            case 'en_proceso':
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-pulse">En Proceso</span>;
            case 'completada':
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completada</span>;
            case 'cancelada':
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">Cancelada</span>;
            default:
                return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Pendiente</span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* KPI Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Card 1: Citas Hoy */}
                <div className="bento-card p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Citas Hoy</span>
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <CalendarCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-white font-display tabular-nums">
                            {today.total_appointments}
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                            <span className="text-emerald-400 font-semibold">{today.confirmed + today.completed} listos/en curso</span>
                            <span>•</span>
                            <span className="text-amber-400">{today.pending} pendientes</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Ingresos Estimados Hoy */}
                <div className="bento-card p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Ingresos Hoy</span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-emerald-400 font-display tabular-nums">
                            {formatCurrency(today.estimated_revenue)}
                        </div>
                        <p className="mt-2 text-xs text-gray-400">
                            Estimado de citas activas hoy
                        </p>
                    </div>
                </div>

                {/* Card 3: Citas del Mes */}
                <div className="bento-card p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Citas Este Mes</span>
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-white font-display tabular-nums">
                            {month.total_appointments}
                        </div>
                        <div className="mt-2 text-xs text-purple-400 font-semibold">
                            {formatCurrency(month.revenue)} facturados
                        </div>
                    </div>
                </div>

                {/* Card 4: Clientes & Equipo */}
                <div className="bento-card p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Capacidad Activa</span>
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="text-3xl font-extrabold text-white font-display tabular-nums">
                            {totals.professionals} <span className="text-sm font-normal text-gray-400">manicuristas</span>
                        </div>
                        <p className="mt-2 text-xs text-gray-400">
                            {totals.clients} clientas registradas
                        </p>
                    </div>
                </div>
            </div>

            {/* Middle Bento Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 8 Cols: Citas de Hoy Timeline / Lista Interactiva */}
                <div className="lg:col-span-8 bento-card p-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-white font-display">Agenda de Hoy</h2>
                            <p className="text-xs text-gray-400">Gestiona y actualiza el flujo de clientas en cabina</p>
                        </div>
                        <button
                            onClick={() => onNavigate('appointments')}
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                        >
                            Ver todas <ChevronRight size={14} />
                        </button>
                    </div>

                    {upcoming_today && upcoming_today.length > 0 ? (
                        <div className="space-y-3">
                            {upcoming_today.map((app) => (
                                <div 
                                    key={app.id}
                                    className="bg-[#16161A] p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 text-center shrink-0">
                                            <span className="text-sm font-bold text-white tabular-nums block">
                                                {app.start_time.slice(0, 5)}
                                            </span>
                                            <span className="text-[11px] text-gray-500 block">
                                                {app.end_time ? app.end_time.slice(0, 5) : ''}
                                            </span>
                                        </div>

                                        <div className="border-l border-white/10 pl-4">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-white text-sm">{app.client?.name}</h4>
                                                {getStatusBadge(app.status)}
                                            </div>
                                            <p className="text-xs text-indigo-300 mt-0.5">{app.service?.name}</p>
                                            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <span 
                                                        className="w-2 h-2 rounded-full inline-block" 
                                                        style={{ backgroundColor: app.professional?.color || '#6366F1' }}
                                                    />
                                                    {app.professional?.name}
                                                </span>
                                                <span>•</span>
                                                <span className="text-emerald-400 font-medium tabular-nums">
                                                    {formatCurrency(app.total_amount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 self-end sm:self-center">
                                        {app.status === 'pendiente' && (
                                            <button
                                                onClick={() => onUpdateAppointmentStatus(app.id, 'confirmada')}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition"
                                                title="Confirmar Cita"
                                            >
                                                Confirmar
                                            </button>
                                        )}
                                        {app.status === 'confirmada' && (
                                            <button
                                                onClick={() => onUpdateAppointmentStatus(app.id, 'en_proceso')}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition flex items-center gap-1"
                                                title="Iniciar Servicio"
                                            >
                                                <Play size={12} /> Iniciar
                                            </button>
                                        )}
                                        {app.status === 'en_proceso' && (
                                            <button
                                                onClick={() => onUpdateAppointmentStatus(app.id, 'completada')}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white transition flex items-center gap-1"
                                                title="Finalizar Servicio"
                                            >
                                                <CheckCircle2 size={12} /> Finalizar
                                            </button>
                                        )}
                                        {app.status !== 'completada' && app.status !== 'cancelada' && (
                                            <button
                                                onClick={() => onUpdateAppointmentStatus(app.id, 'cancelada')}
                                                className="p-1.5 rounded-lg text-xs text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                                                title="Cancelar Cita"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <Clock className="w-10 h-10 mx-auto text-gray-600 mb-2" />
                            <p className="text-sm font-medium">No hay citas programadas para hoy</p>
                            <button
                                onClick={onOpenNewAppointment}
                                className="mt-3 text-xs text-indigo-400 font-semibold hover:underline"
                            >
                                + Agendar una nueva cita
                            </button>
                        </div>
                    )}
                </div>

                {/* Right 4 Cols: Manicuristas & Top Servicios */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Manicuristas workload */}
                    <div className="bento-card p-6">
                        <h3 className="text-base font-bold text-white font-display mb-3">Equipo en Turno</h3>
                        <div className="space-y-3">
                            {professionals_stats && professionals_stats.map((prof) => (
                                <div key={prof.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#16161A]/80 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div 
                                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
                                            style={{ backgroundColor: prof.color || '#6366F1' }}
                                        >
                                            {prof.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-white">{prof.name}</p>
                                            <p className="text-[10px] text-gray-400">{prof.specialty}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-indigo-400 tabular-nums">
                                            {prof.today_appointments_count || 0}
                                        </span>
                                        <span className="text-[10px] text-gray-500 block">citas hoy</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Services */}
                    <div className="bento-card p-6">
                        <h3 className="text-base font-bold text-white font-display mb-3">Servicios Estrella</h3>
                        <div className="space-y-2.5">
                            {top_services && top_services.map((serv, index) => (
                                <div key={serv.id} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center font-semibold text-gray-400 text-[10px]">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-300 truncate max-w-[170px]">{serv.name}</span>
                                    </div>
                                    <span className="font-semibold text-white tabular-nums">
                                        {formatCurrency(serv.price)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
