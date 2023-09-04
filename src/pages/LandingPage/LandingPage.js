import React from 'react';
import { useState, useEffect } from 'react';
import './LandingPage.css';
import landing_page from './../../assets/images/landing_page.png';
import Footer from '../../components/Footer/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
export default function LandingPage() {

  const navigate = useNavigate();
  const [userId] = useAuthState(auth);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user state
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);


  return (<>
    {user ? (
      navigate("/dashboard")
    ) : (
      < div className='container-fluid main-landing-page'>
        <div className='nav-bar'>
          <div className="row">
            <div className="col-sm-8">
              <h4 className='figmalio'> Figmafolio</h4>
            </div>
            <div className="col-sm-4 d-flex justify-content-end">

              <NavLink to="/auth" >
                <button className='btn-go-to-app' >Log in/ Sign up</button>
              </NavLink>

            </div>
          </div>
        </div>


        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <h1>Seamless Showcase: Unify Your Prototypes with a Custom URL</h1>
              <h1>No coding required</h1>
              <h1>With Figmafolio, you can effortlessly combine your desktop and mobile prototypes created in Figma into a cohesive showcase, all under your own custom URL. Ditch the hassle of separate links and enjoy a seamless browsing experience on both desktop and mobile devices.</h1>
              <div className='row btn_column'>
                <div className='col-6 text-end'>
                  <button className='btn-learn-more' >Learn more</button>
                </div>
                <div className='col-6'>
                  <button className='btn-start-for-free'>Start for free</button>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <img src={landing_page} />
            </div>
          </div>
        </div>


        <div className='container main-container'>

          <div className='container header-container'>
            <h2 className='header_one'> Build your portfolio easily using Figma prototypes</h2>
            <h3 className='header_two'>No coding required</h3>

          </div>

          <div className='container'>
            <h3 className='content_one'> Instantly turn your Figma prototypes into an impressive online portfolio with just a few clicks.</h3>
            <h4 className='content_two'> Simply connect your Figma files and figmafolio does the rest.. Update your projects in real-time by iterating in Figma. It's the fastest way for you to get your UX work online and start promoting your skills, without the hassle of rebuilding your website and prototypes separately. Skip redoing all that work. Go from Figma to portfolio instantly and let your UX talents shine</h4>
          </div>
        </div>

        <Footer />
      </div>
    )
    }
  </>
  )

}