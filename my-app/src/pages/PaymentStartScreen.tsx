import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentStartScreen.css';
import SettingBar from './header/Settingbar';

interface PaymentStartProps {}

const PaymentStartScreen: React.FC<PaymentStartProps> = () => {
    const navigate = useNavigate();

    const handleSelfRegister = () => {
        navigate('/:restaurantId/table-number');
    };

    const handleInPerson = () => {
        navigate('/:restaurantId/please-wait');
    };

    return (
        <div className="payment-start-container">
            <SettingBar />
            <h1 className="title">お会計</h1>
            <div className="buttons-container">
                <button className="payment-button" onClick={handleSelfRegister}>
                    セルフ会計 (現金不可)
                </button>
                <button className="payment-button" onClick={handleInPerson}>
                    店員呼び出し (現金可)
                </button>
            </div>
        </div>
    );
}

export default PaymentStartScreen;
