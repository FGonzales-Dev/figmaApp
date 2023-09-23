import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, getDocs, updateDoc, QuerySnapshot } from 'firebase/firestore'
import { db, auth } from '../../firebase';
import { signOut } from "firebase/auth";
import ButtonColored from '../../components/ButtonColored/ButtonColored';
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
    const [duplicate, setDuplicate] = useState('');
    const [randomurl, setRandomUrl] = useState('');
    const [user, setUser] = useState(null);

    console.log("wewewew" + location.state.figmaDesktopUrl)
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
        const hideUi = "&hide-ui=1"
        const embedHost = "www.figma.com/embed?embed_host=share&url=https%3A%2F%2F"
        var newUrl = ""
        const modifiedString = removeWordFromString(originalString, wordToRemove);
        if (!modifiedString.includes(embedHost)) {
            newUrl = "https://" + embedHost + modifiedString
        } else {
            newUrl = "https://" + modifiedString
        }

        if (!modifiedString.includes(hideUi)) {
            newUrl = "https://" + embedHost + modifiedString + hideUi
        } else {
            newUrl = "https://" + modifiedString
        }

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
                window.open('https://figmafolio.com/' + location.state.generatedUrl, '_blank');
            }
        } catch (error) {
            setShowModal(true);
            setModalMessage("Error updating")
            console.error('Error updating document:', error);
        }
    };

    const handleSaveV2 = async () => {
        const ref = collection(db, "user", userId.uid, "url")
        const refAllUrl = collection(db, "url")

        let urlData = {
            title: location.state.title,
            isDraft: "false",
            generatedUrl: randomurl,
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
            window.open('https://figmafolio.com/' + randomurl, '_blank');
        } catch (err) {
            console.log(err)
            setShowModal(true);
            setModalMessage("Error in saving")
        }
    }


    useEffect(() => {
        setRandomUrl(generateRandomString(10))
        var testy = "helloworld"
        const fetchData = async () => {
            if (user) {
                try {
                    await getDocs(collection(db, "url"))
                        .then((querySnapshot) => {
                            const newData = querySnapshot.docs
                                .map((doc) => ({ ...doc.data(), id: doc.id }));
                            newData.forEach((value) => {
                                console.log(value.generatedUrl)
                                if (value.generatedUrl != randomurl) {
                                    console.log("not exists");

                                } else {
                                    setDuplicate(true)
                                    console.log(randomurl);
                                    console.log("already exists");
                                }
                            });
                        })
                } catch (error) {
                    console.error("error" + error);
                }
            }
        };
        fetchData();
    }, [user]);


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
                    <nav className="navbar navbar-light custom-navbar">
                        <div className='container'>
                            <a className=" back-to-library" href="/dashboard"> &lt; Back to dashboard</a>
                            <div className="navbar-center">
                                <div container="preview-switch-container">
                                    <h1 className='preview-switch-header'>Preview</h1>
                                    <div className='switch-container'>
                                        <p className='desktop-mobile-label'>Desktop</p>
                                        <div className='container'>
                                            <Form.Check
                                                className='form-switch'
                                                type="switch"
                                                id="custom-switch"
                                                checked={isMobile}
                                                onChange={handleSwitchChange}
                                            />
                                        </div>
                                        <p className='desktop-mobile-label'> Mobile</p>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-item ml-auto">

                                < div className='draft-publish-container'>
                                    <ButtonClear className="save-as-draft" label='Save as Draft' onClick={location.state.fromEdit === true ? handleUpdate : handleDraft} />
                                    {location.state.fromEdit === true ? (
                                        <ButtonColored className="update-btn" label='Update' onClick={handleUpdate} />) :
                                        (
                                            <ButtonColored className="update-btn" label='Publish' onClick={handleSaveV2} />
                                        )}
                                </div >

                            </div>
                        </div>

                    </nav >

                    <AlertModal show={showModal} handleClose={handleCloseModal} alertMessage={modalMessage} />
                    <div className='container'>

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

