import React, { useState, useEffect } from 'react';
import './App.css';

// --- SUB-COMPONENTS ---

const Home = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "https://picsum.photos/id/10/1200/400", "https://picsum.photos/id/20/1200/400",
    "https://picsum.photos/id/30/1200/400", "https://picsum.photos/id/40/1200/400",
    "https://picsum.photos/id/50/1200/400", "https://picsum.photos/id/60/1200/400",
    "https://picsum.photos/id/70/1200/400", "https://picsum.photos/id/80/1200/400",
    "https://picsum.photos/id/90/1200/400", "https://picsum.photos/id/100/1200/400"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="slider-container">
      <img src={images[index]} alt="Slide" className="slide-img" />
      <div style={{textAlign: 'center', marginTop: '10px'}}>Image {index + 1} of 10</div>
    </div>
  );
};

const Portfolio = () => {
  const categories = ["Pre-wedding", "Wedding", "Engagement", "Baby Shower","Birthday","Product Shoot","Catelog"];
  const [active, setActive] = useState("Wedding");
  return (
    <div>
      <h2>Our Portfolio</h2>
      <div className="portfolio-tabs">
        {categories.map(cat => (
          <button key={cat} className={`tab-btn ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <p>Showing amazing shots from our <strong>{active}</strong> sessions.</p>
    </div>
  );
};

const Gallery = () => (
  <div className="gallery-grid">
    {['📷 Photos', '🎥 Videos', '🎨 Edits', '🚁 Drone'].map(item => (
      <div key={item} className="gallery-item">
        <span className="icon-large">{item.split(' ')[0]}</span>
        {item.split(' ')[1]}
      </div>
    ))}
  </div>
);

const About = () => (
  <div className="content-section">
    <h2>About Us</h2>
    <p>We provide high-end cinematography and photography services worldwide.</p>
    <h3>Tools We Use:</h3>
    <span className="tool-tag">Sony A7R IV</span>
    <span className="tool-tag">Adobe Premiere Pro</span>
    <span className="tool-tag">DJI Mavic 3</span>
    <span className="tool-tag">Lightroom</span>
  </div>
);

const Contact = () => {
  const categories = ["Pre-wedding Shoot", "Wedding", "Engagement", "Baby Shower","Birthday"];
  
  // Get today's date in YYYY-MM-DD format for HTML5 min attribute
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    service: categories[0],
    mobile: '',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.fromDate || formData.fromDate < today) tempErrors.fromDate = "Date cannot be in the past.";
    if (!formData.toDate || formData.toDate < today) tempErrors.toDate = "Date cannot be in the past.";
    if (formData.toDate && formData.fromDate && formData.toDate < formData.fromDate) {
        tempErrors.toDate = "End date cannot be before start date.";
    }
    if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email format is invalid.";
    if (formData.description.length < 10) tempErrors.description = "Please provide more detail (min 10 chars).";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("🎉 Booking Request Sent Successfully!");
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="content-section">
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <h2>Contact & Booking</h2>
        <p>📍 123 Studio Street, Creative City, NY 10001 | 📞 +1 (555) 000-1111</p>
      </div>

      <form className="contact-container" onSubmit={handleSubmit}>
        <div style={{display: 'flex', gap: '15px'}}>
          <div className="form-group" style={{flex: 1}}>
            <label>Event From Date</label>
            <input type="date" name="fromDate" min={today} onChange={handleChange} />
            {errors.fromDate && <span className="error-text">{errors.fromDate}</span>}
          </div>
          <div className="form-group" style={{flex: 1}}>
            <label>Event End Date</label>
            <input type="date" name="toDate" min={today} onChange={handleChange} />
            {errors.toDate && <span className="error-text">{errors.toDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Event Service</label>
          <select name="service" onChange={handleChange}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" name="mobile" placeholder="10 Digit Mobile" onChange={handleChange} />
          {errors.mobile && <span className="error-text">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Email ID</label>
          <input type="email" name="email" placeholder="example@mail.com" onChange={handleChange} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" rows="4" placeholder="Tell us about your event..." onChange={handleChange}></textarea>
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <button type="submit" className="submit-btn">Send Booking Request</button>
      </form>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState('Home');

  const renderView = () => {
    switch(view) {
      case 'Home': return <Home />;
      case 'Portfolio': return <Portfolio />;
      case 'Gallery': return <Gallery />;
      case 'About Us': return <About />;
      case 'Contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="brand-logo" onClick={() => setView('Home')}>MB-Studio</div>
        <ul className="nav-links">
          {['Home', 'Portfolio', 'Gallery', 'About Us', 'Contact'].map(item => (
            <li key={item} onClick={() => setView(item)} style={{fontWeight: view === item ? 'bold' : 'normal'}}>
              {item}
            </li>
          ))}
        </ul>
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button className="search-icon">🔍</button>
        </div>
      </nav>

      <main className="body-container">
        {renderView()}
        <button className="floating-btn" onClick={() => setView('Contact')}>Book Now</button>
      </main>

      <footer className="footer">
        <p>&copy; 2026 MB-Studio. All Rights Reserved.</p>
      </footer>
    </div>
  );
}