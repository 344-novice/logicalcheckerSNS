<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TweetRequest extends FormRequest
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
            'logicalCheck.is_logical' => ['nullable', 'boolean'],
            'logicalCheck.analysis' => ['nullable', 'array'],
            'logicalCheck.analysis.reason' => ['nullable', 'string'],
            'logicalCheck.analysis.hints' => ['nullable', 'array'],
            'image_path' => ['nullable', 'url'], 
        ];
    }
}
