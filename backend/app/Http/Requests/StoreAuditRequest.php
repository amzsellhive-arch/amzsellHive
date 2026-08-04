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
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'email' => 'required|email',
            'revenue_range' => 'nullable|string',
            'marketplace' => 'nullable|string',
            'problem' => 'nullable|string',
        ];
    }
}
