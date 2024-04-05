import React, { useState } from 'react';
import './PaymentSelection.css';
import { Modal } from 'react-bootstrap';
import ButtonColored from '../ButtonColored/ButtonColored';
import { db, auth } from '../../firebase';
import Check from '../../assets/images/check.png';
import Cross from '../../assets/images/cross.png';
import MostPopular from '../../assets/images/popular.png';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
const PaymentSelection = (props) => {
    const { show, handleClose, handleMonthlyPayment, handleYearlyPayment, monthlySubscription } = props;
    const { t } = useTranslation();

    const ManagePlan = () => {
        window.open('https://billing.stripe.com/p/login/cN24habbC4JMga44gg', '_blank');
    }
    return (
        <>

            <Modal dialogClassName='payment-selection-modal' show={show} onHide={handleClose} >
                <Modal.Body dialogClassName='payment-modal-body' >
                    <h1 className='payment-modal-header'>{t('pick-a-plan')} </h1>
                    <h2 className='payment-modal-subheader'>{t('all-plans-are')}</h2>
                    {monthlySubscription == "monthlyPlan" ?
                        (
                            <div className='row justify-content-center'>
                                <div className='col-md-4'>
                                    <div className='regular-card'>
                                        <h1 className='payment-modal-selection-title'>{t('monthly')}</h1>
                                        <div className='amount-per-month'>
                                            <span className='amount'>$5 </span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'>{t('billed-monthly-at')} </h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>{t('monthly-feat-one')}</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>{t('monthly-yearly-feat-two')}</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>{t('removes-made-with')}</h4>
                                        </div>
                                        <div className='button-upgrade-container'>
                                            {monthlySubscription == "monthlyPlan" ?
                                                (<ButtonColored className="btn-current-plan" label={t('current-plan')} />) :
                                                (<ButtonColored className="btn-upgrade-plan" label={t('upgrade-plan')} onClick={handleMonthlyPayment} />)
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='green-card'>
                                        <div className="heading-container">
                                            <h1 className='payment-modal-selection-title'> Yearly</h1>
                                            <img className='most-popular' src={MostPopular} />
                                        </div>

                                        <div className='amount-per-month'>
                                            <span className='amount'>$4 </span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'> Billed at one payment of $48</h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Unlimited projects/websites</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Use custom domains</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Removes 'Made with Figmafolio' label</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Priority technical and product support</h4>
                                        </div>
                                        <div className='button-upgrade-container'>
                                            <ButtonColored className="btn-upgrade-plan" label="Upgrade plan" onClick={handleYearlyPayment} />
                                        </div>

                                    </div>

                                </div>
                            </div>

                        ) : monthlySubscription == "annualPlan" ? (
                            <div className='row justify-content-center'>
                                <div className='col-md-4'>
                                    <div className='regular-card'>
                                        <h1 className='payment-modal-selection-title'> Monthly</h1>
                                        <div className='amount-per-month'>
                                            <span className='amount'>$5 </span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'> Billed monthly at $5 USD </h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>5 projects/websites</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Use custom domains</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Removes 'Made with Figmafolio' label</h4>
                                        </div>
                                        <div className='button-upgrade-container'>
                                            <ButtonColored className="btn-upgrade-plan" label="Change plan" onClick={ManagePlan} />
                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='green-card'>
                                        <div className="heading-container">
                                            <h1 className='payment-modal-selection-title'> Yearly</h1>
                                            <img className='most-popular' src={MostPopular} />
                                        </div>

                                        <div className='amount-per-month'>
                                            <span className='amount'>$4</span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'> Billed as one payment of $48 USD</h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Unlimited projects/websites</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Use custom domains</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Removes 'Made with Figmafolio' label</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Priority technical and product support</h4>
                                        </div>

                                        <div className='button-upgrade-container-2'>
                                            <ButtonColored className="btn-current-plan" label="Current plan" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='regular-card'>
                                        <h1 className='payment-modal-selection-title'> Free</h1>
                                        <div className='amount-per-month'>
                                            <span className='amount'>$0 </span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'> No bills! </h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>1 project/websites</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'> Free Figmafolio domain</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Cross} />
                                            <h4 className='payment-feature-text'>Removes 'Made with Figmafolio' label</h4>
                                        </div>
                                        <div className='button-upgrade-container-2'>
                                            <ButtonColored className="btn-current-plan" label="Current plan" />
                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='regular-card'>
                                        <h1 className='payment-modal-selection-title'> Monthly</h1>
                                        <div className='amount-per-month'>
                                            <span className='amount'>$5 </span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'> Billed monthly at $5 USD </h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>5 projects/websites</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Use custom domains</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Removes 'Made with Figmafolio' label</h4>
                                        </div>
                                        <div className='button-upgrade-container-2'>
                                            {monthlySubscription == "monthlyPlan" ?
                                                (<ButtonColored className="btn-current-plan" label="Current plan" />) :
                                                (<ButtonColored className="btn-upgrade-plan" label="Upgrade plan" onClick={handleMonthlyPayment} />)
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='green-card'>
                                        <div className="heading-container">
                                            <h1 className='payment-modal-selection-title'> Yearly</h1>
                                            <img className='most-popular' src={MostPopular} />
                                        </div>

                                        <div className='amount-per-month'>
                                            <span className='amount'>$4</span>
                                            <span className='month'>/month</span>
                                        </div>
                                        <h4 className='bill-desc'> Billed as one payment of $48 USD</h4>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Unlimited projects/websites</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Use custom domains</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Removes 'Made with Figmafolio' label</h4>
                                        </div>
                                        <div className="payment-feature">
                                            <img className='check-icon' src={Check} />
                                            <h4 className='payment-feature-text'>Priority technical and product support</h4>
                                        </div>

                                        <div className='button-upgrade-container'>
                                            <ButtonColored className="btn-upgrade-plan" label="Upgrade plan" onClick={handleYearlyPayment} />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )}

                </Modal.Body >
            </Modal >
        </>
    );
};

export default PaymentSelection;