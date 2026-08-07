<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuditRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|min:3',
            'brand' => 'required|string|max:255|min:2',
            'email' => 'required|email',
            'revenue_range' => 'nullable|string',
            'marketplace' => 'nullable|string',
            'problem' => 'nullable|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your full name.',
            'name.min' => 'Your name must be at least 3 characters.',
            'brand.required' => 'Please enter your brand / store name.',
            'brand.min' => 'Brand name must be at least 2 characters.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'problem.min' => 'Please give a few more details (at least 10 characters).',
        ];
    }
}
