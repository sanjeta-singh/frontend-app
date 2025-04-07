import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={styles.footer}>
      <div style={styles.wave}></div>
      
      <div style={styles.container}>
        <h3 style={styles.heading}>
          <span style={styles.copyrightText}>© {currentYear} Canvas of Care.</span> <span style={styles.reservedText}>All Rights Reserved</span>
        </h3>
        
        <div style={styles.linksContainer}>
          <Link to="/privacy-policy" style={styles.link}>
            <span style={styles.linkText}>Privacy Policy</span>
          </Link>
          
          <div style={styles.divider}>|</div>
          
          <Link to="/contact-us" style={styles.link}>
            <span style={styles.linkText}>Contact Us</span>
          </Link>
          
          <div style={styles.divider}>|</div>
          
          <Link to="/about-us" style={styles.link}>
            <span style={styles.linkText}>About Us</span>
          </Link>
        </div>
        
        <p style={styles.madeWith}>
          Crafted with <span style={styles.heartIcon}>♥</span> for you
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'relative',
    background: 'linear-gradient(135deg, #f3e5ff 0%, #e2c3ff 50%, #d8b4ff 100%)',
    color: '#5a3d7a',
    padding: '50px 0 5px',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 -5px 20px rgba(0,0,0,0.05)',
    borderTop: '1px solid rgba(255,255,255,0.3)'
  },
  wave: {
    position: 'absolute',
    top: '-15px',
    left: '0',
    width: '100%',
    height: '50px',
    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23ffffff\' fill-opacity=\'0.3\' d=\'M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z\'%3E%3C/path%3E%3C/svg%3E")',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: '2',
  },
  heading: {
    fontSize: 'clamp(18px, 2vw, 24px)',
    fontWeight: '600',
    marginBottom: '25px',
    textAlign: 'center',
  },
  copyrightText: {
    color: '#5a3d7a',
    WebkitTextFillColor: '#5a3d7a',
    fontWeight: '600',
  },
  reservedText: {
    color: '#5a3d7a',
    WebkitTextFillColor: '#5a3d7a',
    fontWeight: '600',
  },
  linksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px',
  },
  link: {
    color: '#5e35b1',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      background: 'rgba(255,255,255,0.3)',
    }
  },
  linkText: {
    position: 'relative',
    zIndex: '2',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  },
  divider: {
    color: 'rgba(90, 61, 122, 0.3)',
    fontSize: '18px',
  },
  madeWith: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    color: '#7e57c2',
  },
  heartIcon: {
    color: '#d81b60',
    margin: '0 5px',
    fontSize: '14px',
  },
};
export default Footer;
