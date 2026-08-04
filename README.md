# SellHive — Project Skeleton

React (frontend) + Laravel (backend/API) + MySQL — decoupled architecture.

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
```

## Suggested work split (2 devs)
- **Dev 1 — Backend:** migrations, models, controllers, auth, mail/notifications, CMS API
- **Dev 2 — Frontend:** components, pages, forms, API integration, routing

Agree on the API contract (endpoint names + request/response shape) FIRST — see `backend/routes/api.php`,
it already lists the planned endpoints as a starting reference.

## Git workflow
```
main        -> production-ready only
develop     -> integration branch, both devs merge here
feature/*   -> one branch per task, branched from develop

git checkout develop
git pull origin develop
git checkout -b feature/your-task-name
# ...work, commit...
git push origin feature/your-task-name
# open PR: feature/your-task-name -> develop
```
Never commit directly to `main` or `develop`. Pull `develop` into your feature branch
regularly to avoid large merge conflicts.

## Reference docs (client requirements)
- `Home_Page_Website.pdf`      -> homepage section-by-section brief (13 sections + page flow)
- `Agency-Simple-Flow.html`    -> user/admin flow, lead status stages, CMS pages list
- `about.html`, `services.html`, `results.html`, `contact.html`, `audit.html`
  -> finished copy/content reference for those pages
