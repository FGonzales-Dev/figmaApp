import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Auths.css';
import TextField from '../../components/TextField/TextField.js';
import ButtonColored from '../../components/ButtonColored/ButtonColored.js';
import PasswordTextField from '../../components/PasswordTextfield/PasswordTextfield.js';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function LoginPage() {
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isButtonActive = email && password;
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    const handleEmailChange = (email) => {
        setEmail(email);
    };

    const handlePasswordChange = (password) => {
        setPassword(password);
    };

    const goToForgotPassword = () => {
        const newPath = `/${currentLanguage}/forgotpassword`;
        navigate(newPath);
    };

    const onLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate(`/${currentLanguage}/dashboard`);
            })
            .catch((error) => {
                handleLoginError(error);
            });
    };

    const handleLoginError = (error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        switch (errorMessage) {
            case "Firebase: Error (auth/user-not-found).":
                setErrorEmail("Email address not found");
                break;
            case "Firebase: Error (auth/wrong-password).":
                setErrorPassword("Wrong password");
                break;
            case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                setErrorPassword("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
                break;
            default:
                console.error("Unhandled error: ", errorMessage);
        }
    };

    return (
        <div className='container login-page'>
            <form className='login' onSubmit={onLogin}>
                <div>
                    <TextField
                        formLabel={t('email')}
                        errorMsg="Invalid email"
                        className='auth-input'
                        id="email-address"
                        name="email"
                        type="email"
                        placeholder={t('enter-your-email')}
                        onChange={handleEmailChange}
                    />
                    {errorEmail && <p className='error-message'>{errorEmail}</p>}
                </div>
                <div>
                    <PasswordTextField
                        formLabel={t('password')}
                        errorMsg="Wrong password"
                        className='password-input'
                        id="password"
                        name="password"
                        type="password"
                        placeholder={t('enter-your-password')}
                        onChange={handlePasswordChange}
                    />
                    {errorPassword && <p className='error-message'>{errorPassword}</p>}
                </div>
                <h1 className='forgot-password' onClick={goToForgotPassword}>{t('forgot-password')}</h1>

                <div className='auth-button-container'>
                    {isButtonActive ?
                        <ButtonColored
                            label={t('sign-in')}
                            type="submit"
                            className="sign-in-btn-block"
                        />
                        :
                        <ButtonColored
                            className="sign-in-disabled"
                            label={t('sign-in')}
                            disabled
                        />}
                </div>
            </form>
        </div>
    );
}
