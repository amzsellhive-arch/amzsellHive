<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sellhive.com'],
            [
                'name' => 'Ishfaq Ahmad',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );
    }
}
