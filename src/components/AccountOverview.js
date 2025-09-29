import React from 'react';
import { useWallet } from '../context/WalletContext';

const AccountOverview = React.memo(() => {
    const { state } = useWallet();
    const { user } = state;

    return (
        <div className="p-6 rounded-3xl shadow-lg text-white" style={{
            background: `linear-gradient(135deg,var(--color-brand-gradient-start),var(--color-brand-gradient-end))`,
            boxShadow: 'var(--shadow-card)'
        }}>
            <p className="text-base" style={{color:'var(--color-accent-negative)', opacity:.85}}>Main Account</p>
            <p className="text-5xl font-bold tracking-tight mt-2">
                ${user.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </p>
            <div className="mt-6 border-t pt-4 flex justify-between items-center" style={{borderColor:'rgba(184,62,62,0.3)'}}>
                <div>
                    <p className="text-sm" style={{color:'var(--color-accent-negative)', opacity:.85}}>Loyalty Points</p>
                    <p className="font-semibold text-lg">{user.loyaltyPoints.toLocaleString()} pts</p>
                </div>
            </div>
        </div>
    );
});

export default AccountOverview;