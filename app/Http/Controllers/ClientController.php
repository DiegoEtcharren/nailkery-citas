<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Client::withCount('appointments')
            ->withSum('appointments as total_spent', 'total_amount')
            ->with(['appointments' => function ($q) {
                $q->orderBy('date', 'desc')
                  ->orderBy('start_time', 'desc')
                  ->take(1)
                  ->with(['service', 'professional']);
            }]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        $clients = $query->orderBy('name')->get();

        // Format clean attributes for frontend
        $formatted = $clients->map(function ($c) {
            $lastApp = $c->appointments->first();
            return [
                'id' => $c->id,
                'name' => $c->name,
                'phone' => $c->phone,
                'email' => $c->email,
                'notes' => $c->notes,
                'appointments_count' => $c->appointments_count ?? 0,
                'total_spent' => (float)($c->total_spent ?? 0),
                'last_visit_date' => $lastApp ? $lastApp->date : null,
                'last_service_name' => $lastApp && $lastApp->service ? $lastApp->service->name : null,
                'last_professional_name' => $lastApp && $lastApp->professional ? $lastApp->professional->name : null,
                'created_at' => $c->created_at ? $c->created_at->format('Y-m-d') : null,
            ];
        });

        return response()->json($formatted);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'notes' => 'nullable|string',
        ]);

        $client = Client::create($validated);
        return response()->json($client, 201);
    }

    public function show(Client $client): JsonResponse
    {
        $client->load(['appointments.service', 'appointments.professional']);
        return response()->json($client);
    }

    public function update(Request $request, Client $client): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'notes' => 'nullable|string',
        ]);

        $client->update($validated);
        return response()->json($client);
    }

    public function destroy(Client $client): JsonResponse
    {
        $client->delete();
        return response()->json(['message' => 'Cliente eliminado']);
    }
}
