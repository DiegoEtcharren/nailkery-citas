import React from 'react';
import { RefreshCw, Calendar as CalendarIcon, Plus } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export default function Header({ 
    title, 
    subtitle, 
    onRefresh, 
    refreshing, 
    onOpenNewAppointment 
}) {
    const todayFormatted = dayjs().format('dddd, D [de] MMMM [de] YYYY');

    return (
        <header className="h-20 bg-[#16161A]/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/10 px-8 flex items-center justify-between">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-white font-display capitalize tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xs text-gray-400 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Date display pill */}
                <div className="hidden sm:flex items-center gap-2 bg-[#1E1E24] px-3.5 py-2 rounded-xl border border-white/10 text-xs font-medium text-gray-300 capitalize">
                    <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{todayFormatted}</span>
                </div>

                {/* Refresh button */}
                <button
                    onClick={onRefresh}
                    disabled={refreshing}
                    className="p-2.5 bg-[#1E1E24] hover:bg-[#25252D] text-gray-300 hover:text-white rounded-xl border border-white/10 transition flex items-center justify-center disabled:opacity-50"
                    title="Actualizar datos"
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-indigo-400' : ''}`} />
                </button>

                {/* Quick Add CTA */}
                <button
                    onClick={onOpenNewAppointment}
                    className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254E8] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agendar Cita</span>
                </button>
            </div>
        </header>
    );
}
