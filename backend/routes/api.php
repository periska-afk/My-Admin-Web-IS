<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NilaiController;
use App\Http\Controllers\Api\CategoryController;

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// CRUD NILAI
Route::apiResource('nilai', NilaiController::class);

// CRUD PRODUCTS
Route::apiResource('products', ProductController::class);

// CRUD CATEGORIES
Route::apiResource('categories', CategoryController::class)
    ->only(['index', 'store', 'update', 'destroy']);

// AUTH SANCTUM
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/profile', [AuthController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);

});
