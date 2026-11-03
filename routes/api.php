<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfessionalController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

Route::apiResource('appointments', AppointmentController::class);
Route::patch('/appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);

Route::apiResource('clients', ClientController::class);
Route::apiResource('professionals', ProfessionalController::class);
Route::apiResource('services', ServiceController::class);
