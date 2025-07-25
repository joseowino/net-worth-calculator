<?php

use App\Http\Controllers\BalanceSheetController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [BalanceSheetController::class, 'index'])->name('dashboard');
    Route::post('/assets', [BalanceSheetController::class, 'storeAsset'])->name('assets.store');
    Route::post('/liabilities', [BalanceSheetController::class, 'storeLiability'])->name('liabilities.store');
    Route::delete('/assets/{asset}', [BalanceSheetController::class, 'destroyAsset'])->name('assets.destroy');
    Route::delete('/liabilities/{liability}', [BalanceSheetController::class, 'destroyLiability'])->name('liabilities.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';