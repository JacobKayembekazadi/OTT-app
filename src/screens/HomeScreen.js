import React from 'react';
import { useWallet } from '../context/WalletContext';
import TransactionIcon from '../components/TransactionIcon';
import { ArrowUpIcon, ArrowDownIcon, QrCodeIcon, CardIcon, GlobeIcon } from '../icons';

const HomeScreen = React.memo(({ navigateToTx, setActiveTab }) => {
    const { state, dispatch } = useWallet();
    const { transactions, pendingRequests, contacts, recentRemittances } = state;

    const handleApprove = (id) => dispatch({ type: 'APPROVE_REQUEST', payload: { id } });
    const handleDeny = (id) => dispatch({ type: 'DENY_REQUEST', payload: { id } });

    const ActionButton = ({ icon, label, action, gradient = false }) => (
        <div className="flex flex-col items-center gap-2">
            <button 
                onClick={action} 
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white hover:bg-[#2C2C2E] transition-colors ${
                    gradient 
                        ? 'bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E] shadow-[0_0px_15px_-5px_rgba(184,62,62,0.4)]' 
                        : 'bg-[#1E1E1E]'
                }`}
            >
                {icon}
            </button>
            <span className="text-sm text-[#AFAFAF] text-center">{label}</span>
        </div>
    );

    return (
        <div>
            <div className="flex justify-around mb-8">
                <ActionButton icon={<ArrowUpIcon />} label="Send" action={() => setActiveTab('pay')} />
                <ActionButton icon={<ArrowDownIcon />} label="Request" action={() => setActiveTab('pay')} />
                <ActionButton 
                    icon={<GlobeIcon />} 
                    label="Send International" 
                    action={() => setActiveTab('pay')} 
                    gradient={true}
                />
                <ActionButton icon={<QrCodeIcon />} label="Scan" action={() => {}} />
                <ActionButton icon={<CardIcon />} label="Cards" action={() => setActiveTab('cards')} />
            </div>

            {/* International Remittance Promotion Banner */}
            <div className="mb-8 bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E] p-4 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GlobeIcon />
                        <div>
                            <h3 className="font-bold text-lg">Send Money Home</h3>
                            <p className="text-red-200 text-sm">Best rates • No fees • Fast delivery</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveTab('pay')}
                        className="bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/30 transition-colors"
                    >
                        Transfer Now
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Send Again</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {contacts.map(contact => (
                        <div key={contact.id} className="flex flex-col items-center gap-2 flex-shrink-0">
                            <img src={contact.avatar} alt={contact.name} className="h-16 w-16 rounded-full" />
                            <span className="text-sm text-white">{contact.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent International Transfers */}
            {recentRemittances.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Recent International Transfers</h2>
                    <div className="space-y-4">
                        {recentRemittances.slice(0, 2).map(remittance => (
                            <div key={remittance.id} className="bg-[#1E1E1E] p-4 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E] rounded-full text-white">
                                        <GlobeIcon />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-base">{remittance.recipient}</p>
                                        <p className="text-sm text-[#AFAFAF]">{remittance.to}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-[#FF453A]">-${remittance.amount}</p>
                                        <p className="text-sm text-[#AFAFAF]">
                                            {state.exchangeRates[remittance.currency]?.symbol}{remittance.convertedAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pendingRequests.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Pending Requests</h2>
                    <div className="space-y-4">
                        {pendingRequests.map(req => (
                            <div key={req.id} className="bg-[#1E1E1E] p-4 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <TransactionIcon category='user' />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-base">Request from {req.from}</p>
                                        <p className="font-bold text-lg text-white">${req.amount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <button 
                                        onClick={() => handleApprove(req.id)} 
                                        className="w-full bg-[#30D158] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleDeny(req.id)} 
                                        className="w-full bg-[#48484A] hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl"
                                    >
                                        Deny
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-4">
                {transactions.map(tx => (
                    <button 
                        key={tx.id} 
                        onClick={() => navigateToTx(tx.id)} 
                        className="w-full bg-[#1E1E1E] p-4 rounded-2xl flex items-center gap-4 text-left"
                    >
                        <TransactionIcon category={tx.category} />
                        <div className="flex-grow">
                            <p className="font-semibold text-base">{tx.to || tx.from}</p>
                            <p className="text-sm text-[#AFAFAF]">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                        <p className={`font-bold text-lg ${tx.type === 'sent' ? 'text-[#FF453A]' : 'text-[#30D158]'}`}>
                            {tx.type === 'sent' ? '-' : '+'}${tx.amount.toFixed(2)}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
});

export default HomeScreen;