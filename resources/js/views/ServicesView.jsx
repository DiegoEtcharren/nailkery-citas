import React, { useState } from 'react';
import { Sparkles, Clock, DollarSign, Plus } from 'lucide-react';

export default function ServicesView({ services, onAddService }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newService, setNewService] = useState({
        name: '',
        category: 'Manicura',
        price: '',
        duration_minutes: 60,
        description: ''
    });

    const categories = ['all', 'Manicura', 'Pedicura', 'Acrílico & Gel', 'Nail Art', 'Tratamientos'];

    const filteredServices = services.filter(s => {
        if (selectedCategory === 'all') return true;
        return s.category === selectedCategory;
    });

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
        }).format(val || 0);
    };

    const handleCreateService = (e) => {
        e.preventDefault();
        if (!newService.name.trim() || !newService.price) return;
        onAddService({
            ...newService,
            price: parseFloat(newService.price),
            duration_minutes: parseInt(newService.duration_minutes)
        });
        setNewService({ name: '', category: 'Manicura', price: '', duration_minutes: 60, description: '' });
        setShowAddModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="bento-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                    : 'bg-[#16161A] text-gray-400 hover:text-white border border-white/5'
                            }`}
                        >
                            {cat === 'all' ? 'Todos los Servicios' : cat}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2 rounded-xl transition shrink-0"
                >
                    <Plus size={14} /> Nuevo Servicio
                </button>
            </div>

            {/* Services Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map((service) => (
                    <div key={service.id} className="bento-card p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    {service.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock size={13} className="text-gray-500" />
                                    <span>{service.duration_minutes} min</span>
                                </div>
                            </div>

                            <h3 className="font-bold text-base text-white mt-3">{service.name}</h3>

                            <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                                {service.description || 'Servicio profesional para el cuidado y estética de uñas.'}
                            </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs text-gray-400">Tarifa</span>
                            <span className="text-lg font-extrabold text-white font-display tabular-nums">
                                {formatCurrency(service.price)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Service Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bento-card w-full max-w-md p-6 bg-[#1E1E24] shadow-2xl">
                        <h2 className="text-lg font-bold text-white font-display mb-4">Agregar Nuevo Servicio</h2>
                        <form onSubmit={handleCreateService} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-gray-400 mb-1">Nombre del Servicio *</label>
                                <input
                                    type="text"
                                    required
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="Ej. Uñas Press-on Gel X"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-gray-400 mb-1">Categoría</label>
                                    <select
                                        value={newService.category}
                                        onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                                        className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="Manicura">Manicura</option>
                                        <option value="Pedicura">Pedicura</option>
                                        <option value="Acrílico & Gel">Acrílico & Gel</option>
                                        <option value="Nail Art">Nail Art</option>
                                        <option value="Tratamientos">Tratamientos</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-1">Duración (minutos)</label>
                                    <input
                                        type="number"
                                        required
                                        min="15"
                                        step="15"
                                        value={newService.duration_minutes}
                                        onChange={(e) => setNewService({ ...newService, duration_minutes: e.target.value })}
                                        className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Precio (MXN) *</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="10"
                                    value={newService.price}
                                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                    placeholder="450"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Descripción</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    rows="3"
                                    className="w-full bg-[#16161A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 resize-none"
                                    placeholder="Detalles del procedimiento y productos utilizados..."
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
                                    Guardar Servicio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
