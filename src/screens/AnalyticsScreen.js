import React, { useState, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import TransactionIcon from '../components/TransactionIcon';

const AnalyticsScreen = React.memo(() => {
    const { state } = useWallet();
    const [timeframe, setTimeframe] = useState('month');

    const analyticsData = useMemo(() => {
        const income = state.transactions.filter(tx => tx.type === 'received').reduce((sum, tx) => sum + tx.amount, 0);
        const spending = state.transactions.filter(tx => tx.type === 'sent').reduce((sum, tx) => sum + tx.amount, 0);
        
        const spendingByCategory = state.transactions
            .filter(tx => tx.type === 'sent')
            .reduce((acc, tx) => {
                acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
                return acc;
            }, {});

        const largestTransaction = state.transactions
            .filter(tx => tx.type === 'sent')
            .sort((a, b) => b.amount - a.amount)[0];
        
        return {
            income,
            spending,
            net: income - spending,
            byCategory: Object.entries(spendingByCategory).sort((a,b) => b[1] - a[1]),
            largestTransaction
        };
    }, [state.transactions]);
    
    const categoryColors = { 
        food: 'bg-[#B83E3E]', 
        shopping: 'bg-blue-500', 
        user: 'bg-[#8B2E2E]', 
        work: 'bg-green-500',
        remittance: 'bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E]'
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Analytics</h2>
            <div className="flex mb-6 bg-[#1E1E1E] rounded-xl p-1">
                <button 
                    onClick={() => setTimeframe('week')} 
                    className={`w-1/3 p-2 rounded-lg font-semibold transition-colors ${
                        timeframe === 'week' ? 'bg-[#B83E3E] text-white' : 'text-[#AFAFAF]'
                    }`}
                >
                    Week
                </button>
                <button 
                    onClick={() => setTimeframe('month')} 
                    className={`w-1/3 p-2 rounded-lg font-semibold transition-colors ${
                        timeframe === 'month' ? 'bg-[#B83E3E] text-white' : 'text-[#AFAFAF]'
                    }`}
                >
                    Month
                </button>
                <button 
                    onClick={() => setTimeframe('year')} 
                    className={`w-1/3 p-2 rounded-lg font-semibold transition-colors ${
                        timeframe === 'year' ? 'bg-[#B83E3E] text-white' : 'text-[#AFAFAF]'
                    }`}
                >
                    Year
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1C1C1E] p-4 rounded-2xl">
                    <p className="text-sm text-[#8A8A8E]">Income</p>
                    <p className="text-2xl font-bold text-[#30D158]">${analyticsData.income.toFixed(2)}</p>
                </div>
                <div className="bg-[#1C1C1E] p-4 rounded-2xl">
                    <p className="text-sm text-[#8A8A8E]">Spending</p>
                    <p className="text-2xl font-bold text-[#FF453A]">${analyticsData.spending.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-[#1C1C1E] p-6 rounded-2xl mb-6">
                 <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
                 <div className="space-y-4">
                    {analyticsData.byCategory.map(([category, amount]) => {
                         const percentage = analyticsData.spending > 0 ? (amount / analyticsData.spending) * 100 : 0;
                         return (
                            <div key={category}>
                                <div className="flex justify-between mb-1 text-sm">
                                    <span className="font-semibold capitalize">{category}</span>
                                    <span>${amount.toFixed(2)}</span>
                                </div>
                                <div className="w-full bg-[#2C2C2E] rounded-full h-2.5">
                                    <div 
                                        className={`${categoryColors[category] || 'bg-gray-500'} h-2.5 rounded-full`} 
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                         );
                    })}
                 </div>
            </div>

            {analyticsData.largestTransaction && (
                <div className="bg-[#1C1C1E] p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Largest Transaction</h3>
                    <div className="flex items-center gap-4">
                        <TransactionIcon category={analyticsData.largestTransaction.category} />
                        <div className="flex-grow">
                            <p className="font-semibold text-base">{analyticsData.largestTransaction.to}</p>
                            <p className="text-sm text-[#8A8A8E]">
                                {new Date(analyticsData.largestTransaction.date).toLocaleDateString()}
                            </p>
                        </div>
                        <p className="font-bold text-lg text-[#FF453A]">
                            -${analyticsData.largestTransaction.amount.toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
});

export default AnalyticsScreen;