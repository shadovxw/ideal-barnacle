import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import './DonationList.css';

axios.defaults.baseURL = "http://localhost:5000/";

const DonationsList = () => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
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
            const response = await axios.get("/users");
            console.log(response)
            if (response.data.success) {
                setDataList(response.data.users);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/donate", formData);
            if (response.data.success) {
                alert("Donation successfully submitted!");
                getFetchedData();
                handleCancelClick();
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
            alert("Failed to submit donation.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/delete/${id}`);
            if (response.data.success) {
                getFetchedData();
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again later.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/update", formdataedit);
            if (response.data.success) {
                getFetchedData();
                alert(response.data.message);
                setEditSection(false);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update donation. Please try again later.");
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
                    <input type="text" id="name" name="name" value={formdataedit.name} onChange={handleEditChange} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={formdataedit.email} onChange={handleEditChange} />
                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="mobile" name="mobile" required value={formdataedit.mobile} onChange={handleEditChange} />
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formdataedit.address} onChange={handleChange} />
                
                    <button type="submit">Update</button>
                </form>
            ) : (
                <h1>Donations List</h1>
            )}

            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : dataList.length === 0 ? (
                <p>No donations available.</p>
            ) : (
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
                        {dataList.map((donation) => (
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
                        ))}
                    </tbody>
                </table>
            )}
            <Footer />
        </div>
    );
};

export default DonationsList;
