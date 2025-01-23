import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiAlert, mdiLaptop, mdiCellphone } from '@mdi/js';
import './index.css';
import { useNavigate } from 'react-router';
import { MobileSettingsContext } from '../components/settings_provider/mobile_settings_provider';

const MobileWarningPage: React.FC = () => {
    
  const navigate = useNavigate()
  const context = useContext(MobileSettingsContext)

  return (
    <div className="mobile-warning-container">
      <div className="mobile-warning-content">
        <Icon path={mdiAlert} size={3} color="#eab308" className="warning-icon" />
        
        <h1 className="warning-title">
          Device Compatibility Warning
        </h1>
        
        <p className="warning-description">
            This website is special! It has a few features (like a built in game) that requires a keyboard
            and mouse to be enjoyed. Therefore I recommend that you navigate it with a pc.
            However if you are in a hurry and you need to check it from mobile
            I made a mobile friendly mode that you can enable.
        </p>
        
        <div className="warning-buttons">
          <button 
            className="btn btn-desktop"
            onClick={() => {
              context.setMobileMode(false)
              navigate("/pick_one")
            }}
          >
            <Icon path={mdiLaptop} size={1} />
            Use desktop site
          </button>
          
          <button 
            className="btn btn-mobile"
            onClick={() => {
              context.setMobileMode(true)
              navigate("/blue_pill")
            }}
          >
            <Icon path={mdiCellphone} size={1} />
            Enable mobile mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileWarningPage;
