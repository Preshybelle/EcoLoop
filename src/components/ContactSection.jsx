function ContactSection() {
  return (
    <section className="section contact-section">
      <div className="contact-inner">
        <div className="contact-form-wrap">
          <h2 className="contact-form-title">Say Hi!</h2>
          <p className="contact-form-sub">We'd love to hear from you.</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Your Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Your Email
              <input type="email" name="email" placeholder="your@email.com" />
            </label>
            <label>
              I'm looking for
              <input type="text" name="looking" placeholder="e.g. E-waste recycling" />
            </label>
            <label>
              Your Message
              <textarea name="message" rows={4} placeholder="Your message" />
            </label>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div className="contact-info-wrap">
          <h2 className="contact-info-title">Contact Information</h2>
          <p className="contact-info-desc">
            Reach out for partnerships, waste pickup, or general inquiries. We're here to help.
          </p>
          <div className="contact-details">
            <p className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">📍</span>
              123 Main Street, New York, NY
            </p>
            <p className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">📞</span>
              +1 (555) 123-4567
            </p>
            <p className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">✉</span>
              info@ecoloop.com
            </p>
          </div>
          <div className="contact-socials">
            <a href="#facebook" aria-label="Facebook">f</a>
            <a href="#twitter" aria-label="Twitter">𝕏</a>
            <a href="#instagram" aria-label="Instagram">📷</a>
            <a href="#linkedin" aria-label="LinkedIn">in</a>
            <a href="#youtube" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
