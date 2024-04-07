import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonClear from '../ButtonClear/ButtonClear';

export default function UpgradeAccountButton({ onClick }) {
    const { t } = useTranslation();
    return (
        <div>
            <p className='note'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#424242" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
            </svg> {t('you-have-to-upgrade')}</p>
            <ButtonClear label={t('upgrade-account')} className="upgrade-plan" onClick={onClick} />
        </div>
    );
}