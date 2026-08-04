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
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'brand' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'service_interest' => 'nullable|string',
            'products_count' => 'nullable|integer',
            'asin_url' => 'nullable|string',
            'budget_range' => 'nullable|string',
            'message' => 'nullable|string',
        ];
    }
}
