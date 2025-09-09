import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import './DonationList.css';

axios.defaults.baseURL = "http://localhost:5000/";

const DonationsList = () => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(''); // <-- error state for fetch failures
    const [donationType, setDonationType] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', mobile: '', address: '', amount: '', donationType: '', details: ''
    });
    const [formdataedit, setFormDataEdit] = useState({
        firstName: "", lastName: "", email: "", mobile: "", _id: ""
    });

    useEffect(() => {
        getFetchedData();
    }, []);

    const getFetchedData = async () => {
        try {
            setLoading(true);
            setErrorMsg('');                // clear previous errors
            const response = await axios.get("/users");
            // If API uses response.data.success convention:
            if (response.data && response.data.success) {
                setDataList(response.data.users || []);
            } else if (response.data && Array.isArray(response.data)) {
                // in case API returns array directly
                setDataList(response.data);
            } else {
                // Unexpected response shape but treat as empty
                setDataList([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Put a user-friendly error message inside the table instead of alert
            const serverMsg = error?.response?.data?.message || error.message || 'Unable to fetch donations';
            setErrorMsg(`Can't get data right now. ${serverMsg}`);
            setDataList([]); // ensure table renders with error row
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/donate", formData);
            if (response.data.success) {
                // nice UX: show in-page success (you can set a success banner state if needed)
                getFetchedData();
                handleCancelClick();
            } else {
                // don't alert — you might prefer to show inline error in future
                console.warn('Submit response not successful', response.data);
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
            // keep UX quiet; you could set a local error state to show form-level error
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/delete/${id}`);
            if (response.data.success) {
                getFetchedData();
            } else {
                console.warn('Delete failed', response.data);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            // show inline error banner or console; no alert popup
            setErrorMsg(`Delete failed: ${error?.response?.data?.message || error.message}`);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/update", formdataedit);
            if (response.data.success) {
                getFetchedData();
                setEditSection(false);
            } else {
                console.warn('Update not successful', response.data);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setErrorMsg(`Update failed: ${error?.response?.data?.message || error.message}`);
        }
    };

    const handleEditChange = (e) => {
        const { value, name } = e.target;
        setFormDataEdit((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (donation) => {
        setFormDataEdit(donation);
        setEditSection(true);
    };

    const handleCancelClick = () => {
        setShowForm(false);
        setDonationType(null);
        setFormData({ name: '', email: '', mobile: '', address: '', amount: '', donationType: '', details: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="donations-list">
            <Header />
            <div className="donation-intro">
                <h2>Support Our Mission</h2>
                <p>Your contributions make a significant difference in the lives of those in need.</p>
            </div>

            {editSection ? (
                <form onSubmit={handleUpdate} className="donation-form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formdataedit.name || ''} onChange={handleEditChange} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={formdataedit.email || ''} onChange={handleEditChange} />
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="mobile" name="mobile" required value={formdataedit.mobile || ''} onChange={handleEditChange} />
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formdataedit.address || ''} onChange={handleEditChange} />
                
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setEditSection(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <h1>Donations List</h1>
            )}

            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <div className="table-wrapper">
                  <table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Mobile</th>
                              <th>Address</th>
                              <th>Amount</th>
                              <th>Donation Type</th>
                              <th>Progress</th>
                              <th>Edit</th>
                              <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody>
                        {/* If there was an error fetching, display a single row with the error (no popups) */}
                        {errorMsg ? (
                          <tr className="error-row">
                            <td colSpan="9" role="alert">
                              {errorMsg}
                            </td>
                          </tr>
                        ) : dataList.length === 0 ? (
                          <tr>
                            <td colSpan="9" className="empty-row">No donations available.</td>
                          </tr>
                        ) : (
                          dataList.map((donation) => (
                              <tr key={donation._id}>
                                  <td>{donation.name}</td>
                                  <td>{donation.email}</td>
                                  <td>{donation.mobile}</td>
                                  <td>{donation.address || 'N/A'}</td>
                                  <td>{donation.amount || 'N/A'}</td>
                                  <td>{donation.donationType || 'N/A'}</td>
                                  <td>In Progress</td>
                                  <td><button onClick={() => handleEdit(donation)}>Edit</button></td>
                                  <td><button onClick={() => handleDelete(donation._id)}>Delete</button></td>
                              </tr>
                          ))
                        )}
                      </tbody>
                  </table>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default DonationsList;
