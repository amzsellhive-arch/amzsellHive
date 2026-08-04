# SellHive Backend (Laravel API)

## Setup
```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Structure
- `app/Http/Controllers/Api`  -> public + admin API controllers
- `app/Models`                -> Lead, AuditRequest, Page, ResultCard, Testimonial, User
- `app/Mail`                  -> ThankYouMail (client), NewLeadNotification (admin)
- `database/migrations`       -> DB schema
- `routes/api.php`            -> all /api/* routes consumed by React
