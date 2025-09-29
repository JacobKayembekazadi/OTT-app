import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Toggle from '../components/Toggle';
import { UserIcon, MoonIcon, BellIcon, ShieldCheckIcon, LogoutIcon } from '../icons';

const SettingsScreen = React.memo(() => {
    const { dispatch } = useWallet();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const handleLogout = () => dispatch({ type: 'LOGOUT' });

    const SettingRow = ({ icon, label, children }) => (
        <div className="flex justify-between items-center w-full text-left p-4 bg-[#1E1E1E] rounded-2xl">
            <div className="flex items-center gap-4">
                <div className="text-[#AFAFAF]">{icon}</div>
                <span className="font-semibold">{label}</span>
            </div>
            <div>{children}</div>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-[#AFAFAF] mb-2 px-2">Account</h3>
                    <SettingRow icon={<UserIcon />} label="Edit Profile">
                         <span className="text-[#AFAFAF] text-sm">&gt;</span>
                    </SettingRow>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#AFAFAF] mb-2 px-2">Preferences</h3>
                     <div className="space-y-2">
                        <SettingRow icon={<MoonIcon />} label="Dark Mode">
                            <Toggle enabled={darkMode} setEnabled={setDarkMode} />
                        </SettingRow>
                        <SettingRow icon={<BellIcon />} label="Push Notifications">
                            <Toggle enabled={notifications} setEnabled={setNotifications} />
                        </SettingRow>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#AFAFAF] mb-2 px-2">Security</h3>
                    <SettingRow icon={<ShieldCheckIcon />} label="Change Password">
                        <span className="text-[#AFAFAF] text-sm">&gt;</span>
                    </SettingRow>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="w-full bg-[#1E1E1E] hover:bg-[#2C2C2E] p-4 rounded-2xl flex items-center justify-center gap-4 text-[#FF453A]"
                >
                    <LogoutIcon />
                    <span className="font-bold">Log Out</span>
                </button>
            </div>
        </div>
    );
});

export default SettingsScreen;