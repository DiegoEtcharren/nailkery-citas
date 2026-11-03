<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Client;
use App\Models\Professional;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Professionals (Nail Artists de Nailkery)
        $professionals = [
            [
                'name' => 'Sofía Hernández',
                'specialty' => 'Uñas Esculturales & Acrílico',
                'phone' => '55 1234 5678',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'color' => '#6366F1', // Indigo Brand
                'is_active' => true,
            ],
            [
                'name' => 'Valentina Gómez',
                'specialty' => 'Nail Art Mano Alzada & Cristales',
                'phone' => '55 2345 6789',
                'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
                'color' => '#EC4899', // Pink
                'is_active' => true,
            ],
            [
                'name' => 'Camila Torres',
                'specialty' => 'Pedicura Spa Premium & Jelly',
                'phone' => '55 3456 7890',
                'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
                'color' => '#10B981', // Emerald
                'is_active' => true,
            ],
            [
                'name' => 'Daniela Mendoza',
                'specialty' => 'Manicura Rusa & Nivelación Rubber',
                'phone' => '55 4567 8901',
                'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
                'color' => '#8B5CF6', // Purple
                'is_active' => true,
            ],
        ];

        $profModels = [];
        foreach ($professionals as $p) {
            $profModels[] = Professional::create($p);
        }

        // 2. Services Catálogo Nailkery
        $services = [
            [
                'name' => 'Manicura Rusa + Gel Semi-Permanente',
                'category' => 'Manicura',
                'price' => 450.00,
                'duration_minutes' => 60,
                'description' => 'Limpieza profunda de cutícula con torno y aplicación de gel de alta durabilidad.',
            ],
            [
                'name' => 'Uñas Esculturales Acrílicas (Set Completo)',
                'category' => 'Acrílico & Gel',
                'price' => 780.00,
                'duration_minutes' => 120,
                'description' => 'Estructura en escultural con técnica de reversa o difuminado baby boomer.',
            ],
            [
                'name' => 'Nivelación con Rubber Base + Esmaltado',
                'category' => 'Manicura',
                'price' => 520.00,
                'duration_minutes' => 75,
                'description' => 'Alineamiento y refuerzo para uñas naturales quebradizas con brillo perfecto.',
            ],
            [
                'name' => 'Pedicura Spa Premium Jelly Foot Detox',
                'category' => 'Pedicura',
                'price' => 590.00,
                'duration_minutes' => 90,
                'description' => 'Exfoliación hidratante, tina de gelatina aromática, masaje relajante y esmaltado.',
            ],
            [
                'name' => 'Nail Art Personalizado Avanzado (10 Uñas)',
                'category' => 'Nail Art',
                'price' => 350.00,
                'duration_minutes' => 45,
                'description' => 'Diseños a mano alzada, efectos cromo, foil, cristalería Swarovski y 3D.',
            ],
            [
                'name' => 'Retiro Seguro de Acrílico/Gel + Tratamiento Nutritivo',
                'category' => 'Tratamientos',
                'price' => 220.00,
                'duration_minutes' => 40,
                'description' => 'Remoción cuidadosa sin dañar la lámina ungueal e hidratación intensiva con queratina.',
            ],
            [
                'name' => 'Pedicura Express con Gelish',
                'category' => 'Pedicura',
                'price' => 420.00,
                'duration_minutes' => 60,
                'description' => 'Limpieza básica, corte estético y aplicación de esmalte en gel.',
            ],
        ];

        $servModels = [];
        foreach ($services as $s) {
            $servModels[] = Service::create($s);
        }

        // 3. Clientes Frecuentes
        $clients = [
            ['name' => 'María José Estrada', 'phone' => '55 9876 5432', 'email' => 'majoe@example.com', 'notes' => 'Prefiere tonos pastel y almendrada #3.'],
            ['name' => 'Fernanda Villarreal', 'phone' => '55 8765 4321', 'email' => 'fer.villarreal@example.com', 'notes' => 'Alergia al látex, usar guantes de nitrilo.'],
            ['name' => 'Andrea Salgado', 'phone' => '55 7654 3210', 'email' => 'andrea.salgado@example.com', 'notes' => 'Clienta VIP, le encanta el café cortado.'],
            ['name' => 'Lucía Barrientos', 'phone' => '55 6543 2109', 'email' => 'lucia.b@example.com', 'notes' => 'Uñas naturales delicadas, recomendar Rubber.'],
            ['name' => 'Paola Rivas', 'phone' => '55 5432 1098', 'email' => 'pao.rivas@example.com', 'notes' => 'Diseños aesthetic y minimalistas.'],
            ['name' => 'Karla Navarro', 'phone' => '55 4321 0987', 'email' => 'karla.n@example.com', 'notes' => 'Suele agendar citas dobles de manos y pies.'],
            ['name' => 'Regina Orozco', 'phone' => '55 3210 9876', 'email' => 'regina.o@example.com', 'notes' => 'Puntualidad rigurosa.'],
            ['name' => 'Mariana Carvajal', 'phone' => '55 2109 8765', 'email' => 'mariana.c@example.com', 'notes' => 'Le fascinan los tonos nudes y francesitas.'],
        ];

        $clientModels = [];
        foreach ($clients as $c) {
            $clientModels[] = Client::create($c);
        }

        // 4. Citas de Ejemplo (Hoy, Mañana, Días Pasados y Futuros)
        $today = Carbon::today();
        
        $sampleAppointments = [
            // Citas de Hoy
            [
                'client_id' => $clientModels[0]->id,
                'professional_id' => $profModels[0]->id,
                'service_id' => $servModels[1]->id,
                'date' => $today->toDateString(),
                'start_time' => '10:00:00',
                'end_time' => '12:00:00',
                'status' => 'confirmada',
                'total_amount' => 780.00,
                'payment_method' => 'Tarjeta',
                'notes' => 'Uñas en punta coffin con técnica baby boomer.',
            ],
            [
                'client_id' => $clientModels[1]->id,
                'professional_id' => $profModels[1]->id,
                'service_id' => $servModels[0]->id,
                'date' => $today->toDateString(),
                'start_time' => '10:30:00',
                'end_time' => '11:30:00',
                'status' => 'en_proceso',
                'total_amount' => 450.00,
                'payment_method' => 'Efectivo',
                'notes' => 'Color lila pastel.',
            ],
            [
                'client_id' => $clientModels[2]->id,
                'professional_id' => $profModels[2]->id,
                'service_id' => $servModels[3]->id,
                'date' => $today->toDateString(),
                'start_time' => '12:00:00',
                'end_time' => '13:30:00',
                'status' => 'confirmada',
                'total_amount' => 590.00,
                'payment_method' => 'Transferencia',
                'notes' => 'Jelly spa con esencia de rosas.',
            ],
            [
                'client_id' => $clientModels[3]->id,
                'professional_id' => $profModels[3]->id,
                'service_id' => $servModels[2]->id,
                'date' => $today->toDateString(),
                'start_time' => '14:00:00',
                'end_time' => '15:15:00',
                'status' => 'pendiente',
                'total_amount' => 520.00,
                'payment_method' => 'Pendiente',
                'notes' => 'Confirmar vía WhatsApp 1 hora antes.',
            ],
            [
                'client_id' => $clientModels[4]->id,
                'professional_id' => $profModels[0]->id,
                'service_id' => $servModels[4]->id,
                'date' => $today->toDateString(),
                'start_time' => '16:00:00',
                'end_time' => '16:45:00',
                'status' => 'confirmada',
                'total_amount' => 350.00,
                'payment_method' => 'Tarjeta',
                'notes' => 'Trae referencia de Pinterest con flores.',
            ],
            // Cita completada más temprano
            [
                'client_id' => $clientModels[5]->id,
                'professional_id' => $profModels[3]->id,
                'service_id' => $servModels[0]->id,
                'date' => $today->toDateString(),
                'start_time' => '09:00:00',
                'end_time' => '10:00:00',
                'status' => 'completada',
                'total_amount' => 450.00,
                'payment_method' => 'Tarjeta',
                'notes' => 'Servicio realizado con éxito.',
            ],
            // Citas para mañana
            [
                'client_id' => $clientModels[6]->id,
                'professional_id' => $profModels[1]->id,
                'service_id' => $servModels[1]->id,
                'date' => $today->copy()->addDay()->toDateString(),
                'start_time' => '11:00:00',
                'end_time' => '13:00:00',
                'status' => 'confirmada',
                'total_amount' => 780.00,
                'payment_method' => 'Pendiente',
                'notes' => 'Efecto ojo de gato (Cat Eye).',
            ],
            [
                'client_id' => $clientModels[7]->id,
                'professional_id' => $profModels[2]->id,
                'service_id' => $servModels[3]->id,
                'date' => $today->copy()->addDay()->toDateString(),
                'start_time' => '15:00:00',
                'end_time' => '16:30:00',
                'status' => 'pendiente',
                'total_amount' => 590.00,
                'payment_method' => 'Pendiente',
                'notes' => 'Spa de pies con parafinoterapia.',
            ],
        ];

        foreach ($sampleAppointments as $appData) {
            Appointment::create($appData);
        }
    }
}
