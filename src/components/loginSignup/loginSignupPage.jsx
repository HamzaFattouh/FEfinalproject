import React from 'react';
import Login from './login';
import Signup from './signup';
import { useState } from 'react';
import './loginSignupPage.Module.css';

export default function loginSignupPage() {

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <>
            <div className="lscontainer">
                <div className="slidecheck">
                    <p>Login</p>
                    <input className="checkbox1" type="checkbox" id="reg-log" name="reg-log" onChange={handleCheckboxChange} checked={checked} />
                    <label htmlFor="reg-log"></label>
                    <p>Signup</p>
                </div>
                <div className="maincontainer">
                    <Login />
                    <Signup />
                    <div className={`overlay ${checked ? 'overlay-active' : ''}`}>
                        <h2>TShop</h2>
                        <p>Best Choice for Shopping</p>
                    </div>
                </div>
            </div>
        </>
    )
}
