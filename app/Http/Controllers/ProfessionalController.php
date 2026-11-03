<?php

namespace App\Http\Controllers;

use App\Models\Professional;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfessionalController extends Controller
{
    public function index(): JsonResponse
    {
        $professionals = Professional::withCount('appointments')
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return response()->json($professionals);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'avatar' => 'nullable|string',
            'color' => 'nullable|string|max:20',
        ]);

        $prof = Professional::create($validated);
        return response()->json($prof, 201);
    }

    public function show(Professional $professional): JsonResponse
    {
        $professional->load('appointments.client', 'appointments.service');
        return response()->json($professional);
    }

    public function update(Request $request, Professional $professional): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'specialty' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:50',
            'avatar' => 'nullable|string',
            'color' => 'nullable|string|max:20',
            'is_active' => 'sometimes|boolean',
        ]);

        $professional->update($validated);
        return response()->json($professional);
    }
}
