<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FiosController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('fios', [FiosController::class, 'index']);
Route::post('fios', [FiosController::class, 'cadastrar']);
Route::get('fios/{id}', [FiosController::class, 'listar']);
Route::get('fios/{id}/editar', [FiosController::class, 'editar']);
Route::put('fios/{id}/editar', [FiosController::class, 'atualizar']);
Route::delete('fios/{id}/apagar', [FiosController::class, 'apagar']);