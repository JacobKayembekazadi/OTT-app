import React from 'react';

const NavButton = React.memo(({ id, activeTab, setActiveTab, label, children }) => {
    const isActive = activeTab === id;
    return (
        <button 
            onClick={() => setActiveTab(id)} 
            className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
                isActive ? 'text-[#B83E3E]' : 'text-[#AFAFAF] hover:text-[#FFFFFF]'
            }`}
        >
            {children}
            <span className={`text-xs mt-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {label}
            </span>
        </button>
    );
});

export default NavButton;