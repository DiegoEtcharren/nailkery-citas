import React, { useState } from 'react';
import { UserCheck, Plus, Phone, CalendarCheck, Sparkles } from 'lucide-react';

export default function ProfessionalsView({ professionals, onAddProfessional }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProf, setNewProf] = useState({
        name: '',
        specialty: '',
        phone: '',
        color: '#6366F1'
    });

    const presetColors = ['#6366F1', '#EC4899', '#10B981', '#8B5CF6', '#F59E0B', '#3B82F6', '#EF4444'];

    const handleCreateProf = (e) => {
        e.preventDefault();
        if (!newProf.name.trim() || !newProf.specialty.trim()) return;
        onAddProfessional(newProf);
        setNewProf({ name: '', specialty: '', phone: '', color: '#6366F1' });
        setShowAddModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="bento-card p-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold text-white font-display">Staff & Nail Artists</h2>
                    <p className="text-xs text-gray-400">Equipo profesional de cabina y turnos</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                >
                    <Plus size={14} /> Registrar Manicurista
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {professionals.map((prof) => (
                    <div key={prof.id} className="bento-card p-6 flex flex-col justify-between items-center text-center">
                        <div className="w-full flex flex-col items-center">
                            <div className="relative mb-4">
                                {prof.avatar ? (
                                    <img 
                                        src={prof.avatar} 
                                        alt={prof.name} 
                                        className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/10"
                                    />
                                ) : (
                                    <div 
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg"
                                        style={{ backgroundColor: prof.color || '#6366F1' }}
                                    >
                                        {prof.name.slice(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <span 
                                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#1E1E24]"
                                    style={{ backgroundColor: prof.color || '#6366F1' }}
                                    title="Color de agenda"
                                />
                            </div>

                            <h3 className="font-bold text-base text-white">{prof.name}</h3>
                            <p className="text-xs text-indigo-400 font-medium mt-1">{prof.specialty}</p>

                            {prof.phone && (
                                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                                    <Phone size={13} className="text-gray-500" />
                                    <span>{prof.phone}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/10 w-full flex items-center justify-between text-xs">
                            <span className="text-gray-400">Total Citas:</span>
                            <span className="font-bold text-white tabular-nums">
                                {prof.appointments_count || 0}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Nueva Manicurista */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bento-card w-full max-w-md p-6 bg-[#1E1E24] shadow-2xl">
                        <h2 className="text-lg font-bold text-white font-display mb-4">Registrar Manicurista</h2>
                        <form onSubmit={handleCreateProf} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-gray-400 mb-1">Nombre Completo *</label>
                                <input
                                    type="text"
                                    required
                                    value={newProf.name}
                                    onChange={(e) => setNewProf({ ...newProf, name: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="Ej. Valeria López"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Especialidad Principal *</label>
                                <input
                                    type="text"
                                    required
                                    value={newProf.specialty}
                                    onChange={(e) => setNewProf({ ...newProf, specialty: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="Ej. Uñas Esculturales y Diseños 3D"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Teléfono</label>
                                <input
                                    type="text"
                                    value={newProf.phone}
                                    onChange={(e) => setNewProf({ ...newProf, phone: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="55 0000 0000"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Color Distintivo para la Agenda</label>
                                <div className="flex items-center gap-3">
                                    {presetColors.map((color) => (
                                        <button
                                            type="button"
                                            key={color}
                                            onClick={() => setNewProf({ ...newProf, color })}
                                            className={`w-7 h-7 rounded-full border-2 transition ${newProf.color === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
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
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
