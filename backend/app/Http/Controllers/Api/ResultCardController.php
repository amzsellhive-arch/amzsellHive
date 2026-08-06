<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResultCard;
use Illuminate\Http\Request;

class ResultCardController extends Controller
{
    // GET /api/result-cards (public)
    public function index()
    {
        return response()->json(ResultCard::latest()->get());
    }

    // POST /api/admin/result-cards (protected)
    public function store(Request $request)
    {
        $request->validate([
            'niche' => 'required|string|max:255',
            'timeframe' => 'required|string|max:255',
            'headline_result' => 'required|string|max:255',
            'description' => 'nullable|string',
            'metric_1' => 'nullable|string',
            'metric_2' => 'nullable|string',
            'metric_3' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $card = ResultCard::create($request->all());

        return response()->json(['message' => 'Result card created', 'card' => $card], 201);
    }

    // PUT /api/admin/result-cards/{resultCard} (protected)
    public function update(Request $request, ResultCard $resultCard)
    {
        $request->validate([
            'niche' => 'required|string|max:255',
            'timeframe' => 'required|string|max:255',
            'headline_result' => 'required|string|max:255',
            'description' => 'nullable|string',
            'metric_1' => 'nullable|string',
            'metric_2' => 'nullable|string',
            'metric_3' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $resultCard->update($request->all());

        return response()->json(['message' => 'Result card updated', 'card' => $resultCard]);
    }

    // DELETE /api/admin/result-cards/{resultCard} (protected)
    public function destroy(ResultCard $resultCard)
    {
        $resultCard->delete();

        return response()->json(['message' => 'Result card deleted']);
    }
}
