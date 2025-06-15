<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_datetime',
        'end_datetime',
        "user_id",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
