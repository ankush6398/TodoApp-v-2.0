import { useState } from "react";


export const ToggleSwitch = ()=>{
    const [isOn ,SetIsOn] =  useState(false);

    const handleToggle=()=>{
        SetIsOn(!isOn);
    }

    return(
        <div className="toggleswitch" style={{backgroundColor:isOn ? "#4caf50":"#f44336"}} onClick={handleToggle}>
            <div className={`"switch" ${isOn ? "on":"off"}`} >
                <span className="switch-state">{isOn ? "on":"off"}</span>
            </div>
        
        </div>
    )
}