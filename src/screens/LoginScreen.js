import React, { useCallback } from 'react';
import { useWallet } from '../context/WalletContext';
import { UserIcon, LockIcon } from '../icons';

const LoginScreen = () => {
    const { dispatch } = useWallet();
    
    const handleLogin = useCallback((e) => { 
        e.preventDefault(); 
        dispatch({ type: 'LOGIN' }); 
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <img 
                            src="/images/logos/ott_logo-removebg-preview.png" 
                            alt="OTT Logo" 
                            className="h-20 w-auto"
                        />
                    </div>
                    <p className="text-[#AFAFAF] mt-2 text-lg">Welcome Back</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[#AFAFAF] text-sm font-semibold mb-2" htmlFor="username">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#AFAFAF]">
                                <UserIcon className="h-5 w-5" />
                            </div>
                            <input 
                                id="username" 
                                type="text" 
                                placeholder="demouser" 
                                className="bg-[#1E1E1E] text-white placeholder-[#6C6C6C] rounded-xl w-full py-4 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#B83E3E]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#AFAFAF] text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#AFAFAF]">
                                <LockIcon />
                            </div>
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="************" 
                                className="bg-[#1E1E1E] text-white placeholder-[#6C6C6C] rounded-xl w-full py-4 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#B83E3E]"
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#B83E3E] hover:bg-[#A83535] text-white font-bold py-4 px-4 rounded-xl focus:outline-none transition-transform transform hover:scale-105 shadow-[0_0px_15px_-3px_rgba(184,62,62,0.4)]"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;