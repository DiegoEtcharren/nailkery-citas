import React, { useState } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar as CalendarIcon, 
    Clock, 
    Plus,
    User,
    Sparkles
} from 'lucide-react';
import dayjs from 'dayjs';

export default function CalendarView({ 
    appointments, 
    professionals, 
    selectedDate, 
    setSelectedDate, 
    onOpenNewAppointment,
    onSelectAppointment 
}) {
    const hours = [
        '09:00', '10:00', '11:00', '12:00', '13:00', 
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const handlePrevDay = () => {
        setSelectedDate(dayjs(selectedDate).subtract(1, 'day').format('YYYY-MM-DD'));
    };

    const handleNextDay = () => {
        setSelectedDate(dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
    };

    const handleToday = () => {
        setSelectedDate(dayjs().format('YYYY-MM-DD'));
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmada':
                return 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300';
            case 'en_proceso':
                return 'border-purple-500/40 bg-purple-500/10 text-purple-300 animate-pulse';
            case 'completada':
                return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
            case 'cancelada':
                return 'border-rose-500/40 bg-rose-500/10 text-rose-300 line-through opacity-60';
            default:
                return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
        }
    };

    return (
        <div className="space-y-6">
            {/* Calendar Controls Bar */}
            <div className="bento-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#16161A] rounded-xl border border-white/10 p-1">
                        <button
                            onClick={handlePrevDay}
                            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={handleToday}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition"
                        >
                            Hoy
                        </button>
                        <button
                            onClick={handleNextDay}
                            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-indigo-400" />
                        <span className="font-bold text-white font-display capitalize">
                            {dayjs(selectedDate).format('dddd, D [de] MMMM [de] YYYY')}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-[#16161A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                        onClick={() => onOpenNewAppointment({ date: selectedDate })}
                        className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                        <Plus size={16} />
                        <span>Nueva Cita</span>
                    </button>
                </div>
            </div>

            {/* Agenda Columns Grid */}
            <div className="bento-card overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Headers: Profesionales */}
                        <div className="grid grid-cols-[100px_repeat(auto-fit,minmax(180px,1fr))] border-b border-white/10 bg-[#16161A]/50">
                            <div className="p-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-white/10 flex items-center justify-center">
                                Hora
                            </div>
                            {professionals.map((prof) => (
                                <div key={prof.id} className="p-4 text-center border-r border-white/10 last:border-r-0">
                                    <div className="flex items-center justify-center gap-2">
                                        <div 
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow"
                                            style={{ backgroundColor: prof.color || '#6366F1' }}
                                        >
                                            {prof.name.slice(0, 1)}
                                        </div>
                                        <span className="font-semibold text-sm text-white">{prof.name}</span>
                                    </div>
                                    <span className="text-[11px] text-gray-400 block mt-0.5 truncate">{prof.specialty}</span>
                                </div>
                            ))}
                        </div>

                        {/* Slots */}
                        <div className="divide-y divide-white/5">
                            {hours.map((hour) => (
                                <div key={hour} className="grid grid-cols-[100px_repeat(auto-fit,minmax(180px,1fr))] min-h-[90px]">
                                    {/* Hour Label */}
                                    <div className="p-3 text-center text-xs font-medium text-gray-400 border-r border-white/10 flex items-start justify-center pt-3 bg-[#16161A]/30 tabular-nums">
                                        {hour}
                                    </div>

                                    {/* Columns per Professional */}
                                    {professionals.map((prof) => {
                                        const profApps = appointments.filter(a => {
                                            if (a.professional_id !== prof.id) return false;
                                            const startH = a.start_time.slice(0, 2);
                                            return startH === hour.slice(0, 2);
                                        });

                                        return (
                                            <div 
                                                key={prof.id} 
                                                className="p-1.5 border-r border-white/10 last:border-r-0 hover:bg-white/[0.02] transition relative group"
                                            >
                                                {profApps.length > 0 ? (
                                                    <div className="space-y-1.5 h-full">
                                                        {profApps.map((app) => (
                                                            <div
                                                                key={app.id}
                                                                onClick={() => onSelectAppointment && onSelectAppointment(app)}
                                                                className={`p-2.5 rounded-xl border text-xs cursor-pointer shadow-sm transition hover:scale-[1.02] ${getStatusStyle(app.status)}`}
                                                            >
                                                                <div className="flex items-center justify-between font-semibold">
                                                                    <span className="truncate">{app.client?.name}</span>
                                                                    <span className="text-[10px] tabular-nums font-bold">
                                                                        {app.start_time.slice(0, 5)} - {app.end_time?.slice(0, 5)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[11px] truncate opacity-90 mt-0.5 font-medium">
                                                                    {app.service?.name}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => onOpenNewAppointment({
                                                            date: selectedDate,
                                                            professional_id: prof.id,
                                                            start_time: `${hour}:00`
                                                        })}
                                                        className="w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-indigo-400 hover:text-white rounded-lg transition"
                                                        title="Agendar aquí"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
