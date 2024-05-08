import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/NavBar/Navbar';
import { auth, uploadFaviconUrl } from '../../firebase';
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import { t } from 'i18next';
import i18n from '../../i18n';
import './FolioForm.css'
import FormTitle from '../../components/FormTitle/FormTitle';
import FormInstruction from '../../components/FormInstruction/FormInstruction';
import FormContent from '../../components/FormContent/FormContent';
import FormCustomDomain from '../../components/FormCustomDomain/FormCustomDomain';
import FormFavicon from '../../components/FormFavicon/FormFavicon';
import firebase from '../../firebase';
import axios from "axios";
import AlertErrorModal from '../../components/AlertErrorModal/AlertErrorModal';
const isOpenInMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export default function FolioForm() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tab1');
  const dbFirestore = firebase.firestore();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState(location.state.subscriptionType);
  const user = auth.currentUser;



  useEffect(() => {
    const handleResize = () => {
      console.log("ity is mobile")
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [docId, setDocId] = useState(
    location && location.state && location.state.object
      ? location.state.object.id
      : ""
  );
  const [title, setTitle] = useState(
    location && location.state && location.state.object && location.state.object.title
      ? location.state.object.title
      : ""
  );
  const [generatedUrl, setGeneratedUrl] = useState(
    location && location.state && location.state.object && location.state.object.generatedUrl
      ? location.state.object.generatedUrl
      : ""
  );
  const [faviconImage, setFaviconImage] = useState(
    location && location.state && location.state.object && location.state.object.faviconUrl
      ? location.state.object.faviconUrl
      : ""
  );
  const [faviconFromLocal, setFaviconFromLocal] = useState(null);
  const [figmaDesktopUrl, setFigmaDesktopUrl] = useState(
    location.state && location.state.object && location.state.object.urls && location.state.object.urls.figmaDesktopUrl
      ? location.state.object.urls.figmaDesktopUrl
      : ""
  );
  const [figmaMobileUrl, setFigmaMobileUrl] = useState(
    location.state && location.state.object && location.state.object.urls && location.state.object.urls.figmaMobileUrl
      ? location.state.object.urls.figmaMobileUrl
      : ""
  );
  const [oldDomain, setOldDomain] = useState(
    location && location.state && location.state.object && location.state.object.customDomain
      ? location.state.object.customDomain
      : ""
  );
  const [domain, setDomain] = useState(
    location && location.state && location.state.object && location.state.object.customDomain
      ? location.state.object.customDomain
      : ""
  );
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const [randomurl, setRandomUrl] = useState('');

  var newCustomDomainData = {
    "name": domain
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 83YzDqNvO4OoVtKXQXJ4mTyj'
  };
  const goToPreview = async () => {
    if (figmaDesktopUrl || figmaMobileUrl) {
      navigate("/" + currentLanguage + '/preview', { state: { title: title, figmaMobileUrl: figmaMobileUrl, figmaDesktopUrl: figmaDesktopUrl } });
    }
  }

  //GENERATE URL

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

  function removeWordFromString(inputString, wordToRemove) {
    const regex = new RegExp(`\\b${wordToRemove}\\b`, 'gi');
    const resultString = inputString.replace(regex, '');
    return resultString;
  }

  function editUrl(url) {
    const originalString = url;
    const wordToRemove = "https://";
    const hideUi = "&hide-ui=1"
    const hotspot = "&hotspot-hints=0"
    const embedHost = "www.figma.com/embed?embed_host=share&url=https%3A%2F%2F"
    var newUrl = ""
    var modifiedUrl = ""
    const modifiedString = removeWordFromString(originalString, wordToRemove);
    if (url !== '') {
      if (!modifiedString.includes(embedHost)) {
        newUrl = "https://" + embedHost + modifiedString
      } else {
        newUrl = url;
      }
      if (!newUrl.includes(hideUi)) {
        newUrl += hideUi
      }
      if (!newUrl.includes(hotspot)) {
        newUrl += hotspot
      }
      if (newUrl.includes("scaling=contain")) {
        modifiedUrl = newUrl.replace(new RegExp("scaling=contain", 'g'), "scaling=scale-down-width");
        newUrl = modifiedUrl
      } else if (newUrl.includes("scaling=min-zoom")) {
        modifiedUrl = newUrl.replace(new RegExp("scaling=min-zoom", 'g'), "scaling=scale-down-width");
        newUrl = modifiedUrl
      } else if (newUrl.includes("scaling=scale-down")) {
        if (!newUrl.includes("scaling=scale-down-width")) {
          modifiedUrl = newUrl.replace(new RegExp("scaling=scale-down", 'g'), "scaling=scale-down-width");
          newUrl = modifiedUrl
        }
      }
    } else {
      newUrl = ""
    }
    return newUrl
  }

  const handleTitle = (data) => {
    setTitle(data);
  };

  const handleFigmaMobileUrl = (data) => {
    setFigmaMobileUrl(data);
  }

  const handleFigmaDesktopUrl = (data) => {
    setFigmaDesktopUrl(data);
  }
  const handleDomain = (data) => {
    setDomain(data);
  }
  const handleFaviconImage = (data) => {
    setFaviconFromLocal(data);
  }
  const deleteDomainFromVercel = async () => {
    await axios.delete(`https://api.vercel.com/v9/projects/${process.env.REACT_APP_VERCEL_PROJECT_ID}/domains/${oldDomain}?teamId=${process.env.REACT_APP_VERCEL_TEAM_ID}`,
      {
        headers: headers,
      }).catch((error) => {
        console.log(error.response.data.error)
      });
  }
  const addDomainToVercel = async () => {
    await axios.post(`https://api.vercel.com/v9/projects/${process.env.REACT_APP_VERCEL_PROJECT_ID}/domains?teamId=${process.env.REACT_APP_VERCEL_TEAM_ID}`,
      newCustomDomainData, {
      headers: headers,
    });
  }

  const saveDomain = async () => {
    if (docId) {
      if (oldDomain !== domain) {
        console.log("wentHere1")
      }
      try {
        await deleteDomainFromVercel();
        await addDomainToVercel();
        await dbFirestore.collection('user').doc(user.uid).collection("url").doc(docId).update({
          customDomain: domain,
          updatedAt: new Date()
        })
        alert("Success");
      } catch (error) {
        alert(error.response.data.error.code);
        return;
      }
    } else {
      console.log(domain)
      if (domain) {
        console.log(newCustomDomainData)
        try {
          await addDomainToVercel();
          const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").add({
            userId: user.uid,
            isDraft: "false",
            customDomain: domain,
            generatedUrl: randomurl,
            createdAt: new Date(),
          });
          setGeneratedUrl(randomurl);
          alert("Success");
        } catch (error) {
          alert(error.response.data.error.code);
          return;
        }
      }
    }
    setOldDomain(domain)
  }


  const saveFigmaUrl = async () => {
    if ((!figmaDesktopUrl.includes('figma.com/file') && !figmaMobileUrl.includes('figma.com/file')) &&
      (figmaMobileUrl.includes('figma.com/proto') || figmaMobileUrl.includes('figma.com/embed') ||
        figmaDesktopUrl.includes('figma.com/proto') || figmaDesktopUrl.includes('figma.com/embed'))) {
      try {
        if (docId) {
          const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").doc(docId).update({
            urls: {
              figmaDesktopUrl: editUrl(figmaDesktopUrl),
              figmaMobileUrl: editUrl(figmaMobileUrl)
            },
            updatedAt: new Date()
          })
        } else {
          const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").add({
            userId: user.uid,
            generatedUrl: randomurl,
            isDraft: "false",
            urls: {
              figmaDesktopUrl: editUrl(figmaDesktopUrl),
              figmaMobileUrl: editUrl(figmaMobileUrl)
            },
            createdAt: new Date(),
          })
          setGeneratedUrl(randomurl);
        }
      } catch (err) {
        alert(err.message)
      } finally {
        alert("Success")
      }
    } else {
      setShowErrorModal(true);
    }
  }

  const saveTitle = async () => {
    try {
      if (docId) {
        const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").doc(docId).update({
          title: title,
          updatedAt: new Date()
        })
      } else {
        const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").add({
          userId: user.uid,
          title: title,
          isDraft: "false",
          generatedUrl: randomurl,
          createdAt: new Date(),
        })
        setGeneratedUrl(randomurl);
      }
    } catch (err) {
      alert(err.message)
    } finally {
      alert("Success")
    }
  }

  const saveFavicon = async () => {
    console.log("hello favicon");
    console.log(faviconImage);
    console.log(generatedUrl);
    if (docId) {
      try {
        var faviconUrlFromFirebase = await uploadFaviconUrl(faviconFromLocal, generatedUrl);
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
        var newFaviconImage = await uploadFaviconUrl(faviconFromLocal, generatedUrl);
        const docRef = await dbFirestore.collection('user').doc(user.uid).collection("url").add({
          userId: user.uid,
          faviconUrl: newFaviconImage,
          isDraft: "false",
          generatedUrl: randomurl,
          createdAt: new Date(),
        })
        setGeneratedUrl(randomurl);
        alert("Success");
      } catch (error) {
        alert(error);
      }
    }
  }

  // Function to handle tab click
  const handleTabClick = (tabId, event) => {
    event.preventDefault();
    setActiveTab(tabId);
  };

  const handleTabClickMobile = (tabId, event) => {
    event.preventDefault();
    console.log(tabId)
    if (tabId === "tab1") { } else if (tabId === "tab2") { } else if (tabId === "tab3") { } else if (tabId === "tab4") { } else if (tabId === "tab5") {
      console.log(tabId)

      navigate("/" + currentLanguage + "/instruction");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate(currentLanguage + "/");
    }).catch((error) => {
    });
  }

  return (

    <>{
      isMobile ?
        <>
          <div className='tab-container-mobile'>
            <ul className="nav flex-column nav-tabs vertical-tabs-mobile">
              <li className="nav-item-mobile">
                <a className={`folio-form ${activeTab === 'tab1' ? 'active' : ''}`}
                  onClick={(e) => handleTabClickMobile('tab1', e)}
                  href="#tab1">
                  General
                </a>
              </li>
              <li className="nav-item-mobile">
                <a className={`folio-form ${activeTab === 'tab2' ? 'active' : ''}`}
                  onClick={(e) => handleTabClickMobile('tab2', e)}
                  href="#tab2">
                  Figma Links
                </a>
              </li>
              <li className="nav-item-mobile">
                <a className={`folio-form ${activeTab === 'tab3' ? 'active' : ''}`}
                  onClick={(e) => handleTabClickMobile('tab3', e)}
                  href="#tab3">
                  Custom Domain
                </a>
              </li>
              <li className="nav-item-mobile">
                <a className={`folio-form ${activeTab === 'tab4' ? 'active' : ''}`}
                  onClick={(e) => handleTabClickMobile('tab4', e)}
                  href="#tab3">
                  Favicon
                </a>
              </li>
              <li className="nav-item-mobile">
                <a className={`folio-form ${activeTab === 'tab5' ? 'active' : ''}`}
                  onClick={(e) => handleTabClickMobile('tab5', e)}
                  href="#tab3">
                  Need help?
                </a>
              </li>
            </ul>
          </div>
        </>
        :
        <>
          <Navbar className={"dashboardNavBar"} title={title} email={user.email} onClickLogout={handleLogout} isFromForm={"newForm"} generatedUrl={generatedUrl} />
          <div className="folioform">
            <div className="row">
              <div className="col-md-3">
                <ul className="nav flex-column nav-tabs vertical-tabs">
                  <li className="nav-item">
                    <a className={`folio-form ${activeTab === 'tab1' ? 'active' : ''}`}
                      onClick={(e) => handleTabClick('tab1', e)}
                      href="#tab1">
                      General
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`folio-form ${activeTab === 'tab2' ? 'active' : ''}`}
                      onClick={(e) => handleTabClick('tab2', e)}
                      href="#tab2">
                      Figma Links
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`folio-form ${activeTab === 'tab3' ? 'active' : ''}`}
                      onClick={(e) => handleTabClick('tab3', e)}
                      href="#tab3">
                      Custom Domain
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`folio-form ${activeTab === 'tab4' ? 'active' : ''}`}
                      onClick={(e) => handleTabClick('tab4', e)}
                      href="#tab3">
                      Favicon
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`folio-form ${activeTab === 'tab5' ? 'active' : ''}`}
                      onClick={(e) => handleTabClick('tab5', e)}
                      href="#tab3">
                      Need help?
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9 folio-form-tab-content">
                <div className="tab-content">
                  <div className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''}`} id="tab1">
                    <FormTitle onChildDataSubmit={handleTitle} setTitle={title} saveTitle={saveTitle} />
                  </div>
                  <div className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`} id="tab2">
                    <FormContent onChildDesktopUrl={handleFigmaDesktopUrl} onChildFigmaMobileUrl={handleFigmaMobileUrl} setFigmaMobileUrl={figmaMobileUrl} setFigmaDesktopUrl={figmaDesktopUrl} saveFigmaUrl={saveFigmaUrl} goToPreview={goToPreview} />
                  </div>
                  <div className={`tab-pane fade ${activeTab === 'tab3' ? 'show active' : ''}`} id="tab3">
                    <FormCustomDomain onChildDomain={handleDomain} setDomain={domain} saveDomain={saveDomain} subscriptionType={subscriptionType} />
                  </div>
                  <div className={`tab-pane fade ${activeTab === 'tab4' ? 'show active' : ''}`} id="tab4">
                    <FormFavicon onChildFavicon={handleFaviconImage} setFaviconImage={faviconImage} saveFavicon={saveFavicon} subscriptionType={subscriptionType} />
                  </div>
                  <div className={`tab-pane fade ${activeTab === 'tab5' ? 'show active' : ''}`} id="tab5">
                    <FormInstruction />
                  </div>
                </div>
              </div>
            </div>
          </div>
          < AlertErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} alertMessage={t('you-have-entered-a-link')} />
          <Footer />
        </>
    }
    </>

  );
};

