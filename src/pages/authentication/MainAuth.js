import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import SideFrame from './Components/SideFrame/SideFrame.js';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Auth.css';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from './LoginInPage.js';
import SignUpPage from './SignUpPage.js';


export default function MainAuth() {
    const [userId] = useAuthState(auth);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Set the user state
        });

        return () => unsubscribe(); // Clean up the listener when component unmounts
    }, []);


    return (<>

        {user ? (<Navigate to="/dashboard" />) : (
            <div className='container'>

                <div className='row'>
                    <div className='col-6 tab-view'>
                        <h1 className='header-text'>Welcome to Figmafolio</h1>
                        <Tabs className='nav-pills' defaultActiveKey="tab1" id="tabs">
                            <Tab eventKey="tab1" title="Log in">
                                <LoginPage />
                            </Tab>
                            <Tab eventKey="tab2" title="Sign up">
                                <SignUpPage />
                            </Tab>
                        </Tabs>
                    </div>

                    <div className='col-6'>
                        <SideFrame />
                    </div>
                </div>
            </div>
        )}

    </>
    )
}