import React, { useEffect } from 'react';
import { WalletProvider, useWallet } from './context/WalletContext';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import AppShell from './components/AppShell';

function App() {
    const { state } = useWallet();
    // Force dark mode class on html element
    useEffect(() => {
        const root = document.documentElement; // <html>
        if (state.theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        // Fallback hard background
        document.body.style.background = 'var(--color-bg-primary,#121212)';
        document.body.style.color = 'var(--color-text-primary,#FFFFFF)';
    }, [state.theme]);
    return (
        <AppShell>
            {state.isAuthenticated ? <Dashboard /> : <LoginScreen />}
        </AppShell>
    );
}

export default function WalletApp() {
    return (
        <WalletProvider>
            <App />
        </WalletProvider>
    );
}