import React, { useContext } from 'react'
import './styles.css'
import footer from '../../assets/footer.png';
import instagram_icon from '../../assets/instagram_icon.png';
import pinterest_icon from '../../assets/pinterest_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';

export const Footer = () => {
    const { isAuthenticated } = useContext(ShopContext);

    const handleShopClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            alert('Please login to continue shopping.');
        }
    };

    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={footer} alt="" />
            </div>
            <ul className="footer-links">
                <li><Link to="/" style={{ paddingLeft: 13, textDecoration: 'none', color: 'rgb(19, 88, 18)' }} onClick={handleShopClick}>Shop</Link></li>
                <li><Link to="/about" style={{ paddingLeft: 13, textDecoration: 'none', color: 'rgb(19, 88, 18)' }}>About</Link></li>
                <li><Link to="/contact" style={{ paddingLeft: 13, textDecoration: 'none', color: 'rgb(19, 88, 18)' }}>Contact</Link></li>
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