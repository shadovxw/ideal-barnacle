import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import "./Campaign.css";

axios.defaults.baseURL = "http://localhost:5000/";

const CampaignSection = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [showDonateModal, setShowDonateModal] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postResult, setPostResult] = useState("");

  const [donateForm, setDonateForm] = useState({
    name: "",
    amount: "",
    donation_type: "money",
    anonymous: false,
  });

  const CAMPAIGN_GOAL = 50000;

  const donateButtonRef = useRef(null);
  const modalFirstInputRef = useRef(null);

  useEffect(() => {
    getFetchedData();
    const onKey = (e) => {
      if (e.key === "Escape") setShowDonateModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const getFetchedData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await axios.get("/users");
      if (res?.data?.success && Array.isArray(res.data.users)) {
        setDataList(res.data.users);
      } else if (Array.isArray(res?.data)) {
        setDataList(res.data);
      } else {
        setDataList([]);
      }
    } catch (err) {
      console.error("fetch error", err);
      const server = err?.response?.data?.message || err.message || "Unknown error";
      setErrorMsg(`Can't get data right now. ${server}`);
      setDataList([]);
    } finally {
      setLoading(false);
    }
  };

  const totalDonated = dataList.reduce((acc, d) => {
    const amt = Number(d?.amount || d?.donation_amount || 0);
    return acc + (isFinite(amt) ? amt : 0);
  }, 0);

  const progressPercentage = Math.min(100, Math.round((totalDonated / CAMPAIGN_GOAL) * 100 || 0));

  const formatCurrency = (value) => {
    if (!isFinite(Number(value))) return "-";
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  };

  const openDonateModal = () => {
    setPostResult("");
    setDonateForm({ name: "", amount: "", donation_type: "money", anonymous: false });
    setShowDonateModal(true);
    setTimeout(() => modalFirstInputRef.current?.focus?.(), 50);
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
    donateButtonRef.current?.focus?.();
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonateForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    setPostResult("");
    const amount = Number(donateForm.amount);
    if (!donateForm.amount || !isFinite(amount) || amount <= 0) {
      setPostResult("Please enter a valid amount.");
      return;
    }

    try {
      setPosting(true);
      const payload = {
        name: donateForm.anonymous ? "Anonymous" : donateForm.name || "Anonymous",
        amount: amount,
        donation_type: donateForm.donation_type || "money",
        anonymous: !!donateForm.anonymous,
      };

      const res = await axios.post("/donate", payload);
      if (res?.data?.success) {
        setPostResult("Thank you! Donation recorded.");
        await getFetchedData();
        setTimeout(() => {
          setPosting(false);
          closeDonateModal();
        }, 900);
      } else {
        const server = res?.data?.message || "Server did not accept donation.";
        setPostResult(server);
      }
    } catch (err) {
      console.error("post error", err);
      const server = err?.response?.data?.message || err.message || "Network error";
      setPostResult(`Failed to submit donation. ${server}`);
    } finally {
      setPosting(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return String(d).slice(0, 16);
    return dt.toLocaleDateString() + " " + dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <Header />
      <div className="campaign-section">
        <div className="campaign-content">
          <div className="campaign-text">
            <h2>Join Our Campaign!</h2>
            <p>Support our cause and make a difference in the community. Your donations will help us achieve our goals and provide necessary resources.</p>

            <h2>Our Mission</h2>
            <p>We connect generous individuals with those in need by facilitating donations and support. We accept money, clothes, electronics and essentials.</p>

            <div className="about-section">
              <h2>What We Offer</h2>
              <p>We provide a platform to donate money and physical items. Our interactive tools and events help coordinate support locally.</p>
            </div>

            <div className="about-section">
              <h2>How to Donate</h2>
              <p>Click <strong>Donate Now</strong> to submit a donation. You can remain anonymous if you prefer — every contribution counts.</p>
              <p>Current goal: <strong>{formatCurrency(CAMPAIGN_GOAL)}</strong></p>
            </div>

            <div className="about-section">
              <h2>Our Impact</h2>
              <p>With your support we've been able to reach many families. Track the campaign progress on the right panel.</p>
            </div>
          </div>

          <div className="campaign-side">
            <div className="progress-container" aria-hidden={loading}>
              <div className="progress-info">
                <h3>Progress</h3>
                <p className="progress-percentage">{progressPercentage}%</p>
              </div>

              <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progressPercentage}>
                <div className="progress" style={{ width: `${progressPercentage}%` }} />
              </div>

              <p className="progress-date">Updated: {new Date().toLocaleDateString()}</p>

              <button
                ref={donateButtonRef}
                className="donate-button"
                onClick={openDonateModal}
                aria-haspopup="dialog"
              >
                Donate Now
              </button>

              <div className="campaign-stats">
                <div>Total donated: <strong>{formatCurrency(totalDonated)}</strong></div>
                <div className="goal-text">Goal: {formatCurrency(CAMPAIGN_GOAL)}</div>
              </div>
            </div>

            <div className="donation-list-container" aria-live="polite">
              <h4>Anonymous Donations:</h4>

              {loading ? (
                <div className="donation-list"><p className="dl-center">Loading donations…</p></div>
              ) : errorMsg ? (
                <div className="donation-list">
                  <p className="dl-error">{errorMsg}</p>
                  <div className="dl-retry">
                    <button className="donate-button small" onClick={getFetchedData}>Retry</button>
                  </div>
                </div>
              ) : dataList && dataList.length > 0 ? (
                <div className="donation-list" role="list">
                  {dataList.map((donation, idx) => (
                    <div className="donation-item" key={donation._id || idx} role="listitem">
                      <span>{donation.name || "Anonymous"} - {donation.donation_type || donation.donationType || "N/A"}</span>
                      <span className="donation-date">{formatDate(donation.created_at || donation.createdAt || donation.date)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="donation-list">
                  <p className="dl-center">No donations available at this time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showDonateModal && (
        <div
          className="campaign-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="donate-modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) closeDonateModal(); }}
        >
          <div className="donate-modal" role="document">
            <h3 id="donate-modal-title">Donate to Campaign</h3>

            <form onSubmit={handleDonateSubmit}>
              <label className="modal-label">Name</label>
              <input
                ref={modalFirstInputRef}
                name="name"
                value={donateForm.name}
                onChange={handleFormChange}
                placeholder="Your name (or leave blank for Anonymous)"
                className="modal-input"
                disabled={posting}
              />

              <label className="modal-label">Amount</label>
              <input
                name="amount"
                value={donateForm.amount}
                onChange={handleFormChange}
                placeholder="Enter amount (numbers only)"
                inputMode="numeric"
                className="modal-input"
                disabled={posting}
                required
              />

              <label className="modal-label">Donation Type</label>
              <select
                name="donation_type"
                value={donateForm.donation_type}
                onChange={handleFormChange}
                className="modal-input"
                disabled={posting}
              >
                <option value="money">Money</option>
                <option value="clothes">Clothes</option>
                <option value="electronics">Electronics</option>
                <option value="other">Other</option>
              </select>

              <label className="modal-checkbox">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={donateForm.anonymous}
                  onChange={handleFormChange}
                  disabled={posting}
                />
                <span>Donate anonymously</span>
              </label>

              <div className="modal-actions">
                <button type="button" className="modal-btn cancel" onClick={closeDonateModal} disabled={posting}>Cancel</button>
                <button type="submit" className="modal-btn submit" disabled={posting}>{posting ? "Submitting…" : "Donate"}</button>
              </div>

              {postResult && <div className={`modal-result ${postResult.toLowerCase().includes("thank") ? "success" : "error"}`}>{postResult}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignSection;
