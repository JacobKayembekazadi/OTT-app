import React, { useState, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import AccountOverview from '../components/AccountOverview';
import NavButton from '../components/NavButton';
import HomeScreen from './HomeScreen';
import AnalyticsScreen from './AnalyticsScreen';
import CardManagementScreen from './CardManagementScreen';
import PaymentsScreen from './PaymentsScreen';
import SettingsScreen from './SettingsScreen';
import TransactionDetailsScreen from './TransactionDetailsScreen';
import { HomeIcon, AnalyticsIcon, CardIcon, UserIcon, PlusCircleIcon } from '../icons';

const Dashboard = () => {
    const { state } = useWallet();
    const [activeTab, setActiveTab] = useState('home');
    const [currentView, setCurrentView] = useState({ screen: 'main' });

    const navigateToTx = (txId) => setCurrentView({ screen: 'txDetails', txId });
    const navigateBack = () => setCurrentView({ screen: 'main' });

    const renderContent = useMemo(() => {
        if (currentView.screen === 'txDetails') {
            return <TransactionDetailsScreen txId={currentView.txId} onBack={navigateBack} />;
        }
        
        switch (activeTab) {
            case 'home': 
                return <HomeScreen navigateToTx={navigateToTx} setActiveTab={setActiveTab} />;
            case 'analytics': 
                return <AnalyticsScreen />;
            case 'cards': 
                return <CardManagementScreen />;
            case 'pay': 
                return <PaymentsScreen />;
            case 'settings': 
                return <SettingsScreen />;
            default: 
                return <HomeScreen navigateToTx={navigateToTx} setActiveTab={setActiveTab} />;
        }
    }, [activeTab, currentView]);

    return (
        <div className="min-h-screen font-sans">
            <div className="max-w-md mx-auto">
                <header className="p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src={state.user.avatar} alt="User Avatar" className="h-12 w-12 rounded-full" />
                        <div>
                            <p className="text-[#AFAFAF] text-sm">Welcome back,</p>
                            <h1 className="text-xl font-bold">{state.user.name}</h1>
                        </div>
                    </div>
                </header>
                
                {currentView.screen === 'main' && activeTab === 'home' && (
                    <div className="px-6 pb-6">
                        <AccountOverview />
                    </div>
                )}
            </div>

            <main className="max-w-md mx-auto px-6 pb-32">
                {renderContent}
            </main>

            {currentView.screen === 'main' && (
                <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-[#121212]/50 backdrop-blur-xl">
                    <nav className="flex justify-around items-center p-2 bg-[#1E1E1E] rounded-2xl shadow-lg">
                        <NavButton id="home" activeTab={activeTab} setActiveTab={setActiveTab} label="Home">
                            <HomeIcon />
                        </NavButton>
                        <NavButton id="analytics" activeTab={activeTab} setActiveTab={setActiveTab} label="Analytics">
                            <AnalyticsIcon />
                        </NavButton>
                        <button 
                            onClick={() => setActiveTab('pay')} 
                            className="bg-[#B83E3E] text-white rounded-full w-16 h-16 flex items-center justify-center transform -translate-y-8 shadow-[0_0px_15px_-3px_rgba(184,62,62,0.4)]"
                        >
                            <PlusCircleIcon />
                        </button>
                        <NavButton id="cards" activeTab={activeTab} setActiveTab={setActiveTab} label="Cards">
                            <CardIcon />
                        </NavButton>
                        <NavButton id="settings" activeTab={activeTab} setActiveTab={setActiveTab} label="Settings">
                            <UserIcon />
                        </NavButton>
                    </nav>
                </footer>
            )}
        </div>
    );
};

export default Dashboard;