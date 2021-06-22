import { ButtonHTMLAttributes } from 'react';

import '../styles/button.style.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonComponents( props:ButtonProps){
    return(
        <button className="button" {...props}/>
    )
}
