<?php

return [

    'driver' => env('BCRYPT_ROUNDS', 'bcrypt'),

    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 12),
        'verify' => env('HASH_VERIFY', true),
        'max_passwords' => env('BCRYPT_MAX_PASSWORDS', 100000),
    ],

    'argon' => [
        'memory' => env('ARGON_MEMORY', 65536),
        'time' => env('ARGON_TIME', 4),
        'threads' => env('ARGON_THREADS', 1),
        'verify' => env('HASH_VERIFY', true),
        'max_passwords' => env('ARGON_MAX_PASSWORDS', 100000),
    ],

];
