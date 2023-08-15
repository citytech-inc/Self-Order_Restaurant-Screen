import React from 'react';
import { Link } from 'react-router-dom';

const SettingBar: React.FC = () => {
    return (
        <div className="settings-bar">
            <Link to="/add-menu">Settings</Link>
        </div>
    );
}

export default SettingBar;
