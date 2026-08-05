# SellHive — Project Skeleton

React (frontend) + Laravel (backend/API)

## Structure
```
sellhive-project/
├── frontend/    -> React + Vite app
├── backend/     -> Laravel API
```

## Getting started

### Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve   # runs on http://localhost:8000
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev          # runs on http://localhost:5173
