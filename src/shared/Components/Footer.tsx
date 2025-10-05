import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/Footer.css';

// Footer component that appears at the bottom of every page
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <Link to="/" className="footer-logo">
            <img src="/logo-image.jpg" alt="FanArcs Logo" />
          </Link>
          <p className="footer-tagline">
            FanArcs is your go-to platform for exploring and sharing content across anime, manga, comics, TV, and more. Join our community of passionate fans!
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><span aria-hidden="true">📘</span></a>
            <a href="#" aria-label="Twitter"><span aria-hidden="true">🐦</span></a>
            <a href="#" aria-label="Instagram"><span aria-hidden="true">📷</span></a>
            <a href="#" aria-label="Discord"><span aria-hidden="true">💬</span></a>
          </div>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><span aria-hidden="true">📧</span> contact@fanarcs.com</p>
          <p><span aria-hidden="true">📱</span> (555) 123-4567</p>
          <p><span aria-hidden="true">🏢</span> 123 Fan Street, Anime City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">© 2025 FanArcs. All rights reserved.</p>
        <div className="legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms">Terms of Service</Link>
          <span>|</span>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
      {/* Mobile navigation */}
      <div className="mobile-nav">
        <Link to="/" className="mobile-nav-item" aria-label="Home">
          <span aria-hidden="true">🏠</span>
        </Link>
        <Link to="/community" className="mobile-nav-item" aria-label="Community">
          <span aria-hidden="true">👥</span>
        </Link>
        <Link to="/profile" className="mobile-nav-item" aria-label="Profile">
          <span aria-hidden="true">👤</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
