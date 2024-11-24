<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
   Route::get('/blogs', [BlogController::class, 'index']);
   Route::post('/blogs', [BlogController::class, 'store']);
   Route::put('/blogs/{id}', [BlogController::class, 'update']);
   Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
});

