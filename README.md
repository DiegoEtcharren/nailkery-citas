# 💅 Nailkery - Sistema de Citas & Salón

Sistema moderno de gestión y agendamiento de citas para **Nailkery**, desarrollado con **Laravel**, **React 18**, **Vite**, **Tailwind CSS** y **MySQL**.

Diseñado bajo la misma línea gráfica estética **Dribbble Bento Grid Dark Mode** del ecosistema Nailkery, optimizado tanto para escritorio como para dispositivos móviles (tablets y smartphones en cabina).

---

## 🚀 Stack Tecnológico

* **Backend & API:** **Laravel 12 / 13 (PHP 8.3)** con controladores RESTful, Eloquent ORM, migraciones estructuradas y seeders con datos iniciales de cabina.
* **Frontend:** **React 18** (SPA) montado sobre Blade con componentes modulares, gestión de citas y feedback reactivo.
* **Build Tool:** **Vite** con soporte HMR (`@vitejs/plugin-react` y `@tailwindcss/vite`).
* **Estilos & UI:** **Tailwind CSS** con tokens de diseño Nailkery (`#16161A`, `#1E1E24`, `#25252D`, `#6366F1`, `#10B981`, `#EF4444`, `#8B5CF6`).
* **Base de Datos:** **MySQL 8.0** relacional.
* **Contenedores:** **Docker & Docker Compose** multi-servicio (`nailkery-citas-app` y `nailkery-citas-db`).

---

## 📋 Módulos del Sistema

1. **Dashboard & Métricas:**
   - Tarjetas Bento de KPIs: Citas de Hoy, Ingresos Estimados, Citas del Mes y Capacidad Activa.
   - Agenda interactiva del día en tiempo real con cambio rápido de estados (Confirmar, Iniciar Servicio, Finalizar, Cancelar).
   - Top Servicios más solicitados y carga de trabajo por manicurista.

2. **Agenda & Calendario:**
   - Vista diaria dividida en columnas por cada manicurista en turno con sus colores distintivos.
   - Franjas horarias (09:00 a 20:00) con tarjetas visuales de citas encajadas según su horario y duración.
   - Creación rápida de cita con un solo clic sobre la casilla del profesional y hora deseada.

3. **Lista de Citas:**
   - Tabla interactiva con filtros combinados por estado (`Pendiente`, `Confirmada`, `En Proceso`, `Completada`, `Cancelada`), manicurista y buscador por nombre o servicio.
   - Acciones inmediatas de cambio de estado y eliminación de citas.

4. **Directorio de Clientas:**
   - Catálogo de clientas con teléfono/WhatsApp, email, notas de preferencias (forma de uña, alergias) e historial de citas.

5. **Catálogo de Servicios & Tarifas:**
   - Manicura Rusa, Esculturales Acrílicas, Nivelación Rubber, Pedicura Spa Jelly, Nail Art a Mano Alzada, etc., con duración en minutos y precio en MXN.

6. **Equipo de Manicuristas:**
   - Perfil de cada profesional con especialidad, color asignado en la agenda y métricas de citas.

7. **Modal Interactivo de Nueva Cita:**
   - Selección o registro express de clienta, asignación de manicurista, cálculo automático de hora de finalización según la duración del servicio y total a cobrar.

---

## 🐳 Ejecución con Docker (Recomendada)

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/DiegoEtcharren/nailkery-citas.git
   cd nailkery-citas
   ```

2. **Iniciar los contenedores:**
   ```bash
   docker compose up -d --build
   ```

3. **Acceder a la aplicación:**
   - Panel Web: [http://localhost:8000](http://localhost:8000)
   - Base de Datos MySQL externa (opcional): Puerto `3308` (Usuario: `nailkery_user`, Contraseña: `secret`, BD: `nailkery_citas`).

*El contenedor corre automáticamente las migraciones y seeders con datos iniciales de prueba.*

---

## 💻 Ejecución en Entorno Local (Laragon / PHP Nativo)

1. **Instalar dependencias de PHP y Node:**
   ```bash
   composer install
   npm install
   ```

2. **Configurar el entorno:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Ejecutar migraciones y datos de prueba:**
   ```bash
   php artisan migrate:fresh --seed
   ```

4. **Compilar assets y levantar el servidor:**
   ```bash
   npm run build
   php artisan serve
   ```
   *Para desarrollo con recarga en vivo (HMR):*
   ```bash
   npm run dev
   ```

---

## 📡 API REST Endpoints

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/stats` | Métricas generales, citas hoy, top servicios y staff |
| `GET` | `/api/appointments` | Listar citas (filtros: `date`, `start_date`, `end_date`, `professional_id`, `status`) |
| `POST` | `/api/appointments` | Crear nueva cita |
| `GET` | `/api/appointments/{id}` | Detalle de una cita |
| `PUT/PATCH` | `/api/appointments/{id}` | Actualizar datos de cita |
| `PATCH` | `/api/appointments/{id}/status` | Cambio rápido de estado |
| `DELETE` | `/api/appointments/{id}` | Eliminar cita |
| `GET` | `/api/clients` | Listar clientas registradas |
| `POST` | `/api/clients` | Registrar nueva clienta |
| `GET` | `/api/professionals` | Listar manicuristas activas |
| `GET` | `/api/services` | Catálogo de servicios y precios |
