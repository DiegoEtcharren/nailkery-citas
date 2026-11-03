<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Client;
use App\Models\Professional;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        $today = Carbon::today()->toDateString();
        $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
        $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

        // Citas de hoy
        $todayAppointments = Appointment::whereDate('date', $today)->count();
        $todayCompleted = Appointment::whereDate('date', $today)->where('status', 'completada')->count();
        $todayConfirmed = Appointment::whereDate('date', $today)->where('status', 'confirmada')->count();
        $todayPending = Appointment::whereDate('date', $today)->where('status', 'pendiente')->count();
        $todayRevenue = Appointment::whereDate('date', $today)
            ->whereIn('status', ['confirmada', 'en_proceso', 'completada'])
            ->sum('total_amount');

        // Métricas del mes
        $monthAppointments = Appointment::whereBetween('date', [$startOfMonth, $endOfMonth])->count();
        $monthRevenue = Appointment::whereBetween('date', [$startOfMonth, $endOfMonth])
            ->whereIn('status', ['confirmada', 'en_proceso', 'completada'])
            ->sum('total_amount');

        $totalClients = Client::count();
        $activeProfessionals = Professional::where('is_active', true)->count();

        // Top Servicios
        $topServices = Service::withCount('appointments')
            ->orderBy('appointments_count', 'desc')
            ->take(5)
            ->get();

        // Citas por profesional
        $professionalsStats = Professional::where('is_active', true)
            ->withCount(['appointments as today_appointments_count' => function ($q) use ($today) {
                $q->whereDate('date', $today);
            }])
            ->withCount('appointments')
            ->get();

        // Próximas citas de hoy
        $upcomingToday = Appointment::with(['client', 'professional', 'service'])
            ->whereDate('date', $today)
            ->orderBy('start_time', 'asc')
            ->take(6)
            ->get();

        return response()->json([
            'today' => [
                'date' => $today,
                'total_appointments' => $todayAppointments,
                'completed' => $todayCompleted,
                'confirmed' => $todayConfirmed,
                'pending' => $todayPending,
                'estimated_revenue' => (float)$todayRevenue,
            ],
            'month' => [
                'total_appointments' => $monthAppointments,
                'revenue' => (float)$monthRevenue,
            ],
            'totals' => [
                'clients' => $totalClients,
                'professionals' => $activeProfessionals,
            ],
            'top_services' => $topServices,
            'professionals_stats' => $professionalsStats,
            'upcoming_today' => $upcomingToday,
        ]);
    }
}
