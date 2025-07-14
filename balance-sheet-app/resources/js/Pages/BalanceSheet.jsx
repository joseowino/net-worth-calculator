import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BalanceSheet({ auth, assets, liabilities, totalAssets, totalLiabilities, netWorth }) {
    const [showAssetForm, setShowAssetForm] = useState(false);
    const [showLiabilityForm, setShowLiabilityForm] = useState(false);

    const assetForm = useForm({
        name: '',
        amount: '',
    });

    const liabilityForm = useForm({
        name: '',
        amount: '',
    });

    const submitAsset = (e) => {
        e.preventDefault();
        assetForm.post('/assets', {
            onSuccess: () => {
                assetForm.reset();
                setShowAssetForm(false);
            }
        });
    };

    const submitLiability = (e) => {
        e.preventDefault();
        liabilityForm.post('/liabilities', {
            onSuccess: () => {
                liabilityForm.reset();
                setShowLiabilityForm(false);
            }
        });
    };

    const deleteAsset = (id) => {
        if (confirm('Are you sure you want to delete this asset?')) {
            useForm().delete(`/assets/${id}`);
        }
    };

    const deleteLiability = (id) => {
        if (confirm('Are you sure you want to delete this liability?')) {
            useForm().delete(`/liabilities/${id}`);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Balance Sheet</h2>}
        >
            <Head title="Balance Sheet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Balance Sheet Header */}
                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-bold mb-2">Balance Sheet</h1>
                                <p className="text-gray-600">User: {auth.user.email}</p>
                                <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                            </div>

                            {/* Assets Section */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Assets</h2>
                                    <button
                                        onClick={() => setShowAssetForm(!showAssetForm)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add Asset
                                    </button>
                                </div>

                                {showAssetForm && (
                                    <form onSubmit={submitAsset} className="mb-4 p-4 bg-gray-50 rounded">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                                                <input
                                                    type="text"
                                                    value={assetForm.data.name}
                                                    onChange={e => assetForm.setData('name', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Amount (KES)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={assetForm.data.amount}
                                                    onChange={e => assetForm.setData('amount', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={assetForm.processing}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Add Asset
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowAssetForm(false)}
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Asset Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Amount (KES)
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {assets.map((asset) => (
                                                <tr key={asset.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {asset.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(asset.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <button
                                                            onClick={() => deleteAsset(asset.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 text-right">
                                    <strong className="text-lg">Total Assets: {formatCurrency(totalAssets)}</strong>
                                </div>
                            </div>

                            {/* Liabilities Section */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Liabilities</h2>
                                    <button
                                        onClick={() => setShowLiabilityForm(!showLiabilityForm)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add Liability
                                    </button>
                                </div>

                                {showLiabilityForm && (
                                    <form onSubmit={submitLiability} className="mb-4 p-4 bg-gray-50 rounded">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Liability Name</label>
                                                <input
                                                    type="text"
                                                    value={liabilityForm.data.name}
                                                    onChange={e => liabilityForm.setData('name', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Amount (KES)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={liabilityForm.data.amount}
                                                    onChange={e => liabilityForm.setData('amount', e.target.value)}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={liabilityForm.processing}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Add Liability
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowLiabilityForm(false)}
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Liability Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Amount (KES)
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {liabilities.map((liability) => (
                                                <tr key={liability.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {liability.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(liability.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <button
                                                            onClick={() => deleteLiability(liability.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 text-right">
                                    <strong className="text-lg">Total Liabilities: {formatCurrency(totalLiabilities)}</strong>
                                </div>
                            </div>

                            {/* Net Worth Section */}
                            <div className="border-t pt-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Net Worth</h2>
                                    <p className="text-lg mb-4">
                                        Assets ({formatCurrency(totalAssets)}) - Liabilities ({formatCurrency(totalLiabilities)})
                                    </p>
                                    <div className={`text-3xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        Net Worth: {formatCurrency(netWorth)}
                                    </div>
                                </div>
                            </div>

                            {/* Print Button */}
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Print Balance Sheet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}