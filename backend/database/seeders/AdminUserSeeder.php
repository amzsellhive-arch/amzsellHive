<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $password = env('ADMIN_DEFAULT_PASSWORD');

        if (!$password) {
            throw new \RuntimeException('ADMIN_DEFAULT_PASSWORD must be set before seeding the admin user.');
        }

        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@sellhive.com')],
            [
                'name' => env('ADMIN_NAME', 'SellHive Admin'),
                'password' => Hash::make($password),
                'role' => 'admin',
            ]
        );
    }
}
