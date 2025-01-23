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
          Some features of our site may not work optimally on mobile devices. 
          We recommend using a desktop or laptop for the full experience.
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
            Continue with Full Site
          </button>
          
          <button 
            className="btn btn-mobile"
            onClick={() => {
              context.setMobileMode(true)
              navigate("/blue_pill")
            }}
          >
            <Icon path={mdiCellphone} size={1} />
            Continue to Mobile Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileWarningPage;
