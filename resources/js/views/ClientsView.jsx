import React, { useState } from 'react';
import { 
    Users, 
    Search, 
    Plus, 
    Phone, 
    Mail, 
    FileText, 
    Calendar, 
    CalendarPlus, 
    MessageCircle,
    DollarSign,
    Sparkles,
    Clock
} from 'lucide-react';
import dayjs from 'dayjs';

export default function ClientsView({ clients, onAddClient, onOpenNewAppointment }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', notes: '' });

    const filteredClients = clients.filter(c => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (c.name && c.name.toLowerCase().includes(term)) ||
            (c.phone && c.phone.toLowerCase().includes(term)) ||
            (c.email && c.email.toLowerCase().includes(term)) ||
            (c.notes && c.notes.toLowerCase().includes(term)) ||
            (c.last_service_name && c.last_service_name.toLowerCase().includes(term))
        );
    });

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
        }).format(val || 0);
    };

    const buildWhatsAppLink = (phone, name) => {
        if (!phone) return null;
        const digits = String(phone).replace(/\D/g, '');
        if (digits.length < 10) return null;
        const cleanPhone = digits.length === 10 ? `52${digits}` : digits;
        const firstName = (name || '').trim().split(' ')[0] || '';
        const msg = `¡Hola ${firstName}! ✨ Te saludamos de Nailkery. ¿Te gustaría agendar tu próximo retoque o servicio de uñas?`;
        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    };

    const handleCreateClient = (e) => {
        e.preventDefault();
        if (!newClient.name.trim()) return;
        onAddClient(newClient);
        setNewClient({ name: '', phone: '', email: '', notes: '' });
        setShowAddModal(false);
    };

    return (
        <div className="space-y-6">
            {/* Top Filter & Action Bar */}
            <div className="bento-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar por clienta, teléfono, servicio o notas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#16161A] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-gray-500"
                    />
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xs text-gray-400 font-medium">
                        {filteredClients.length} de {clients.length} clientas
                    </span>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                        <Plus size={14} /> Registrar Clienta
                    </button>
                </div>
            </div>

            {/* Directoy Table Bento Card */}
            <div className="bento-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#16161A]/90 border-b border-white/10 text-gray-400 uppercase font-semibold">
                            <tr>
                                <th className="px-5 py-4">Clienta</th>
                                <th className="px-5 py-4">Contacto (WhatsApp)</th>
                                <th className="px-5 py-4 text-center">Citas</th>
                                <th className="px-5 py-4 text-right">Gasto Total</th>
                                <th className="px-5 py-4">Última Visita</th>
                                <th className="px-5 py-4">Notas de Cabina</th>
                                <th className="px-5 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => {
                                    const waLink = buildWhatsAppLink(client.phone, client.name);
                                    return (
                                        <tr key={client.id} className="hover:bg-white/[0.02] transition">
                                            {/* Client Info */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6366F1]/20 to-[#8B5CF6]/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-400 font-display shrink-0 shadow-sm">
                                                        {client.name.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-white block text-sm">
                                                            {client.name}
                                                        </span>
                                                        <span className="text-[11px] text-gray-500">
                                                            {client.email || 'Sin correo registrado'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Phone & WhatsApp */}
                                            <td className="px-5 py-4">
                                                {client.phone ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-200 tabular-nums font-medium">
                                                            {client.phone}
                                                        </span>
                                                        {waLink && (
                                                            <a
                                                                href={waLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition"
                                                                title="Contactar por WhatsApp"
                                                            >
                                                                <MessageCircle size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 italic text-[11px]">No disponible</span>
                                                )}
                                            </td>

                                            {/* Appointments Count */}
                                            <td className="px-5 py-4 text-center">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 tabular-nums">
                                                    <Calendar size={11} className="text-indigo-400" />
                                                    {client.appointments_count || 0}
                                                </span>
                                            </td>

                                            {/* Total Spent / LTV */}
                                            <td className="px-5 py-4 text-right font-bold text-emerald-400 tabular-nums">
                                                {formatCurrency(client.total_spent)}
                                            </td>

                                            {/* Last Visit */}
                                            <td className="px-5 py-4">
                                                {client.last_visit_date ? (
                                                    <div>
                                                        <span className="font-semibold text-white block">
                                                            {dayjs(client.last_visit_date).format('DD/MM/YYYY')}
                                                        </span>
                                                        <span className="text-[11px] text-indigo-300 block truncate max-w-[170px]" title={client.last_service_name}>
                                                            {client.last_service_name}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 text-[11px] italic">Sin visitas aún</span>
                                                )}
                                            </td>

                                            {/* Notes / Preferences */}
                                            <td className="px-5 py-4 max-w-xs">
                                                {client.notes ? (
                                                    <div className="flex items-start gap-1.5 text-gray-300 text-[11px]">
                                                        <FileText size={13} className="text-amber-400 shrink-0 mt-0.5" />
                                                        <span className="line-clamp-2" title={client.notes}>
                                                            {client.notes}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-600 text-[11px] italic">Sin notas</span>
                                                )}
                                            </td>

                                            {/* Quick Actions */}
                                            <td className="px-5 py-4 text-center">
                                                {onOpenNewAppointment && (
                                                    <button
                                                        onClick={() => onOpenNewAppointment({ client_id: client.id })}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#6366F1] hover:bg-[#5254E8] text-white transition shadow-sm"
                                                        title={`Agendar nueva cita para ${client.name}`}
                                                    >
                                                        <CalendarPlus size={13} />
                                                        <span>Agendar</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-12 text-gray-500">
                                        No se encontraron clientas con el criterio de búsqueda "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: Registrar Nueva Clienta */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
                    <div className="bento-card w-full max-w-md p-6 bg-[#1E1E24] shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                            <h2 className="text-base font-bold text-white font-display">Registrar Clienta en Directorio</h2>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-gray-400 mb-1">Nombre Completo *</label>
                                <input
                                    type="text"
                                    required
                                    value={newClient.name}
                                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="Ej. Sofía Morales"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Teléfono (WhatsApp)</label>
                                <input
                                    type="text"
                                    value={newClient.phone}
                                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="Ej. 55 1234 5678"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={newClient.email}
                                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="cliente@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Notas de Cabina / Preferencias</label>
                                <textarea
                                    value={newClient.notes}
                                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                                    rows="3"
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 resize-none"
                                    placeholder="Forma favorita de uña (almond, square, coffin), alergias, largo..."
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-500/20"
                                >
                                    Guardar en Directorio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
