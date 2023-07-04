import React from 'react';
import './PaymentStartScreen.css';

interface PaymentStartProps {}

const PaymentStartScreen: React.FC<PaymentStartProps> = () => {
    const handleSelfRegister = () => {
        console.log("Self-register button clicked");
        // implement your functionality here
    };

    const handleInPerson = () => {
        console.log("In-person button clicked");
        // implement your functionality here
    };

    return (
        <div className="payment-start-container">
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
