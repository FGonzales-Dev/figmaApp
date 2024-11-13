import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './LandingPage.css';
import main_header_image from './../../assets/images/main-header-image-v2.png';
import stepOne from './../../assets/images/stepOne.png';
import guideOne from './../../assets/images/guide_one_image_v2.png';
import guideTwo from './../../assets/images/guide_two_imag_v2.png';
import guideThree from './../../assets/images/guide_three_image_v2.png';
import one from './../../assets/images/one.png';
import two from './../../assets/images/two.png';
import three from './../../assets/images/three.png';
import Cross from '../../assets/images/crosswhite.png';
import WhiteCross from '../../assets/images/crosswhite.png';
import Check from '../../assets/images/check.png';
import WhiteCheck from '../../assets/images/white-check.png';
import CustomFaviconImage from '../../assets/images/custom_favicon_landing.png';
import CustomDomainImage from '../../assets/images/landing_custom_domain.png';
import PublishAsResponsiveImage from '../../assets/images/publish_as_responsive_landing.png';
import PasswordProtectionImage from '../../assets/images/password_protection_landing.png';
import MultipleProjectImage from '../../assets/images/multiple_project_landing.png';
import BasicImage from '../../assets/images/basic-img@2x.png';
import ProImage from '../../assets/images/pro-img@2x.png';
import freeImage from '../../assets/images/free-img@2x.png';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ButtonColored from '../../components/ButtonColored/ButtonColored';
import ButtonClear from '../../components/ButtonClear/ButtonClear';
import ButtonStartForFree from '../../components/ButtonStartForFree/ButtonStrartForFree';
import ButtonGuide from '../../components/ButtonGuide/ButtonGuide';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer/Footer';


