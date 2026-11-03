import React, { useState } from 'react';
import { 
    CalendarCheck, 
    Filter, 
    Search, 
    Trash2, 
    CheckCircle2, 
    Play, 
    XCircle, 
    Clock,
    DollarSign,
    Plus
} from 'lucide-react';
import dayjs from 'dayjs';

export default function AppointmentsListView({ 
    appointments, 
    professionals, 
    onUpdateAppointmentStatus, 
    onDeleteAppointment, 
    onOpenNewAppointment 
}) {
    const [statusFilter, setStatusFilter] = useState('all');
    const [profFilter, setProfFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAppointments = appointments.filter(app => {
        if (statusFilter !== 'all' && app.status !== statusFilter) return false;
        if (profFilter !== 'all' && String(app.professional_id) !== String(profFilter)) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const clientMatch = app.client?.name?.toLowerCase().includes(term);
            const serviceMatch = app.service?.name?.toLowerCase().includes(term);
            if (!clientMatch && !serviceMatch) return false;
        }
        return true;
    });

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
            {/* Filter controls */}
            <div className="bento-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar cliente o servicio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#16161A] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-gray-500"
                        />
                    </div>

                    {/* Status filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#16161A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pendiente">Pendientes</option>
                        <option value="confirmada">Confirmadas</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="completada">Completadas</option>
                        <option value="cancelada">Canceladas</option>
                    </select>

                    {/* Professional filter */}
                    <select
                        value={profFilter}
                        onChange={(e) => setProfFilter(e.target.value)}
                        className="bg-[#16161A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                        <option value="all">Todas las manicuristas</option>
                        {professionals.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-xs text-gray-400 font-medium">
                        {filteredAppointments.length} citas encontradas
                    </span>
                    <button
                        onClick={() => onOpenNewAppointment()}
                        className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                    >
                        <Plus size={14} /> Nueva Cita
                    </button>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bento-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#16161A]/80 border-b border-white/10 text-gray-400 uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Fecha & Horario</th>
                                <th className="px-6 py-4">Clienta</th>
                                <th className="px-6 py-4">Servicio</th>
                                <th className="px-6 py-4">Manicurista</th>
                                <th className="px-6 py-4 text-right">Monto</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-white/[0.02] transition">
                                        {/* Date and time */}
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-white">
                                                {dayjs(app.date).format('DD/MM/YYYY')}
                                            </div>
                                            <div className="text-[11px] text-gray-400 tabular-nums">
                                                {app.start_time.slice(0, 5)} - {app.end_time?.slice(0, 5)}
                                            </div>
                                        </td>

                                        {/* Client */}
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{app.client?.name}</div>
                                            <div className="text-[11px] text-gray-500">{app.client?.phone || 'Sin tel'}</div>
                                        </td>

                                        {/* Service */}
                                        <td className="px-6 py-4">
                                            <span className="text-indigo-300 font-medium block truncate max-w-[220px]">
                                                {app.service?.name}
                                            </span>
                                            <span className="text-[11px] text-gray-500">{app.service?.category}</span>
                                        </td>

                                        {/* Professional */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                                                    style={{ backgroundColor: app.professional?.color || '#6366F1' }}
                                                />
                                                <span className="text-gray-300">{app.professional?.name}</span>
                                            </div>
                                        </td>

                                        {/* Total */}
                                        <td className="px-6 py-4 text-right font-bold text-white tabular-nums">
                                            {formatCurrency(app.total_amount)}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                {app.status === 'pendiente' && (
                                                    <button
                                                        onClick={() => onUpdateAppointmentStatus(app.id, 'confirmada')}
                                                        className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition"
                                                        title="Confirmar"
                                                    >
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                )}
                                                {app.status === 'confirmada' && (
                                                    <button
                                                        onClick={() => onUpdateAppointmentStatus(app.id, 'en_proceso')}
                                                        className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/10 transition"
                                                        title="Iniciar Servicio"
                                                    >
                                                        <Play size={16} />
                                                    </button>
                                                )}
                                                {app.status === 'en_proceso' && (
                                                    <button
                                                        onClick={() => onUpdateAppointmentStatus(app.id, 'completada')}
                                                        className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition"
                                                        title="Finalizar"
                                                    >
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                )}
                                                {app.status !== 'completada' && app.status !== 'cancelada' && (
                                                    <button
                                                        onClick={() => onUpdateAppointmentStatus(app.id, 'cancelada')}
                                                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                                                        title="Cancelar Cita"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onDeleteAppointment(app.id)}
                                                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                                                    title="Eliminar registro"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-10 text-gray-500">
                                        No se encontraron citas con los filtros seleccionados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
