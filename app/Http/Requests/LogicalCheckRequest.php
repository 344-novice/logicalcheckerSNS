<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LogicalCheckRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'logicalCheck' => ['required', 'array'],
            'logicalCheck.is_logical' => ['required', 'boolean'],
            'logicalCheck.analysis' => ['required', 'array'],
            'logicalCheck.analysis.reason' => ['required', 'string'],
            'logicalCheck.analysis.hints' => ['required', 'array'],
        ];
    }
}
