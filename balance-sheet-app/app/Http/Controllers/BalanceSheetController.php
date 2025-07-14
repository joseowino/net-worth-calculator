<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Liability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BalanceSheetController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $assets = Asset::where('user_id', $user->id)->get();
        $liabilities = Liability::where('user_id', $user->id)->get();

        $totalAssets = $assets->sum('amount');
        $totalLiabilities = $liabilities->sum('amount');
        $netWorth = $totalAssets - $totalLiabilities;

        return Inertia::render('BalanceSheet', [
            'assets' => $assets,
            'liabilities' => $liabilities,
            'totalAssets' => $totalAssets,
            'totalLiabilities' => $totalLiabilities,
            'netWorth' => $netWorth,
        ]);
    }

    public function storeAsset(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        Asset::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'amount' => $validated['amount'],
        ]);

        return redirect()->back()->with('message', 'Asset added successfully!');
    }

    public function storeLiability(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
        ]);

        Liability::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'amount' => $validated['amount'],
        ]);

        return redirect()->back()->with('message', 'Liability added successfully!');
    }

    public function destroyAsset(Asset $asset)
    {
        if ($asset->user_id !== auth()->id()) {
            abort(403);
        }

        $asset->delete();
        return redirect()->back()->with('message', 'Asset deleted successfully!');
    }

    public function destroyLiability(Liability $liability)
    {
        if ($liability->user_id !== auth()->id()) {
            abort(403);
        }

        $liability->delete();
        return redirect()->back()->with('message', 'Liability deleted successfully!');
    }
}