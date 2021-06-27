import { ButtonHTMLAttributes } from 'react';

import '../styles/button.style.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    isOutlined?: boolean;
};

export function ButtonComponents( {isOutlined = false, ...props}:ButtonProps){
    return(
        <button 
        className={` button ${isOutlined ? 'outlined' : '' }`} 
        {...props}
        
        />
    )
}
