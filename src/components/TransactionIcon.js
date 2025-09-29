import React from 'react';
import { FoodIcon, ShoppingCartIcon, WorkIcon, UserIcon, GlobeIcon } from '../icons';

const TransactionIcon = React.memo(({ category }) => {
    let icon;
    switch (category) {
        case 'food': 
            icon = <FoodIcon />; 
            break;
        case 'shopping': 
            icon = <ShoppingCartIcon />; 
            break;
        case 'work': 
            icon = <WorkIcon />; 
            break;
        case 'user': 
            icon = <UserIcon />; 
            break;
        case 'remittance':
            icon = <GlobeIcon />;
            break;
        default: 
            icon = <UserIcon />;
    }
    return (
        <div className="p-3 bg-[#2C2C2E] rounded-full text-[#8A8A8E]">
            {icon}
        </div>
    );
});

export default TransactionIcon;