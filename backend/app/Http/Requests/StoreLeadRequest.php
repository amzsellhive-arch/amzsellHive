<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|min:3',
            'email' => 'required|email',
            'brand' => 'nullable|string|max:255|min:2',
            'topic' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'service_interest' => 'nullable|string',
            'products_count' => 'nullable|integer',
            'asin_url' => 'nullable|string',
            'budget_range' => 'nullable|string',
            'message' => 'required|string|min:10',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your full name.',
            'name.min' => 'Your name must be at least 3 characters.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'brand.min' => 'Brand name must be at least 2 characters.',
            'message.required' => 'Please write a message.',
            'message.min' => 'Please add a few more details (at least 10 characters).',
        ];
    }
}

