import React from "react";
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'

export default function LogoSearch(){
    return(
        <div className="LogoSearch">
            <h1 className="title">SocialMedia</h1>
            <div className="Search">
                <input type="text"  placeholder="Search here"/>
                <div className="s-icon">
                    <UilSearch/>
                </div>
            </div>

        </div>
    )
}