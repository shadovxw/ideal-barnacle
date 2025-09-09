import React, { useEffect, useState } from "react";
import "./Donate.css";
import axios from "axios";
import Gpay from "../payment/Gpay";

/*
  Notes:
  - API base is NOT forced here. Configure axios.defaults.baseURL
    centrally in your app start-up (or uncomment the line below and
    set to your API root).
*/
// axios.defaults.baseURL = "http://localhost:5000"; // set globally elsewhere

const Donate = ({ id }) => {
  const [donationType, setDonationType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [posting, setPosting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // success or error message

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    amount: "",
    donation_type: "",
    details: "",
  });

  useEffect(() => {
    // small animation class: add visible class after mount
    const frames = document.querySelectorAll(".donation-frame");
    frames.forEach((f, i) => {
      setTimeout(() => f.classList.add("visible"), 120 * (i + 1));
    });
  }, []);

  const openForm = (type) => {
    setDonationType(type);
    setFormData((prev) => ({ ...prev, donation_type: type }));
    setStatusMessage(null);
    setShowForm(true);

    // scroll into view (good UX on mobile)
    setTimeout(() => {
      const el = document.querySelector(".donation-form");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 160);
  };

  const closeForm = () => {
    setShowForm(false);
    setDonationType(null);
    setFormData({
      name: "",
      email: "",
      mobile: "",
      address: "",
      amount: "",
      donation_type: "",
      details: "",
    });
    setStatusMessage(null);
    setPosting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    // basic validation
    if (!formData.email) return "Please provide an email.";
    if (!formData.mobile) return "Please provide a mobile number.";
    if (donationType === "money") {
      const v = Number(formData.amount);
      if (!formData.amount || !isFinite(v) || v <= 0) return "Please enter a valid donation amount.";
    } else {
      if (!formData.details || formData.details.trim().length < 3) return `Please enter ${donationType} details.`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const err = validate();
    if (err) {
      setStatusMessage({ type: "error", text: err });
      return;
    }

    try {
      setPosting(true);
      // adapt payload to your backend schema
      const payload = {
        name: formData.name || (formData.name === "" ? "Anonymous" : formData.name),
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        amount: donationType === "money" ? Number(formData.amount) : undefined,
        donation_type: donationType,
        details: donationType === "money" ? "" : formData.details,
      };

      // If you set axios.defaults.baseURL elsewhere this will use it.
      const res = await axios.post("/create", payload);

      // handle various response shapes defensively
      if (res?.data?.success) {
        setStatusMessage({ type: "success", text: res.data.message || "Donation submitted. Thank you!" });
        // reset but keep form open for payment component if money
        setFormData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          amount: "",
          donation_type: "",
          details: "",
        });
        // close after a moment
        setTimeout(closeForm, 1200);
      } else {
        const msg = res?.data?.message || "Failed to submit donation.";
        setStatusMessage({ type: "error", text: msg });
      }
    } catch (error) {
      console.error("Donate submit error", error);
      const msg = error?.response?.data?.message || error.message || "Network error";
      setStatusMessage({ type: "error", text: `Submission failed: ${msg}` });
    } finally {
      setPosting(false);
    }
  };

  return (
    <section id={id} className="donate-section" aria-labelledby="donate-heading">
      <h1 id="donate-heading" className="donate-title">Choose Your Donation Type</h1>
      <p className="donation-intro">Your generosity can make a significant impact in the lives of those in need.</p>

      <div className="donation-container" role="list">
        <article className="donation-frame" role="listitem" aria-label="Donate Food">
          <h2>Donate Food</h2>
          <p>Help combat hunger by donating non-perishable food items to support local shelters.</p>
          <button className="donation-button" onClick={() => openForm("food")}>Donate Now</button>
        </article>

        <article className="donation-frame" role="listitem" aria-label="Donate Clothes">
          <h2>Donate Clothes</h2>
          <p>Contribute clothes to help those in need with essential attire and support their well-being.</p>
          <button className="donation-button" onClick={() => openForm("clothes")}>Donate Now</button>
        </article>

        <article className="donation-frame" role="listitem" aria-label="Donate Electronics">
          <h2>Donate Electronics</h2>
          <p>Your unused electronics can help equip schools and families in need with essential tools.</p>
          <button className="donation-button" onClick={() => openForm("electronics")}>Donate Now</button>
        </article>

        <article className="donation-frame" role="listitem" aria-label="Donate Money">
          <h2>Donate Money</h2>
          <p>Your financial contribution can support various programs and help us reach our goal.</p>
          <button className="donation-button" onClick={() => openForm("money")}>Donate Now</button>
        </article>
      </div>

      {/* Inline form area */}
      {showForm && (
        <div className="donation-form" aria-live="polite">
          <button className="cancel-button" onClick={closeForm} aria-label="Cancel donation form">✕ Cancel</button>
          <h2>{`Donate ${donationType ? donationType.charAt(0).toUpperCase() + donationType.slice(1) : ""}`}</h2>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="d_name">Name (or leave blank for Anonymous)</label>
            <input id="d_name" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />

            <label htmlFor="d_email">Email *</label>
            <input id="d_email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />

            <label htmlFor="d_mobile">Mobile *</label>
            <input id="d_mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} placeholder="+1 555 555 5555" />

            <label htmlFor="d_address">Address</label>
            <input id="d_address" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, State" />

            {donationType === "money" ? (
              <>
                <label htmlFor="d_amount">Donation Amount *</label>
                <input id="d_amount" name="amount" type="number" min="1" required value={formData.amount} onChange={handleChange} placeholder="Amount" />
              </>
            ) : (
              <>
                <label htmlFor="d_details">{`${donationType ? donationType.charAt(0).toUpperCase() + donationType.slice(1) : "Donation"} Details *`}</label>
                <textarea id="d_details" name="details" rows="3" required value={formData.details} onChange={handleChange} placeholder="What items / details?" />
              </>
            )}

            <div className="form-actions">
              <button className="donation-button" type="submit" disabled={posting}>
                {posting ? "Submitting…" : "Submit Donation"}
              </button>
              <button type="button" className="donation-button outline" onClick={closeForm} disabled={posting}>
                Cancel
              </button>
            </div>

            {statusMessage && (
              <div className={`form-status ${statusMessage.type === "error" ? "error" : "success"}`} role="status">
                {statusMessage.text}
              </div>
            )}
          </form>

          {/* Payment integration shown for money donations */}
          {donationType === "money" && (
            <div className="payment-area" aria-hidden={posting ? "true" : "false"}>
              <Gpay />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Donate;
