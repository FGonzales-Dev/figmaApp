import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase';
import { signOut } from "firebase/auth";
import Button from '../../components/Button/Button';
import ButtonClear from '../../components/ButtonClear/ButtonClear';
import AlertModal from '../../components/AlertModal/AlertModal';
import Footer from '../../components/Footer/Footer';
import './Preview.css';
export default function Preview() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const userId = auth.currentUser;

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Set the user state
        });

        return () => unsubscribe(); // Clean up the listener when component unmounts
    }, []);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSwitchChange = () => {
        setIsMobile(!isMobile);
    };

    function generateRandomString(length) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return result;
    }

    function removeWordFromString(inputString, wordToRemove) {
        // Create a regular expression to match the word with word boundaries
        const regex = new RegExp(`\\b${wordToRemove}\\b`, 'gi');

        // Use the replace method to remove all occurrences of the word
        const resultString = inputString.replace(regex, '');

        return resultString;
    }


    function editUrl(url) {
        const originalString = url;
        const wordToRemove = "https://";
        const modifiedString = removeWordFromString(originalString, wordToRemove);
        const newUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2F" + modifiedString + "&hide-ui=1"
        return newUrl
    }

    const handleDraft = async (event) => {
        event.preventDefault();
        const ref = collection(db, "user", userId.uid, "url")
        const refAllUrl = collection(db, "url")
        // var randomUrl = generateRandomString(6);
        let urlData = {
            title: location.state.title,
            isDraft: "true",
            urls: {
                figmaDesktopUrl: location.state.figmaDesktopUrl,
                figmaMobileUrl: location.state.figmaMobileUrl
            }
        }

        try {
            addDoc(ref, urlData)
            setShowModal(true);
            setModalMessage("Added to draft")

        } catch (err) {
            console.log(err)
            setShowModal(true);
            setModalMessage("Error")
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const ref = doc(db, "user", user.uid, "url", location.state.docId)
            await updateDoc(ref, {
                title: location.state.title,
                urls: {
                    figmaDesktopUrl: editUrl(location.state.figmaDesktopUrl),
                    figmaMobileUrl: editUrl(location.state.figmaMobileUrl)
                }
            });
            setShowModal(true);
            setModalMessage("Update successful")
            console.log('Document updated successfully');
            if (location.state.isDraft == 'false') {
                window.open('https://main--willowy-platypus-08dacb.netlify.app/' + location.state.generatedUrl, '_blank');
            }
        } catch (error) {
            setShowModal(true);
            setModalMessage("Error updating")
            console.error('Error updating document:', error);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const ref = collection(db, "user", userId.uid, "url")
        const refAllUrl = collection(db, "url")
        var randomUrl = generateRandomString(6);
        let urlData = {
            title: location.state.title,
            isDraft: "false",
            generatedUrl: randomUrl,
            urls: {
                figmaDesktopUrl: editUrl(location.state.figmaDesktopUrl),
                figmaMobileUrl: editUrl(location.state.figmaMobileUrl)
            }
        }

        try {
            addDoc(ref, urlData)
            addDoc(refAllUrl, urlData)
            setShowModal(true);
            setModalMessage("App saved")
            window.open('https://main--willowy-platypus-08dacb.netlify.app/' + randomUrl, '_blank');
        } catch (err) {
            console.log(err)
            setShowModal(true);
            setModalMessage("Error in saving")
        }
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>

            {!user || !location.state ? (
                navigate("/")

            ) : (
                <div>

                    {/* <Navbar setWeatherData={setWeatherData} email={user.email} onClickLogout={handleLogout} isPreviewPage={true} /> */}

                    <nav className="navbar navbar-light custom-navbar">
                        <div className='container'>
                            <a className="navbar-brand" href="/"> Figmafolio</a>
                            <div className="navbar-center">

                                <div container="preview-switch-container">
                                    <h1 className='preview-switch-header'>Preview</h1>
                                    <div className='switch-container'>
                                        <p>Desktop</p>
                                        <div className='container'>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"

                                                checked={isMobile}
                                                onChange={handleSwitchChange}
                                            />
                                        </div>
                                        <p> Mobile</p>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-item ml-auto">
                                <div className='d-flex'>

                                    <a clclassNameass="nav-link">{user.email}</a>
                                    <div className="dropdown">
                                        <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg width="12" height="14" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            </svg>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark bg-light">
                                            <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </nav >

                    <AlertModal show={showModal} handleClose={handleCloseModal} alertMessage={modalMessage} />
                    <div className='container'>
                        < div className='draft-publish-container'>
                            <ButtonClear className="save-as-draft" label='Save as Draft' onClick={location.state.fromEdit === true ? handleUpdate : handleDraft} />
                            {location.state.fromEdit === true ? (
                                <Button className="update-btn" label='Update' onClick={handleUpdate} />) :
                                (
                                    <Button className="update-btn" label='Publish' onClick={handleSave} />
                                )}
                        </div >
                        {isMobile ? <h1>Mobile</h1> : <h1> Desktop</h1>}
                        <iframe

                            src={isMobile ? editUrl(location.state.figmaMobileUrl) : editUrl(location.state.figmaDesktopUrl)}
                            allowFullScreen
                            style={{ width: '100%', height: '100vh' }}
                            className='figma_view'></iframe>
                    </div>
                    <Footer />
                </div>
            )
            }
        </>
    );
};

