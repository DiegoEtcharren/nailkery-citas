import React, { useState } from 'react';
import { Users, Search, Plus, Phone, Mail, FileText, Calendar } from 'lucide-react';

export default function ClientsView({ clients, onAddClient }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', notes: '' });

    const filteredClients = clients.filter(c => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            c.name.toLowerCase().includes(term) ||
            (c.phone && c.phone.toLowerCase().includes(term)) ||
            (c.email && c.email.toLowerCase().includes(term))
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
                        {filteredClients.length} clientas
                    </span>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                    >
                        <Plus size={14} /> Registrar Clienta
                    </button>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredClients.map((client) => (
                    <div key={client.id} className="bento-card p-5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366F1]/20 to-[#8B5CF6]/20 border border-indigo-500/30 flex items-center justify-center font-bold text-sm text-indigo-400 font-display">
                                    {client.name.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-gray-300 flex items-center gap-1">
                                    <Calendar size={12} className="text-indigo-400" />
                                    {client.appointments_count || 0} citas
                                </span>
                            </div>

                            <h3 className="font-bold text-base text-white mt-3">{client.name}</h3>

                            <div className="mt-3 space-y-1.5 text-xs text-gray-400">
                                {client.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={13} className="text-gray-500" />
                                        <span>{client.phone}</span>
                                    </div>
                                )}
                                {client.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail size={13} className="text-gray-500" />
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                )}
                            </div>

                            {client.notes && (
                                <div className="mt-3 p-2.5 rounded-lg bg-[#16161A] border border-white/5 text-[11px] text-gray-400 flex items-start gap-2">
                                    <FileText size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                                    <p className="line-clamp-2">{client.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
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
