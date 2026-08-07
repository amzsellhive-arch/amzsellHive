# SellHive — Project Skeleton

React (frontend) + Laravel (backend/API)

## Structure
```
sellhive-project/
├── frontend/    -> React + Vite app
├── backend/     -> Laravel API
```

## Getting started

### One-click start (Windows)
Double-click **`start-servers.bat`** in the project root. It will:
1. Start the Laravel backend on `http://localhost:8000`
2. Start the React frontend on `http://localhost:5173`

### Manual start

#### Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve   # runs on http://localhost:8000
```

#### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev          # runs on http://localhost:5173
```

## Contact Form — Data Flow

When a user submits the **Contact form** (`/contact`):
1. Frontend sends `POST /api/leads` with `{ name, email, brand, topic, message }`
2. Backend saves to the `leads` table in MySQL
3. Backend sends:
   - **Thank-you email** to the user
   - **New lead notification** to the admin (ishfaq@sellhive.com)
4. Frontend shows the thank-you message

### ⚠️ Important: Backend must be running
If the Laravel backend is **not running**, the form submission will be saved in a **localStorage queue** (`leadQueue.js`) and automatically retried when the backend comes back online. The user still sees the thank-you message immediately.

## Email Notifications

Currently, emails are **logged to a file** (`backend/storage/logs/laravel.log`) because the mailer is set to `MAIL_MAILER=log`.

### To enable real email delivery (Gmail example):
1. Get an [App Password](https://support.google.com/accounts/answer/185833) from Google
2. Update `backend/.env`:
   ```
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your@gmail.com
   MAIL_PASSWORD=your-app-password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS="your@gmail.com"
   MAIL_FROM_NAME="SellHive"
   MAIL_ADMIN_ADDRESS="ishfaq@sellhive.com"
   ```
3. Run `php artisan config:clear` to reload the config

### Admin notification email
The admin email address is set in `backend/.env` as `MAIL_ADMIN_ADDRESS`. Currently set to `ishfaq@sellhive.com` — replace with your real email.

## Admin Panel
- URL: `/admin`
- Login: `/admin/login`
- Default admin credentials were set via seeder (check `AdminUserSeeder.php`)
