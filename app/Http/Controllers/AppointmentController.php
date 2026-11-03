<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of appointments with optional filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Appointment::with(['client', 'professional', 'service']);

        // Date filter
        if ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        } elseif ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        // Professional filter
        if ($request->filled('professional_id') && $request->professional_id !== 'all') {
            $query->where('professional_id', $request->professional_id);
        }

        // Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $appointments = $query->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return response()->json($appointments);
    }

    /**
     * Store a newly created appointment.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'professional_id' => 'required|exists:professionals,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'nullable',
            'status' => 'nullable|in:pendiente,confirmada,en_proceso,completada,cancelada',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if (empty($validated['end_time'])) {
            // Auto compute end_time if omitted based on service duration
            $service = \App\Models\Service::find($validated['service_id']);
            $startTime = Carbon::parse($validated['start_time']);
            $duration = $service ? $service->duration_minutes : 60;
            $validated['end_time'] = $startTime->copy()->addMinutes($duration)->format('H:i:s');
        }

        $appointment = Appointment::create($validated);
        $appointment->load(['client', 'professional', 'service']);

        return response()->json([
            'message' => 'Cita creada exitosamente',
            'appointment' => $appointment
        ], 201);
    }

    /**
     * Display the specified appointment.
     */
    public function show(Appointment $appointment): JsonResponse
    {
        $appointment->load(['client', 'professional', 'service']);
        return response()->json($appointment);
    }

    /**
     * Update the specified appointment.
     */
    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        $validated = $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'professional_id' => 'sometimes|exists:professionals,id',
            'service_id' => 'sometimes|exists:services,id',
            'date' => 'sometimes|date',
            'start_time' => 'sometimes',
            'end_time' => 'sometimes',
            'status' => 'sometimes|in:pendiente,confirmada,en_proceso,completada,cancelada',
            'total_amount' => 'sometimes|numeric|min:0',
            'payment_method' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($validated);
        $appointment->load(['client', 'professional', 'service']);

        return response()->json([
            'message' => 'Cita actualizada exitosamente',
            'appointment' => $appointment
        ]);
    }

    /**
     * Quick status update.
     */
    public function updateStatus(Request $request, Appointment $appointment): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pendiente,confirmada,en_proceso,completada,cancelada'
        ]);

        $appointment->update(['status' => $validated['status']]);
        $appointment->load(['client', 'professional', 'service']);

        return response()->json([
            'message' => 'Estado actualizado',
            'appointment' => $appointment
        ]);
    }

    /**
     * Remove the specified appointment.
     */
    public function destroy(Appointment $appointment): JsonResponse
    {
        $appointment->delete();
        return response()->json(['message' => 'Cita eliminada']);
    }
}
