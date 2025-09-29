import React from 'react';
import { useWallet } from '../context/WalletContext';
import { ArrowLeftIcon } from '../icons';

const TransactionDetailsScreen = React.memo(({ txId, onBack }) => {
    const { state } = useWallet();
    const tx = state.transactions.find(t => t.id === txId);

    if (!tx) return <div>Transaction not found.</div>;

    return (
        <div className="animate-fade-in">
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-[#8A8A8E] hover:text-white mb-6"
            >
                <ArrowLeftIcon /> Back to Dashboard
            </button>
            <div className="bg-[#1C1C1E] p-6 rounded-2xl">
                <div className="text-center mb-6">
                    <p className={`text-5xl font-bold ${tx.type === 'sent' ? 'text-[#FF453A]' : 'text-[#30D158]'}`}>
                        {tx.type === 'sent' ? '-' : '+'}${tx.amount.toFixed(2)}
                    </p>
                    <p className="font-semibold text-lg mt-2">To: {tx.to || 'You'}</p>
                    <p className="font-semibold text-lg">From: {tx.from || 'You'}</p>
                </div>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-[#8A8A8E]">Status</span>
                        <span className="font-semibold text-green-400">Completed</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-[#8A8A8E]">Date & Time</span>
                        <span className="font-semibold">{new Date(tx.date).toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-[#8A8A8E]">Category</span>
                        <span className="font-semibold capitalize">{tx.category}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-[#8A8A8E]">Transaction ID</span>
                        <span className="font-mono text-xs">{tx.id}</span>
                    </div>
                    <div>
                         <span className="text-[#8A8A8E]">Notes</span>
                         <p className="mt-1 font-semibold">{tx.notes || 'No notes for this transaction.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TransactionDetailsScreen;