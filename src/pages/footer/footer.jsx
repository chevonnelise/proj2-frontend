import React from 'react'
import './styles.css'
import footer from '../../assets/footer.png';
import instagram_icon from '../../assets/instagram_icon.png';
import pinterest_icon from '../../assets/pinterest_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';

export const Footer = () => {

  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer} alt=""/>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            {/* <li>Shop</li> */}
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pinterest_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All rights reserved.</p>
        </div>
    </div>
  )
}