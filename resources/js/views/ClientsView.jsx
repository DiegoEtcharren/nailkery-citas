import React, { useState } from 'react';
import { Users, Search, Plus, Phone, Mail, FileText, Calendar, CalendarPlus } from 'lucide-react';

export default function ClientsView({ clients, onAddClient, onOpenNewAppointment }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', notes: '' });

    const filteredClients = clients.filter(c => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            c.name.toLowerCase().includes(term) ||
            (c.phone && c.phone.toLowerCase().includes(term)) ||
            (c.email && c.email.toLowerCase().includes(term)) ||
            (c.notes && c.notes.toLowerCase().includes(term))
        );
    });

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
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, teléfono o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#16161A] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-gray-500"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xs text-gray-400 font-medium">
                        {filteredClients.length} clientas registradas
                    </span>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                    >
                        <Plus size={14} /> Registrar Clienta
                    </button>
                </div>
            </div>

            {/* Clients Table Bento Card */}
            <div className="bento-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#16161A]/80 border-b border-white/10 text-gray-400 uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Clienta</th>
                                <th className="px-6 py-4">Teléfono / WhatsApp</th>
                                <th className="px-6 py-4">Correo Electrónico</th>
                                <th className="px-6 py-4 text-center">Historial</th>
                                <th className="px-6 py-4">Notas & Preferencias</th>
                                <th className="px-6 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-white/[0.02] transition">
                                        {/* Client Name + Avatar */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6366F1]/20 to-[#8B5CF6]/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-400 font-display shrink-0">
                                                    {client.name.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-white block">
                                                        {client.name}
                                                    </span>
                                                    <span className="text-[11px] text-gray-500 block">
                                                        ID: #{client.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Phone */}
                                        <td className="px-6 py-4">
                                            {client.phone ? (
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Phone size={13} className="text-emerald-400 shrink-0" />
                                                    <span className="tabular-nums font-medium">{client.phone}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 italic">No registrado</span>
                                            )}
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4">
                                            {client.email ? (
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Mail size={13} className="text-indigo-400 shrink-0" />
                                                    <span className="truncate max-w-[200px]">{client.email}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 italic">No registrado</span>
                                            )}
                                        </td>

                                        {/* Appointments Count */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tabular-nums">
                                                <Calendar size={12} />
                                                {client.appointments_count || 0} citas
                                            </span>
                                        </td>

                                        {/* Notes & Preferences */}
                                        <td className="px-6 py-4 max-w-xs">
                                            {client.notes ? (
                                                <div className="flex items-start gap-1.5 text-gray-400 text-[11px]">
                                                    <FileText size={13} className="text-amber-400 shrink-0 mt-0.5" />
                                                    <span className="line-clamp-2" title={client.notes}>
                                                        {client.notes}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-600 text-[11px]">Sin notas</span>
                                            )}
                                        </td>

                                        {/* Quick Actions */}
                                        <td className="px-6 py-4 text-center">
                                            {onOpenNewAppointment && (
                                                <button
                                                    onClick={() => onOpenNewAppointment({ client_id: client.id })}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 hover:bg-indigo-600 hover:text-white transition border border-indigo-500/20"
                                                    title={`Agendar cita para ${client.name}`}
                                                >
                                                    <CalendarPlus size={13} />
                                                    <span>Agendar</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-500">
                                        No se encontraron clientas con el criterio de búsqueda "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Client Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bento-card w-full max-w-md p-6 bg-[#1E1E24] shadow-2xl">
                        <h2 className="text-lg font-bold text-white font-display mb-4">Registrar Nueva Clienta</h2>
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
                                <label className="block text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newClient.email}
                                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="cliente@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Notas / Preferencias</label>
                                <textarea
                                    value={newClient.notes}
                                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                                    rows="3"
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 resize-none"
                                    placeholder="Forma favorita de uña, alergias, diseño preferido..."
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
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition"
                                >
                                    Guardar Clienta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
