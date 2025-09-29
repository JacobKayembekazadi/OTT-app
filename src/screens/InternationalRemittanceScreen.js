import React, { useState, useCallback, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import { GlobeIcon, CurrencyIcon } from '../icons';

const InternationalRemittanceScreen = React.memo(() => {
    const { state, dispatch } = useWallet();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const selectedRate = useMemo(() => {
        return selectedCountry ? state.exchangeRates[selectedCountry] : null;
    }, [selectedCountry, state.exchangeRates]);

    const convertedAmount = useMemo(() => {
        if (amount && selectedRate) {
            return (parseFloat(amount) * selectedRate.rate).toFixed(2);
        }
        return '0.00';
    }, [amount, selectedRate]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (recipient && amount > 0 && selectedCountry) {
            const rate = state.exchangeRates[selectedCountry];
            dispatch({
                type: 'SEND_REMITTANCE',
                payload: {
                    recipient,
                    amount,
                    currency: selectedCountry,
                    convertedAmount: parseFloat(convertedAmount),
                    country: rate.name
                }
            });
            setMessage(`Successfully sent $${amount} to ${recipient} in ${rate.name}!`);
            setRecipient('');
            setAmount('');
            setSelectedCountry('');
            setTimeout(() => setMessage(''), 4000);
        }
    }, [dispatch, recipient, amount, selectedCountry, convertedAmount, state.exchangeRates]);

    const popularCountries = ['NGN', 'INR', 'PHP', 'MXN', 'GHS', 'KES'];
    const otherCountries = Object.keys(state.exchangeRates).filter(key => !popularCountries.includes(key));

    return (
        <div>
            <div className="mb-6 bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E] p-6 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-3">
                    <GlobeIcon />
                    <h2 className="text-2xl font-bold">International Transfer</h2>
                </div>
                <p className="text-red-200 text-sm">
                    Send money home with competitive exchange rates and low fees
                </p>
            </div>

            {/* Recent Remittances */}
            {state.recentRemittances.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">Recent Transfers</h3>
                    <div className="space-y-3">
                        {state.recentRemittances.slice(0, 2).map(remittance => (
                            <div key={remittance.id} className="bg-[#1E1E1E] p-4 rounded-xl flex items-center gap-4">
                                <div className="p-2 bg-[#2C2C2E] rounded-full">
                                    <GlobeIcon />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{remittance.recipient}</p>
                                    <p className="text-xs text-[#AFAFAF]">{remittance.to}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm text-[#FF453A]">-${remittance.amount}</p>
                                    <p className="text-xs text-[#AFAFAF]">
                                        {state.exchangeRates[remittance.currency]?.symbol}{remittance.convertedAmount.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Country Selection */}
                <div>
                    <label className="block text-sm font-semibold text-[#AFAFAF] mb-3">
                        Select Destination Country
                    </label>
                    
                    {/* Popular Countries */}
                    <div className="mb-4">
                        <p className="text-xs text-[#AFAFAF] mb-2">Popular Destinations</p>
                        <div className="grid grid-cols-3 gap-2">
                            {popularCountries.map(code => {
                                const country = state.exchangeRates[code];
                                return (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => setSelectedCountry(code)}
                                        className={`p-3 rounded-xl text-center transition-all ${
                                            selectedCountry === code
                                                ? 'bg-[#B83E3E] text-white'
                                                : 'bg-[#1E1E1E] text-[#AFAFAF] hover:bg-[#2C2C2E]'
                                        }`}
                                    >
                                        <div className="text-lg">{country.flag}</div>
                                        <div className="text-xs font-semibold">{code}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Other Countries Dropdown */}
                    <select
                        value={otherCountries.includes(selectedCountry) ? selectedCountry : ''}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-[#1E1E1E] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#B83E3E]"
                    >
                        <option value="">Other Countries...</option>
                        {otherCountries.map(code => {
                            const country = state.exchangeRates[code];
                            return (
                                <option key={code} value={code}>
                                    {country.flag} {country.name} ({code})
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Exchange Rate Display */}
                {selectedRate && (
                    <div className="bg-[#1E1E1E] p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <CurrencyIcon />
                                <span className="text-sm font-semibold">Exchange Rate</span>
                            </div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-lg font-bold">
                            1 USD = {selectedRate.symbol}{selectedRate.rate.toLocaleString()} {selectedCountry}
                        </div>
                        <p className="text-xs text-[#AFAFAF] mt-1">Live rate • Updated now</p>
                    </div>
                )}

                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-semibold text-[#AFAFAF] mb-2">
                        Amount to Send (USD)
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AFAFAF] text-xl">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-[#1E1E1E] rounded-xl p-4 pl-10 text-white text-xl focus:outline-none focus:ring-2 focus:ring-[#B83E3E]"
                            required
                            min="1"
                            step="0.01"
                        />
                    </div>
                    {selectedRate && amount && (
                        <div className="mt-2 p-3 bg-[#2C2C2E] rounded-lg">
                            <p className="text-sm text-[#AFAFAF]">Recipient will receive:</p>
                            <p className="text-lg font-bold text-[#30D158]">
                                {selectedRate.symbol}{parseFloat(convertedAmount).toLocaleString()} {selectedCountry}
                            </p>
                        </div>
                    )}
                </div>

                {/* Recipient Input */}
                <div>
                    <label className="block text-sm font-semibold text-[#AFAFAF] mb-2">
                        Recipient Name
                    </label>
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter recipient's full name"
                        className="w-full bg-[#1E1E1E] rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-[#B83E3E]"
                        required
                    />
                </div>

                {/* Fee Information */}
                <div className="bg-[#1E1E1E] p-4 rounded-xl">
                    <h4 className="font-semibold mb-2">Transfer Details</h4>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[#AFAFAF]">Transfer fee:</span>
                            <span className="text-[#30D158]">FREE</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#AFAFAF]">Delivery time:</span>
                            <span>1-3 business days</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#AFAFAF]">Loyalty points earned:</span>
                            <span className="text-[#B83E3E]">+{Math.floor(parseFloat(amount || 0) / 5)} pts</span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!selectedCountry || !recipient || !amount}
                    className="w-full bg-gradient-to-r from-[#B83E3E] to-[#8B2E2E] hover:from-red-700 hover:to-red-800 disabled:from-[#48484A] disabled:to-[#48484A] text-white font-bold py-4 px-4 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-[0_0px_30px_-5px_rgba(184,62,62,0.4)]"
                >
                    Send International Transfer
                </button>
            </form>

            {message && (
                <div className="mt-4 text-center p-4 rounded-xl text-[#30D158] bg-green-900/50 border border-green-700/30">
                    {message}
                </div>
            )}
        </div>
    );
});

export default InternationalRemittanceScreen;