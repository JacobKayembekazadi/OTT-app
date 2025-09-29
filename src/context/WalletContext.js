import React, { createContext, useContext, useReducer, useMemo } from 'react';

const WalletContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: { 
        name: 'Jane Doe', 
        avatar: 'https://placehold.co/100x100/B83E3E/ffffff?text=JD', 
        balance: 5250.75, 
        loyaltyPoints: 1280 
    },
    theme: 'dark',
    cards: [
        { id: 1, last4: '4242', brand: 'Visa', expiry: '12/26', theme: 'from-[#B83E3E] to-[#8B2E2E]' },
        { id: 2, last4: '8484', brand: 'Mastercard', expiry: '08/25', theme: 'from-[#1E1E1E] to-[#2A2A2A]' },
    ],
    contacts: [
        { id: 1, name: 'John A.', avatar: 'https://placehold.co/100x100/34D399/ffffff?text=JA' },
        { id: 2, name: 'Mike R.', avatar: 'https://placehold.co/100x100/FBBF24/ffffff?text=MR' },
        { id: 3, name: 'Sarah K.', avatar: 'https://placehold.co/100x100/F472B6/ffffff?text=SK' },
        { id: 4, name: 'David L.', avatar: 'https://placehold.co/100x100/60A5FA/ffffff?text=DL' },
    ],
    transactions: [
        { id: 'tx_1', to: 'Starbucks', amount: 12.50, type: 'sent', date: '2025-09-26T10:30:00Z', category: 'food', notes: 'Morning coffee' },
        { id: 'tx_2', to: 'John Appleseed', amount: 150.00, type: 'sent', date: '2025-09-25T14:00:00Z', category: 'user', notes: 'Lunch money' },
        { id: 'tx_3', from: 'Work Bonus', amount: 500.00, type: 'received', date: '2025-09-24T09:00:00Z', category: 'work', notes: 'Q3 Performance Bonus' },
        { id: 'tx_4', to: 'Amazon', amount: 78.90, type: 'sent', date: '2025-09-23T20:15:00Z', category: 'shopping', notes: '' },
    ],
    pendingRequests: [
        { id: 'req_1', from: 'Mike Ross', amount: 25.00, date: '2025-09-26T12:00:00Z' }
    ],
    exchangeRates: {
        'NGN': { rate: 1650.50, flag: '🇳🇬', name: 'Nigeria', symbol: '₦' },
        'GHS': { rate: 15.85, flag: '🇬🇭', name: 'Ghana', symbol: '₵' },
        'KES': { rate: 155.20, flag: '🇰🇪', name: 'Kenya', symbol: 'KSh' },
        'ZAR': { rate: 18.75, flag: '🇿🇦', name: 'South Africa', symbol: 'R' },
        'INR': { rate: 83.25, flag: '🇮🇳', name: 'India', symbol: '₹' },
        'PHP': { rate: 56.80, flag: '🇵🇭', name: 'Philippines', symbol: '₱' },
        'MXN': { rate: 17.25, flag: '🇲🇽', name: 'Mexico', symbol: '$' },
        'EUR': { rate: 0.85, flag: '🇪🇺', name: 'Eurozone', symbol: '€' },
        'GBP': { rate: 0.73, flag: '🇬🇧', name: 'United Kingdom', symbol: '£' },
        'CAD': { rate: 1.35, flag: '🇨🇦', name: 'Canada', symbol: 'C$' }
    },
    recentRemittances: [
        { id: 'rem_1', to: 'Lagos, Nigeria', recipient: 'Adebayo O.', amount: 500, currency: 'NGN', convertedAmount: 825250, date: '2025-09-25T14:30:00Z' },
        { id: 'rem_2', to: 'Mumbai, India', recipient: 'Priya S.', amount: 200, currency: 'INR', convertedAmount: 16650, date: '2025-09-23T09:15:00Z' }
    ]
};

