<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
    ];


    /**
     * Get the author that owns the blog.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id'); // assuming your User model is set up
    }
}
