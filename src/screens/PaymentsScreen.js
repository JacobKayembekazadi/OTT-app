import React, { useState, useCallback } from 'react';
import { useWallet } from '../context/WalletContext';
import InternationalRemittanceScreen from './InternationalRemittanceScreen';

const PaymentsScreen = React.memo(() => {
    const { dispatch } = useWallet();
    const [formType, setFormType] = useState('send');
    const [contact, setContact] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (contact && amount > 0) {
            if (formType === 'send') {
                dispatch({ type: 'SEND_MONEY', payload: { to: contact, amount } });
                setMessage(`Sent $${amount} to ${contact}!`);
            } else {
                dispatch({ type: 'REQUEST_MONEY', payload: { from: contact, amount } });
                setMessage(`Requested $${amount} from ${contact}!`);
            }
            setContact(''); 
            setAmount('');
            setTimeout(() => setMessage(''), 3000);
        }
    }, [dispatch, contact, amount, formType]);

    if (formType === 'international') {
        return <InternationalRemittanceScreen />;
    }
    
    return (
        <div>
            <div className="flex mb-6 bg-[#1E1E1E] rounded-xl p-1">
                <button 
                    onClick={() => setFormType('send')} 
                    className={`w-1/3 p-2 rounded-lg font-semibold transition-colors text-xs ${
                        formType === 'send' ? 'bg-[#B83E3E] text-white' : 'text-[#AFAFAF] hover:bg-[#2C2C2E]'
                    }`}
                >
                    Send Local
                </button>
                <button 
                    onClick={() => setFormType('request')} 
                    className={`w-1/3 p-2 rounded-lg font-semibold transition-colors text-xs ${
                        formType === 'request' ? 'bg-[#34D399] text-white' : 'text-[#AFAFAF] hover:bg-[#2C2C2E]'
                    }`}
                >
                    Request
                </button>
                <button 
                    onClick={() => setFormType('international')} 
                    className={`w-1/3 p-2 rounded-lg font-semibold transition-colors text-xs ${
                        formType === 'international' ? 'bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E] text-white' : 'text-[#AFAFAF] hover:bg-[#2C2C2E]'
                    }`}
                >
                    🌍 International
                </button>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
                {formType === 'send' ? 'Send Money' : 'Request Money'}
            </h2>
            <form onSubmit={handleSubmit} className="bg-[#1E1E1E] p-6 rounded-2xl space-y-6">
                <div>
                    <label className="text-sm text-[#AFAFAF]">
                        {formType === 'send' ? 'Recipient' : 'From'}
                    </label>
                    <input 
                        type="text" 
                        value={contact} 
                        onChange={(e) => setContact(e.target.value)} 
                        placeholder="Enter name or @username" 
                        className="w-full bg-[#2C2C2E] rounded-xl p-4 mt-2 text-white" 
                        required 
                    />
                </div>
                <div>
                    <label className="text-sm text-[#AFAFAF]">Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AFAFAF] text-xl">$</span>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            placeholder="0.00" 
                            className="w-full bg-[#2C2C2E] rounded-xl p-4 pl-10 mt-2 text-white text-xl" 
                            required 
                            min="0.01" 
                            step="0.01" 
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className={`w-full text-white font-bold py-4 px-4 rounded-xl transition-transform transform hover:scale-105 ${
                        formType === 'send' 
                            ? 'bg-[#B83E3E] hover:bg-red-700 shadow-[0_0px_20px_-5px_rgba(184,62,62,0.5)]' 
                            : 'bg-[#34D399] hover:bg-green-700 shadow-[0_0px_20px_-5px_rgba(52,211,153,0.5)]'
                    }`}
                >
                    {formType === 'send' ? 'Send Payment' : 'Submit Request'}
                </button>
            </form>
            {message && (
                <div className={`mt-4 text-center p-3 rounded-xl ${
                    formType === 'send' 
                        ? 'text-[#30D158] bg-green-900/50' 
                        : 'text-yellow-400 bg-yellow-900/50'
                }`}>
                    {message}
                </div>
            )}
        </div>
    );
});

export default PaymentsScreen;