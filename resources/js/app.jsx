import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import CalendarView from './views/CalendarView';
import AppointmentsListView from './views/AppointmentsListView';
import ClientsView from './views/ClientsView';
import ServicesView from './views/ServicesView';
import ProfessionalsView from './views/ProfessionalsView';
import NewAppointmentModal from './modals/NewAppointmentModal';
import dayjs from 'dayjs';

export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Data states
    const [stats, setStats] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [clients, setClients] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [services, setServices] = useState([]);

    // Calendar state
    const [calendarDate, setCalendarDate] = useState(dayjs().format('YYYY-MM-DD'));

    // Modal state
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [appointmentInitialData, setAppointmentInitialData] = useState(null);

    // Toast state
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Load initial data
    const fetchAllData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const [statsRes, appsRes, clientsRes, profsRes, servsRes] = await Promise.all([
                fetch('/api/dashboard/stats'),
                fetch('/api/appointments'),
                fetch('/api/clients'),
                fetch('/api/professionals'),
                fetch('/api/services'),
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (appsRes.ok) setAppointments(await appsRes.json());
            if (clientsRes.ok) setClients(await clientsRes.json());
            if (profsRes.ok) setProfessionals(await profsRes.json());
            if (servsRes.ok) setServices(await servsRes.json());
        } catch (err) {
            console.error('Error fetching data:', err);
            showToast('Error al conectar con la API de Nailkery', 'error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    // Create Appointment
    const handleCreateAppointment = async (payload) => {
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Error al guardar la cita');

            showToast('¡Cita agendada exitosamente!', 'success');
            setIsNewAppointmentOpen(false);
            setAppointmentInitialData(null);
            fetchAllData(true);
        } catch (err) {
            console.error(err);
            showToast('No se pudo guardar la cita', 'error');
        }
    };

    // Update Status
    const handleUpdateAppointmentStatus = async (id, status) => {
        try {
            const res = await fetch(`/api/appointments/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error('Error al actualizar');

            showToast(`Estado actualizado a ${status}`, 'success');
            fetchAllData(true);
        } catch (err) {
            console.error(err);
            showToast('Error al cambiar el estado', 'error');
        }
    };

    // Delete Appointment
    const handleDeleteAppointment = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta cita?')) return;

        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Error al eliminar');

            showToast('Cita eliminada', 'success');
            fetchAllData(true);
        } catch (err) {
            console.error(err);
            showToast('Error al eliminar la cita', 'error');
        }
    };

    // Quick Add Client
    const handleQuickAddClient = async (clientData) => {
        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientData),
            });

            if (!res.ok) throw new Error('Error al registrar cliente');

            const created = await res.json();
            setClients(prev => [...prev, created]);
            return created;
        } catch (err) {
            console.error(err);
            showToast('Error al registrar la clienta', 'error');
            return null;
        }
    };

    // Add Service
    const handleAddService = async (serviceData) => {
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData),
            });

            if (!res.ok) throw new Error('Error');

            showToast('Servicio agregado al catálogo', 'success');
            fetchAllData(true);
        } catch (err) {
            console.error(err);
            showToast('Error al guardar el servicio', 'error');
        }
    };

    // Add Professional
    const handleAddProfessional = async (profData) => {
        try {
            const res = await fetch('/api/professionals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profData),
            });

            if (!res.ok) throw new Error('Error');

            showToast('Manicurista registrada en el equipo', 'success');
            fetchAllData(true);
        } catch (err) {
            console.error(err);
            showToast('Error al registrar manicurista', 'error');
        }
    };

    const handleOpenNewAppointment = (prefill = null) => {
        setAppointmentInitialData(prefill);
        setIsNewAppointmentOpen(true);
    };

    const getPageTitle = () => {
        switch (currentPage) {
            case 'calendar': return 'Agenda & Calendario de Citas';
            case 'appointments': return 'Directorio General de Citas';
            case 'clients': return 'Clientas Registradas';
            case 'services': return 'Catálogo de Servicios & Tarifas';
            case 'professionals': return 'Equipo de Manicuristas';
            default: return 'Dashboard & Métricas de Citas';
        }
    };

    const getPageSubtitle = () => {
        switch (currentPage) {
            case 'calendar': return 'Visualiza los horarios y cabinas por manicurista';
            case 'appointments': return 'Histórico, búsqueda y filtrado de todas las citas';
            case 'clients': return 'Historial y notas personalizadas de cada clienta';
            case 'services': return 'Tiempos de ejecución y precios de servicios';
            case 'professionals': return 'Manicuristas activas y especialidades';
            default: return 'Monitoreo en tiempo real de citas e ingresos del salón';
        }
    };

    return (
        <div className="flex min-h-screen bg-[#16161A] text-white">
            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onOpenNewAppointment={() => handleOpenNewAppointment()}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    title={getPageTitle()}
                    subtitle={getPageSubtitle()}
                    onRefresh={() => fetchAllData(true)}
                    refreshing={refreshing}
                    onOpenNewAppointment={() => handleOpenNewAppointment()}
                />

                <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
                    {currentPage === 'dashboard' && (
                        <DashboardView
                            stats={stats}
                            loading={loading}
                            onOpenNewAppointment={handleOpenNewAppointment}
                            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                            onNavigate={setCurrentPage}
                        />
                    )}

                    {currentPage === 'calendar' && (
                        <CalendarView
                            appointments={appointments}
                            professionals={professionals}
                            selectedDate={calendarDate}
                            setSelectedDate={setCalendarDate}
                            onOpenNewAppointment={handleOpenNewAppointment}
                        />
                    )}

                    {currentPage === 'appointments' && (
                        <AppointmentsListView
                            appointments={appointments}
                            professionals={professionals}
                            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                            onDeleteAppointment={handleDeleteAppointment}
                            onOpenNewAppointment={handleOpenNewAppointment}
                        />
                    )}

                    {currentPage === 'clients' && (
                        <ClientsView
                            clients={clients}
                            onAddClient={handleQuickAddClient}
                            onOpenNewAppointment={handleOpenNewAppointment}
                        />
                    )}

                    {currentPage === 'services' && (
                        <ServicesView
                            services={services}
                            onAddService={handleAddService}
                        />
                    )}

                    {currentPage === 'professionals' && (
                        <ProfessionalsView
                            professionals={professionals}
                            onAddProfessional={handleAddProfessional}
                        />
                    )}
                </main>
            </div>

            {/* New Appointment Modal */}
            <NewAppointmentModal
                isOpen={isNewAppointmentOpen}
                onClose={() => {
                    setIsNewAppointmentOpen(false);
                    setAppointmentInitialData(null);
                }}
                clients={clients}
                professionals={professionals}
                services={services}
                initialData={appointmentInitialData}
                onSubmit={handleCreateAppointment}
                onQuickAddClient={handleQuickAddClient}
            />

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-2 animate-bounce ${
                    toast.type === 'error'
                        ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                        : 'bg-[#1E1E24]/95 border-indigo-500/50 text-indigo-200 shadow-indigo-500/10'
                }`}>
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
}
