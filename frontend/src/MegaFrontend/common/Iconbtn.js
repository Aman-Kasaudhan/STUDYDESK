import React from "react";

function IconBtn({text,onclick,children,outline=false,disabled,type}){
    return(
        <button 
        disabled={disabled}
        onClick={onclick}
        type={type}
        >
            {
                children ?(<> <span >{text}</span> {children}</>) :(text)
            }
        </button>
    )
}
export default IconBtn