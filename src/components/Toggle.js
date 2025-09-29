import React from 'react';

const Toggle = ({ enabled, setEnabled }) => (
    <button 
        onClick={() => setEnabled(!enabled)} 
        className={`${
            enabled ? 'bg-[#B83E3E]' : 'bg-[#48484A]'
        } relative inline-flex items-center h-8 rounded-full w-14 transition-colors`}
    >
        <span 
            className={`${
                enabled ? 'translate-x-7' : 'translate-x-1'
            } inline-block w-6 h-6 transform bg-white rounded-full transition-transform`} 
        />
    </button>
);

export default Toggle;