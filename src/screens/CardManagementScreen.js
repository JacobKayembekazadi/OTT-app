import React, { useState, useCallback } from 'react';
import { useWallet } from '../context/WalletContext';

const CardManagementScreen = React.memo(() => {
    const { state, dispatch } = useWallet();
    const [showForm, setShowForm] = useState(false);
    
    const handleAddCard = useCallback((e) => {
        e.preventDefault();
        const newCard = { 
            brand: e.target.brand.value, 
            last4: e.target.last4.value, 
            expiry: e.target.expiry.value 
        };
        dispatch({ type: 'ADD_CARD', payload: newCard });
        setShowForm(false);
    }, [dispatch]);
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cards</h2>
            <div className="space-y-4">
                {state.cards.map(card => (
                    <div 
                        key={card.id} 
                        className={`relative p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br ${card.theme}`}
                    >
                        <p className="font-bold text-xl mb-8">{card.brand}</p>
                        <p className="text-2xl font-mono tracking-widest mb-6">
                            **** **** **** {card.last4}
                        </p>
                        <div className="flex justify-between text-sm">
                            <p>{state.user.name}</p>
                            <p>Exp: {card.expiry}</p>
                        </div>
                        <button 
                            onClick={() => dispatch({ type: 'REMOVE_CARD', payload: card.id })} 
                            className="absolute top-4 right-4 text-white/50 hover:text-white/90"
                        >
                           <svg 
                               xmlns="http://www.w3.org/2000/svg" 
                               className="h-5 w-5" 
                               fill="none" 
                               viewBox="0 0 24 24" 
                               stroke="currentColor" 
                               strokeWidth={2}
                           >
                               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => setShowForm(!showForm)} 
                className="mt-6 w-full bg-[#2C2C2E] hover:bg-[#48484A] text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
                {showForm ? 'Cancel' : 'Add New Card'}
            </button>
            
            {showForm && (
                <form onSubmit={handleAddCard} className="mt-4 bg-[#1C1C1E] p-4 rounded-2xl space-y-4">
                    <input 
                        name="brand" 
                        placeholder="Card Brand (e.g., Visa)" 
                        className="w-full bg-[#2C2C2E] rounded-xl p-3 text-white" 
                        required 
                    />
                    <input 
                        name="last4" 
                        placeholder="Last 4 Digits" 
                        className="w-full bg-[#2C2C2E] rounded-xl p-3 text-white" 
                        maxLength="4" 
                        pattern="\d{4}" 
                        required 
                    />
                    <input 
                        name="expiry" 
                        placeholder="Expiry (MM/YY)" 
                        className="w-full bg-[#2C2C2E] rounded-xl p-3 text-white" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-[#B83E3E] hover:bg-[#A83535] text-white font-bold py-3 px-4 rounded-xl shadow-[0_0px_15px_-3px_rgba(184,62,62,0.4)]"
                    >
                        Save Card
                    </button>
                </form>
            )}
        </div>
    );
});

export default CardManagementScreen;