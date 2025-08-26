
import React, { useEffect, useState } from 'react';
import './Campaign.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/";


const CampaignSection = () => {

    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true); 


    const getFetchedData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/users");
            if (response.data.success) {
                setDataList(response.data.users); 
                console.log('Datalist abcd:', dataList); 
            } 
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFetchedData();
    }, []);

    
    return (
        <>
            <Header />
            <div className="campaign-section">
                <div className="campaign-content">
                    <div className="campaign-text">
                        <h2>Join Our Campaign!</h2>
                        <p>Support our cause and make a difference in the community. Your donations will help us achieve our goals and provide necessary resources.</p>
                        <img src="https://images.pexels.com/photos/6591164/pexels-photo-6591164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Campaign Image 1" />
                        <img src="https://images.pexels.com/photos/6646903/pexels-photo-6646903.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Campaign Image 2" />

                        {/* Additional text paragraphs */}
                        <h2>Our Mission</h2>
                        <p>Our website aims to connect generous individuals with those in need by facilitating donations and support. We are dedicated to creating a positive impact through various donation channels, including money, clothes, electronics, and other essentials.</p>
                        
                        <div className="about-section">
                            <h2>What We Offer</h2>
                            <p>We provide a platform for users to donate not only money but also educational materials, food, and shelter. Our interactive map helps users find local charities and shelters, and our calendar keeps everyone informed about upcoming events and initiatives.</p>
                        </div>
                        
                        <div className="about-section">
                            <h2>How to Donate</h2>
                            <p>Donating is easy and secure through our website. You can choose to donate money via our secure payment system, or contribute physical items such as clothes, electronics, and more. Each donation helps us achieve our goal of providing essential support to underprivileged communities.</p>
                            <p>For detailed donation options, visit our <a href="">Donate</a> page.</p>
                        </div>
                        
                        <div className="about-section">
                            <h2>Our Impact</h2>
                            <p>With your support, we have been able to make a significant difference in the lives of many individuals and families. From providing essential resources to organizing community events, every contribution helps us work towards a better future for those in need.</p>
                        </div>
                    </div>

                    <div className="campaign-side">
                        {/* <div className="progress-container">
                            <div className="progress-info">
                                <h3>Progress</h3>
                                <p className="progress-percentage">{progressPercentage.toFixed(0)}%</p>
                            </div>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <p className="progress-date">{new Date().toLocaleDateString()}</p>
                            <button className="donate-button" >Donate Now</button>
                        </div> */}

                        <div className="campaign-side">
                            <div className="donation-list-container">
                                <h4>Anonymous Donations:</h4>
                                <div className="donation-list">
                                    {dataList.length > 0 ? (
                                        dataList.map((donation, index) => (
                                            <div className="donation-item" key={index}>
                                                <span>{"Anonymous"} - {donation.donation_type}</span>
                                                <span className="donation-date">{donation.created_at}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No donations available at this time.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
        </>
    );
};

export default CampaignSection;