const LandingPage = () => {
  const { t } = useTranslation();
  const divGuide = useRef(null);
  const navigate = useNavigate();
  const [userId] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const [userIsDesktop, setUserIsDesktop] = useState(true);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    window.innerWidth > 1280 ? setUserIsDesktop(true) : setUserIsDesktop(false);
  }, [userIsDesktop]);


  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "https://firebasestorage.googleapis.com/v0/b/figmawebapp.appspot.com/o/figmafolio-favicon.png?alt=media&token=3b9cc2d9-01c6-470e-910a-a64c168ed870?v=2";
  }, []);


  const scrollToDiv = () => {
    divGuide.current.scrollIntoView({ behavior: 'smooth' });
  };


  const navigateToHome = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };


  const currentLanguage = i18n.language;

  const goToDashboard = () => {
    const newPath = `/${currentLanguage}/dashboard`;
    navigate(newPath);
  };


  const goToAuthPage = () => {
    const newPath = `/${currentLanguage}/auth`;
    navigate(newPath);
  };


  return (
    <div className="landing-page">
      <div className="container-fluid main-landing-page p-0">
        {/* Navbar */}
        <div className="navbar-container">
          <div className="row">
            <div className="col-lg-8 col-4">
              <h4 className="logo" onClick={navigateToHome}>
                Figma<span className="green-text">folio</span>
              </h4>
            </div>
            <div className="col-lg-4 d-flex justify-content-end col-8">
              {user ? (
                <div className="landing-button-container">
                  <ButtonColored
                    onClick={goToDashboard}
                    className="btn-go-to-app"
                    label={t('go-to-app')}
                  />
                </div>
              ) : (
                <div className="landing-button-container">
                  <Link
                    to={`/${currentLanguage}/auth`}
                    className="login-link"
                    state={{ name: "tab1" }}
                  >
                    {t('login')}
                  </Link>
                  <ButtonColored
                    onClick={goToAuthPage}
                    className="signup-btn"
                    label={t('signup')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="page-content-container">
          <div className="row">
            <div className="col-md-6 landing-page-container">
              <h1 className="landing-header">{t('landing-header')}</h1>
              <h1 className="landing-sec-subheader">{t('landing-subheader')}</h1>
              <div className="row btn_column">
                <div className="col-md-10 m-0 p-0">
                  <ButtonStartForFree
                    onClick={goToAuthPage}
                    className="start-for-free-btn"
                    label={t('start-for-free')}
                  />
                  <ButtonGuide
                    onClick={scrollToDiv}
                    className="guide-btn"
                    label={t('guide')}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 landing-page-container">
              <img className="landing-page-img" src={main_header_image} alt="Main Header" />
            </div>
          </div>
        </div>


        {/* Features Section */}
        <div className="landing-page-guide-container">
          <div className="make-it-yours-container">
            <h1 className="make-it-yours">Make it yours</h1>
            <h2 className="make-it-yours-subheader">
              Customize publish your Figmafolio page
            </h2>
          </div>


          {/* Custom Domain Feature */}
          <div className="custom-domain-container">
            <div className="row">
              <div className="col-md-6">
                <div className="custom-domain-text-container">
                  <h3 className="landing-feature-header">Custom Domain</h3>
                  <p className="landing-feature-subheader">
                    Connect an existing custom domain to make your site truly yours.
                    We provide guidance and support
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="custom-domain-image-container">
                  <img src={CustomDomainImage} alt="Custom Domain" />
                </div>
              </div>
            </div>
          </div>


          {/* Feature Grid */}
          <div className="row first-row-feature-container">
            <div className="col-md-6">
              <div className="publish-as-responsive-container">
                <img
                  src={PublishAsResponsiveImage}
                  alt="Responsive Design"
                  className="landing-feature-image"
                />
                <h3 className="landing-feature-header">
                  Publish as Responsive Design
                </h3>
                <p className="landing-feature-subheader">
                  Connect an existing custom domain to make your site truly yours.
                  We provide guidance and support.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="publish-as-responsive-container">
                <img
                  src={CustomFaviconImage}
                  alt="Custom Favicon"
                  className="landing-feature-image"
                />
                <h3 className="landing-feature-header">Custom Favicon</h3>
                <p className="landing-feature-subheader">
                  Connect an existing custom domain to make your site truly yours.
                  We provide guidance and support.
                </p>
              </div>
            </div>
          </div>


          {/* Additional Features */}
          <div className="row first-row-feature-container">
            <div className="col-md-6">
              <div className="publish-as-responsive-container">
                <img
                  src={PasswordProtectionImage}
                  alt="Password Protection"
                  className="landing-feature-image"
                />
                <h3 className="landing-feature-header">Password Protection</h3>
                <p className="landing-feature-subheader">
                  Secure your confidential work or NDA projects with password protection.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="publish-as-responsive-container">
                <img
                  src={MultipleProjectImage}
                  alt="Multiple Projects"
                  className="landing-feature-image"
                />
                <h3 className="landing-feature-header">Multiple Project</h3>
                <p className="landing-feature-subheader">
                  Manage different sites for testing and password-protect each project.
                  Each project gets a unique URL, allowing you to share with clients
                  without changing links.
                </p>
              </div>
            </div>
          </div>


          {/* How It Works Section */}
          <div className="make-it-yours-container">
            <h1 className="make-it-yours">How it works</h1>
            <h2 className="make-it-yours-subheader">
              From Figma to live website in 3 simple steps.
            </h2>
          </div>


          {/* Guide Steps */}
          <div className="row guide-container-version-two">
            <div className="col-md-6 landing-page-container col-md-push-6 order-2">
              <img src={guideOne} alt="Step 1" className="step-one-img" />
            </div>
            <div className="col-md-6 landing-page-container col-md-pull-6 order-1">
              <div className="guide-content" ref={divGuide}>
                <div className="guide-number">
                  <img src={one} alt="Number 1" className="step-one" />
                </div>
                <h2 className="guide-one-header">{t('design-in-figma')}</h2>
                <h3 className="guide-one-subheader">{t('instruc-one')}</h3>
              </div>
            </div>
          </div>


          <div className="row guide-container-version-two">
            <div className="col-md-6 landing-page-container col-md-push-6">
              <div className="guide-content">
                <div className="guide-number">
                  <img src={two} alt="Number 2" className="step-one" />
                </div>
                <h2 className="guide-one-header">{t('simple-setup')}</h2>
                <h3 className="guide-one-subheader">{t('instruc-two')}</h3>
              </div>
            </div>
            <div className="col-md-6 landing-page-container">
              <img src={guideTwo} alt="Step 2" className="step-one-img" />
            </div>
          </div>


          <div className="row guide-container-version-two">
            <div className="col-md-6 landing-page-container col-md-push-6 order-2">
              <img src={guideThree} alt="Step 3" className="step-one-img" />
            </div>
            <div className="col-md-6 landing-page-container order-1">
              <div className="guide-content">
                <div className="guide-number">
                  <img src={three} alt="Number 3" className="step-one" />
                </div>
                <h2 className="guide-one-header">{t('go-live')}</h2>
                <h3 className="guide-one-subheader">{t('instruc-three')}</h3>
              </div>
            </div>
          </div>


          {/* Pricing Section */}
          <div className="tier-container">
            <h1 className="tier-header">{t('pick-a-plan')}</h1>
            <h2 className="tier-subheader">
              Our transparent pricing makes it easy to find a plan that works
              within your financial constraints
            </h2>
          </div>


          <div className="landing-page-tier-div">
            {/* Free Tier */}
            <div className="landing-page-tier">
              <div className="landing-page-tier-content">
                <img className="plan-icon" src={freeImage} alt="Free Plan" />
                <h1 className="landing-page-payment-selection-title">{t('free')}</h1>
                <div className="amount-per-month">
                  <span className="landing-page-amount">$0</span>
                  <span className="landing-page-month">/month</span>
                </div>
                <h4 className="landing-page-bill-desc">{t('no-bills')}</h4>
                <div className="landing-payment-feature-container">
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('free-feat-one')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('free-feat-two')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={Cross} alt="Cross" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('removes-made-with')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={Cross} alt="Cross" />
                    <h4 className="landing-page-payment-feature-text">
                      Customize Favicon
                    </h4>
                  </div>
                </div>
                <div className="landing-page-button-upgrade-container">
                  <Link to="/auth" state={{ name: "tab2" }}>
                    <ButtonColored className="btn-get-started" label={t('try-for-free')} />
                  </Link>
                </div>
              </div>
            </div>


            {/* Basic Tier */}
            <div className="landing-page-tier">
              <div className="landing-page-tier-content">
                <img className="plan-icon" src={BasicImage} alt="Basic Plan" />
                <h1 className="landing-page-payment-selection-title">{t('monthly')}</h1>
                <div className="amount-per-month">
                  <span className="landing-page-amount">$6</span>
                  <span className="landing-page-month">/month</span>
                </div>
                <h4 className="landing-page-bill-desc">{t('billed-monthly-at')}</h4>
                <div className="landing-payment-feature-container">
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('monthly-feat-one')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('monthly-yearly-feat-two')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('removes-made-with')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      Password protection
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      Customize Favicon
                    </h4>
                  </div>
                </div>
                <div className="landing-page-button-upgrade-container">
                  <Link to="/auth" state={{ name: "tab2" }}>
                    <ButtonColored className="btn-get-started" label={t('get-started')} />
                  </Link>
                </div>
              </div>
            </div>


            {/* Pro Tier */}
            <div className="landing-page-tier">
              <div className="landing-page-tier-content">
                <img className="plan-icon" src={ProImage} alt="Pro Plan" />
                <h1 className="landing-page-payment-selection-title">{t('yearly')}</h1>
                <div className="amount-per-month">
                  <span className="landing-page-amount">$58</span>
                  <span className="landing-page-month">/year</span>
                </div>
                <h4 className="landing-page-bill-desc">{t('billed-yearly-at')}</h4>
                <div className="landing-payment-feature-container">
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('yearly-feat-one')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('monthly-yearly-feat-two')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('removes-made-with')}
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      Password protection
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      Customize Favicon
                    </h4>
                  </div>
                  <div className="payment-feature">
                    <img className="check-icon" src={WhiteCheck} alt="Check" />
                    <h4 className="landing-page-payment-feature-text">
                      {t('monthly-yearly-feat-three')}
                    </h4>
                  </div>
                </div>
                <div className="landing-page-button-upgrade-container">
                  <Link to="/auth" state={{ name: "tab2" }}>
                    <ButtonColored className="btn-get-started" label={t('get-started')} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};


export default LandingPage;