function walletReducer(state, action) {
    switch (action.type) {
        case 'LOGIN': 
            return { ...state, isAuthenticated: true };
        case 'LOGOUT': 
            return { ...initialState };
        case 'SET_THEME': {
            return { ...state, theme: action.payload === 'light' ? 'light' : 'dark' };
        }
        case 'SEND_MONEY': {
            const { to, amount } = action.payload;
            const numericAmount = parseFloat(amount);
            if (state.user.balance >= numericAmount) {
                const newTx = { 
                    id: `tx_${Date.now()}`, 
                    to, 
                    amount: numericAmount, 
                    type: 'sent', 
                    date: new Date().toISOString(), 
                    category: 'user', 
                    notes: action.payload.notes || '' 
                };
                return {
                    ...state,
                    user: { 
                        ...state.user, 
                        balance: state.user.balance - numericAmount, 
                        loyaltyPoints: state.user.loyaltyPoints + Math.floor(numericAmount / 10)
                    },
                    transactions: [newTx, ...state.transactions]
                };
            }
            return state;
        }
        case 'REQUEST_MONEY': {
             const newRequest = { 
                 id: `req_${Date.now()}`, 
                 from: action.payload.from, 
                 amount: parseFloat(action.payload.amount), 
                 date: new Date().toISOString() 
             };
             return { ...state, pendingRequests: [newRequest, ...state.pendingRequests] };
        }
        case 'APPROVE_REQUEST': {
            const request = state.pendingRequests.find(r => r.id === action.payload.id);
            if (!request) return state;
            const newTx = { 
                id: `tx_${Date.now()}`, 
                from: request.from, 
                amount: request.amount, 
                type: 'received', 
                date: new Date().toISOString(), 
                category: 'user', 
                notes: `Approved request` 
            };
            return {
                ...state,
                user: { ...state.user, balance: state.user.balance + request.amount },
                transactions: [newTx, ...state.transactions],
                pendingRequests: state.pendingRequests.filter(r => r.id !== action.payload.id),
            };
        }
        case 'DENY_REQUEST': 
            return { ...state, pendingRequests: state.pendingRequests.filter(r => r.id !== action.payload.id) };
        case 'ADD_CARD': {
            const newCard = {
                id: Date.now(), 
                ...action.payload,
                theme: ['from-[#B83E3E] to-[#8B2E2E]', 'from-[#2E8B57] to-[#1F5F3F]', 'from-[#D24B4B] to-[#A83838]'][Math.floor(Math.random() * 3)]
            };
            return { ...state, cards: [...state.cards, newCard] };
        }
        case 'REMOVE_CARD': 
            return { ...state, cards: state.cards.filter(card => card.id !== action.payload) };
        case 'SEND_REMITTANCE': {
            const { recipient, amount, currency, convertedAmount, country } = action.payload;
            const numericAmount = parseFloat(amount);
            if (state.user.balance >= numericAmount) {
                const newRemittance = {
                    id: `rem_${Date.now()}`,
                    to: country,
                    recipient,
                    amount: numericAmount,
                    currency,
                    convertedAmount,
                    date: new Date().toISOString()
                };
                const newTx = {
                    id: `tx_${Date.now()}`,
                    to: `${recipient} (${country})`,
                    amount: numericAmount,
                    type: 'sent',
                    date: new Date().toISOString(),
                    category: 'remittance',
                    notes: `International transfer to ${currency}`
                };
                return {
                    ...state,
                    user: {
                        ...state.user,
                        balance: state.user.balance - numericAmount,
                        loyaltyPoints: state.user.loyaltyPoints + Math.floor(numericAmount / 5) // Better rewards for international transfers
                    },
                    transactions: [newTx, ...state.transactions],
                    recentRemittances: [newRemittance, ...state.recentRemittances]
                };
            }
            return state;
        }
        default: 
            return state;
    }
}

export const WalletProvider = ({ children }) => {
    const [state, dispatch] = useReducer(walletReducer, initialState);
    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};