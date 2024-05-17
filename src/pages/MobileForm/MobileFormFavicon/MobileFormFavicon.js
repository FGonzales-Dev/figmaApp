import React, { useState,useEffect, useRef } from 'react';
import { t } from 'i18next';
import i18n from '../../../i18n';
import '.././MobileForm.css'
import ButtonColored from '../../../components/ButtonColored/ButtonColored';
import { useNavigate, useLocation } from 'react-router-dom';
import firebase from '../../../firebase';
import { auth, uploadFaviconUrl } from '../../../firebase';
import PaymentSelection from '../../../components/PaymentSelection/PaymentSelection';
import ButtonClear from '../../../components/ButtonClear/ButtonClear';
import { loadStripe } from '@stripe/stripe-js';
import Footer from '../../../components/Footer/Footer';
export const MobileFormFavicon = (props) => {
    const currentLanguage = i18n.language;
    const dbFirestore = firebase.firestore();
    const user = auth.currentUser;
    const location = useLocation();
    const [randomurl, setRandomUrl] = useState('');
    const [docId, setDocId] = useState(location && location.state && location.state.object? location.state.object.id: "");
    const [generatedUrl, setGeneratedUrl] = useState(location && location.state && location.state.object && location.state.object.generatedUrl? location.state.object.generatedUrl: "");
    const [subscriptionType, setSubscriptionType] = useState(location && location.state && location.state.object && location.state.object.subscriptionType? location.state.object.subscriptionType: "");
      const [image, setImage]  = useState(
        location && location.state && location.state.object && location.state.object.faviconUrl
          ? location.state.object.faviconUrl
          : ""
      );
    const [showModal, setShowModal] = useState(false);

    const inputFile = useRef(null);
    const [imgFromLocal, setImgFromLocal] = useState("");
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    
    const onButtonClick = (e) => {
        inputFile.current && inputFile.current.click();
    };

    const MonthlyPayment = async (priceId) => {
        const docRef = await dbFirestore.collection('user').doc(user.uid).collection
            ("checkout_sessions").add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert(error.message)
            }
            if (sessionId) {
                const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    const yearlyPayment = async (priceId) => {
        const docRef = await dbFirestore.collection('user').doc(user.uid).collection
            ("checkout_sessions").add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert(error.message)
            }
            if (sessionId) {
                const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }



    function generateRandomString(length) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return result;
    }
    
    useEffect(() => {
        setRandomUrl(generateRandomString(10))
        const fetchData = async () => {
            try {
                dbFirestore.collectionGroup('url').where('generatedUrl', '==', randomurl).get().then(snapshot => {
                    if (snapshot.docs.length !== 0) {
                        setRandomUrl(generateRandomString(10))
                        console.log("secondRandomUrl " + randomurl)
                    }
                })
            } catch (error) {
                console.error("error" + error);
            }
        };
        fetchData();
    }, []);

    const handleFaviconImage = async (data) => {
        if (docId) {
          try {
            var faviconUrlFromFirebase = await uploadFaviconUrl(data, generatedUrl);
            const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").doc(docId).update({
              faviconUrl: faviconUrlFromFirebase,
              updatedAt: new Date()
            })
            alert("Success");
          } catch (error) {
            alert(error);
          }
        } else {
          try {
            var newFaviconImage = await uploadFaviconUrl(data, generatedUrl);
            const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").add({
              userId: user.uid,
              faviconUrl: newFaviconImage,
              isDraft: "false",
              generatedUrl: randomurl,
              createdAt: new Date(),
            })
            setGeneratedUrl(randomurl);
            setDocId(docRef.id);
            alert("Success");
          } catch (error) {
            alert(error);
          }
        }
      }

    function handleChange(e) {
        if (e.target.files[0]) {
            setImgFromLocal(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]));
            handleFaviconImage(e.target.files[0]);
        }
    }

    return (
        <>
         <div className='app-wrapper-mobile'>
            <div className='mobile-form-content-container'>
        <div className='row first-div'>
            <h1 className='form-title'>Favicon</h1>

            {subscriptionType === "regular" ?
                <>
                <div> 
                    <p className='form-favicon-note-disabled'>This is a small icon which will represent your website at the top of a web browser and in browser's bookmark bar, history and in search results.</p>
                    <h2 className='form-sub-header-disable'>Website Icon</h2>
                    <div className='button-img-upload-container'>
                        <ButtonClear className='upload-image-disabled' onClick={onButtonClick} label={image !== '' ? "Change image" : "Upload image"} />
                    </div>
                    <p className='form-favicon-note-disabled'>&#8226; Submit a PNG, JGP or SVG which is at least 70px x 70px. For best results, use an image which is 260px x 260px or more. </p>
                    <div className='regular-user-message-container'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <h1 className='regular-user-header'> Your website deserves a little customization</h1>
                                <p className='regular-user-message'> Take your website to the next level by upgrading your Figmafolio plan</p>
                            </div>
                            <div className='upgrade-now-btn-container col-md-4'>
                                <ButtonColored className="upgrade-now" label="Upgrade now" onClick={handleShowModal} />
                            </div>
                        </div>
                    </div>
                    </div>
                </>
                :
                <>
                    <p className='form-favicon-note'>This is a small icon which will represent your website at the top of a web browser and in browser's bookmark bar, history and in search results.</p>
                    <h2 className='form-sub-header'>Website Icon</h2>

                    {image !== '' ? <img src={image} className='favicon-prev' /> : null}
                    <div className='button-img-upload-container'>
                        <ButtonClear className='upload-image' onClick={onButtonClick} label={image !== '' ? "Change image" : "Upload image"} />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        ref={inputFile}
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                    <p className='form-favicon-note'>&#8226; Submit a PNG, JGP or SVG which is at least 70px x 70px. For best results, use an image which is 260px x 260px or more. </p>
                </>
            }
        </div>
        <PaymentSelection show={showModal} handleClose={handleCloseModal}
            handleMonthlyPayment={() => MonthlyPayment(process.env.REACT_APP_MONTHLY)}
            handleYearlyPayment={() => yearlyPayment(process.env.REACT_APP_YEARLY)} />
            </div>
            <Footer/>
            </div>
    </>
    )
  }
  