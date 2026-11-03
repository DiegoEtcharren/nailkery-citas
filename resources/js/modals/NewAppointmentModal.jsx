import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, DollarSign, User, Sparkles, UserCheck } from 'lucide-react';
import dayjs from 'dayjs';

export default function NewAppointmentModal({ 
    isOpen, 
    onClose, 
    clients, 
    professionals, 
    services, 
    initialData, 
    onSubmit,
    onQuickAddClient 
}) {
    if (!isOpen) return null;

    const [clientId, setClientId] = useState(initialData?.client_id || (clients[0]?.id || ''));
    const [professionalId, setProfessionalId] = useState(initialData?.professional_id || (professionals[0]?.id || ''));
    const [serviceId, setServiceId] = useState(initialData?.service_id || (services[0]?.id || ''));
    const [date, setDate] = useState(initialData?.date || dayjs().format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState(initialData?.start_time || '10:00:00');
    const [paymentMethod, setPaymentMethod] = useState('Pendiente');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('confirmada');

    // Quick client creation inline toggle
    const [isCreatingClient, setIsCreatingClient] = useState(false);
    const [quickClientName, setQuickClientName] = useState('');
    const [quickClientPhone, setQuickClientPhone] = useState('');

    const selectedService = services.find(s => String(s.id) === String(serviceId));
    const totalAmount = selectedService ? selectedService.price : 0;

    // Compute end time based on selected service duration
    const computeEndTime = () => {
        if (!startTime) return '11:00:00';
        const duration = selectedService ? selectedService.duration_minutes : 60;
        const [h, m] = startTime.split(':');
        return dayjs().hour(parseInt(h)).minute(parseInt(m)).add(duration, 'minute').format('HH:mm:00');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalClientId = clientId;
        if (isCreatingClient) {
            if (!quickClientName.trim()) return;
            const newClient = await onQuickAddClient({
                name: quickClientName,
                phone: quickClientPhone
            });
            if (newClient && newClient.id) {
                finalClientId = newClient.id;
            }
        }

        const payload = {
            client_id: finalClientId,
            professional_id: professionalId,
            service_id: serviceId,
            date,
            start_time: startTime.length === 5 ? `${startTime}:00` : startTime,
            end_time: computeEndTime(),
            total_amount: totalAmount,
            payment_method: paymentMethod,
            status,
            notes,
        };

        onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bento-card w-full max-w-lg p-6 bg-[#1E1E24] shadow-2xl my-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white font-display">Agendar Nueva Cita</h2>
                            <p className="text-xs text-gray-400">Salón Nailkery</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {/* Client Selection / Quick Creation */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-gray-400 font-medium">Clienta *</label>
                            <button
                                type="button"
                                onClick={() => setIsCreatingClient(!isCreatingClient)}
                                className="text-indigo-400 hover:underline text-[11px]"
                            >
                                {isCreatingClient ? 'Elegir clienta existente' : '+ Registrar nueva clienta'}
                            </button>
                        </div>

                        {!isCreatingClient ? (
                            <select
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                                required
                            >
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name} {c.phone ? `(${c.phone})` : ''}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="space-y-2 bg-[#16161A] p-3 rounded-xl border border-indigo-500/30">
                                <input
                                    type="text"
                                    placeholder="Nombre completo de la clienta *"
                                    value={quickClientName}
                                    onChange={(e) => setQuickClientName(e.target.value)}
                                    className="w-full bg-[#1E1E24] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Teléfono / WhatsApp"
                                    value={quickClientPhone}
                                    onChange={(e) => setQuickClientPhone(e.target.value)}
                                    className="w-full bg-[#1E1E24] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Professional Selection */}
                    <div>
                        <label className="block text-gray-400 font-medium mb-1">Manicurista Asignada *</label>
                        <select
                            value={professionalId}
                            onChange={(e) => setProfessionalId(e.target.value)}
                            className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                            required
                        >
                            {professionals.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} — {p.specialty}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Service Selection */}
                    <div>
                        <label className="block text-gray-400 font-medium mb-1">Servicio *</label>
                        <select
                            value={serviceId}
                            onChange={(e) => setServiceId(e.target.value)}
                            className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                            required
                        >
                            {services.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.duration_minutes} min) — ${s.price} MXN
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-gray-400 font-medium mb-1">Fecha *</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 font-medium mb-1">Hora Inicio *</label>
                            <input
                                type="time"
                                required
                                value={startTime.slice(0, 5)}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Payment and Initial Status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-gray-400 font-medium mb-1">Método de Pago</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="Pendiente">Pendiente al finalizar</option>
                                <option value="Tarjeta">Tarjeta (Terminal)</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 font-medium mb-1">Estado Inicial</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-[#16161A] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="confirmada">Confirmada</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en_proceso">En Proceso</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-gray-400 font-medium mb-1">Notas / Diseño</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="2"
                            placeholder="Color preferido, largo de uñas, detalles o referencia..."
                            className="w-full bg-[#16161A] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 resize-none"
                        />
                    </div>

                    {/* Summary pill */}
                    <div className="p-3 rounded-xl bg-[#16161A] border border-white/5 flex items-center justify-between">
                        <div>
                            <span className="text-[11px] text-gray-400 block">Total a cobrar:</span>
                            <span className="text-base font-extrabold text-emerald-400 font-display tabular-nums">
                                ${totalAmount} MXN
                            </span>
                        </div>
                        <div className="text-right text-[11px] text-gray-400">
                            Duración aprox: <span className="text-white font-medium">{selectedService?.duration_minutes || 60} min</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-white transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E6] hover:to-[#7C4DFF] text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition active:scale-95"
                        >
                            Confirmar y Agendar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
