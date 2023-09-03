import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase';
import { useNavigate, NavLink, useParams, Link } from 'react-router-dom';
import './UrlForm.css';
import Alert from "react-bootstrap/Alert";
import Button from '../../components/Button/Button';

export default function UrlForm() {
    const navigate = useNavigate();
    const [figmaDesktopUrl, setDesktopCustomUrl] = useState('');
    const [figmaMobileUrl, setfigmaMobileUrl] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [title, setTitle] = useState('');
    const userId = auth.currentUser;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Set the user state
        });

        return () => unsubscribe(); // Clean up the listener when component unmounts
    }, []);



    function generateRandomString(length) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return result;
    }


    const handlefigmaDesktopUrl = (event) => {
        setDesktopCustomUrl(event.target.value);
    };
    const handlefigmaMobileUrl = (event) => {
        setfigmaMobileUrl(event.target.value);
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ref = collection(db, "user", userId.uid, "url")
        const refAllUrl = collection(db, "url")
        var randomUrl = generateRandomString(6);
        let urlData = {
            title: title,
            generatedUrl: randomUrl,
            urls: { figmaDesktopUrl, figmaMobileUrl }
        }

        try {
            addDoc(ref, urlData)
            addDoc(refAllUrl, urlData)
            window.open('https://thriving-chaja-a2ee84.netlify.app/' + randomUrl, '_blank');
            <Alert variant="success" style={{ width: "42rem" }}>
                <Alert.Heading>
                    This is a success alert which has green background
                </Alert.Heading>
            </Alert>
        } catch (err) {
            console.log(err)
        }
        setDesktopCustomUrl("")
        setfigmaMobileUrl("")
    }

    const goToPreview = () => {
        navigate('/preview', { state: { title: title, figmaMobileUrl: figmaMobileUrl, figmaDesktopUrl: figmaDesktopUrl } });
    }

    return (

        <>
            <div className='container'>
                <div className="card url-form">
                    <form onSubmit={goToPreview}>
                        <div className="container">
                            <div className="row first-div">
                                <div className="col-md-6">
                                    <div className="row">
                                        <h1 className='title'>General</h1>
                                        <h2 className='sub-header'>Site Title</h2>
                                        <input
                                            className='input'
                                            type="text"
                                            placeholder='Title'
                                            value={title}
                                            onChange={handleTitle} />
                                    </div>
                                </div>
                            </div>

                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h1 className='title'>Free domain</h1>
                                        <h1 className='free-domain-name'>Figmafolio</h1>
                                    </div>
                                    <div className='col-md-6'>
                                        <Button label='Upgrade plan' />
                                    </div>
                                </div>
                            </div>

                            <div className='container'>
                                <h4 className='add-dns-content'>
                                    Add the DNS records to your domain name.A-record for @ (or yourdomain.com) and www to 5.161.34.112You can add a new record in your domain registrar DNS manager.Make sure you add an entry for both @ and www
                                </h4>
                            </div>

                            <div className='container second-div'>
                                <h1 className='title'>Enter figma prototype links</h1>
                                <h3 className='automatically-point-content'> We’ll automatically point the site to the correct prototype.</h3>
                            </div>

                            <div className="container">
                                <div className="row gx-5">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <h2 className='sub-header'>
                                                Desktop
                                            </h2>
                                            <input
                                                className='input'
                                                type="text"
                                                placeholder='Custom Desktop Url'
                                                value={figmaDesktopUrl}
                                                onChange={handlefigmaDesktopUrl}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="row">
                                            <h2 className='sub-header'>
                                                Mobile
                                            </h2>
                                            <input
                                                className='input'
                                                type="text"
                                                placeholder='Custom Mobile Url'
                                                value={figmaMobileUrl}
                                                onChange={handlefigmaMobileUrl}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                            <Button label="Preview" />
                        </div>

                    </form >
                </div>
            </div>
        </>
        // <>
        //     {!user ? (
        //         <h1> Login to access this page</h1>
        //     ) : (
        //         <div className='container'>
        //             <h1 className='title'>General</h1>
        //             <input
        //                 className='input'
        //                 type="text"
        //                 placeholder='Title'
        //                 value={title}
        //                 onChange={handleTitle} />

        //             <form onSubmit={handleSubmit}>
        //                 <div className="container">
        //                     <div className="row first-div">
        //                         <div className="col-md-6">
        //                             <div className="row">
        //                                 <h1 className='title'>Free domain</h1>
        //                                 <h2 className='sub-header'>Title</h2>
        //                                 <input
        //                                     className='input'
        //                                     type="text"
        //                                     placeholder='Title'
        //                                     value={title}
        //                                     onChange={handleTitle} />
        //                             </div>
        //                         </div>

        //                         <div className="col-md-6">
        //                             <h1 className='title'>Custom domain</h1>
        //                             <div className="row">
        //                                 <h2 className='sub-header'>Domain name</h2>
        //                                 <input
        //                                     className='input'
        //                                     type="text"
        //                                     placeholder='Domain name' />
        //                             </div>

        //                         </div>
        //                         <div className='container'>
        //                             <h4 className='add-dns-content'>
        //                                 Add the DNS records to your domain name.A-record for @ (or yourdomain.com) and www to 5.161.34.112You can add a new record in your domain registrar DNS manager.Make sure you add an entry for both @ and www
        //                             </h4>
        //                         </div>
        //                     </div>
        //                 </div>


        //                 <div className='container second-div'>
        //                     <h1 className='title'>Enter figma prototype links</h1>

        //                     <h3 className='automatically-point-content'> We’ll automatically point the site to the correct prototype.</h3>
        //                 </div>


        //                 <div className="container">
        //                     <div className="row">
        //                         <div className="col-md-6">
        //                             <div className="row">
        //                                 <h2 className='sub-header'>
        //                                     Desktop
        //                                 </h2>


        //                                 <input
        //                                     className='input'
        //                                     type="text"
        //                                     placeholder='Custom Desktop Url'
        //                                     value={figmaDesktopUrl}
        //                                     onChange={handlefigmaDesktopUrl}
        //                                 />

        //                             </div>
        //                         </div>

        //                         <div className="col-md-6">
        //                             <div className="row">
        //                                 <h2 className='sub-header'>
        //                                     Mobile
        //                                 </h2>
        //                                 <input
        //                                     className='input'
        //                                     type="text"
        //                                     placeholder='Custom Mobile Url'
        //                                     value={figmaMobileUrl}
        //                                     onChange={handlefigmaMobileUrl}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <button
        //                     className='btn-sign-in'
        //                     type="submit">
        //                     Save changes
        //                 </button>
        //             </form >
        //         </div >
        //     )
        //     }
        // </>

    );
};

