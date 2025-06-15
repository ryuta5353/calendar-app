<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{

    public function __construct(){
        $this->middleware('jwt.auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $schedules = Auth::user()->schedules()->get();
        return response()->json($schedules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'start_datetime' => 'required',
            'end_datetime' => 'required',
        ]);

        $validatedData["user_id"] = Auth::id();

        $schedule=Schedule::create($validatedData);

        return response()->json($schedule,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $schedule = Auth::user()->schedules()->findOrFail($id);

        return response()->json($schedule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $schedule = Auth::user()->schedules()->findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'start_datetime' => 'required | date',
            'end_datetime' => 'required | date',
        ]);
        
        $schedule->update($validatedData);
        return response()->json($schedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $schedule = Auth::user()->schedules()->findOrFail($id);

        $schedule->delete();

        return response()->json(null,204);
    }
}
