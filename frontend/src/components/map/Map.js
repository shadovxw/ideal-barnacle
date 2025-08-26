import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapComponent = () => {
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([19.0728, 72.8999], 13); // Set to KJSCE location

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const locations = [
            {
                name: "VY FOUNDATION",
                coords: [19.0728, 72.8999],
                description: "K. J. Somaiya College of Engineering",
            },
            {
                name: "MAITRAYANA CHARITY FOUNDATION",
                coords: [19.07727, 72.89808],
                description: "Maitrayana's vision is to create a gender-equal society in which adolescent girls and women can exercise their rights. ",
            },
            {
                name: "The Bombay East Rotary Charitable Trust",
                coords: [19.09182, 72.89247],
                description: "The Bombay East Rotary Charitable Trust has gained immense expertise in offering Charitable Trusts, Social Welfare Service etc.",
            },
            {
                name: "Umang Foundation Trust",
                coords: [19.08460, 72.85194],
                description: "At Umang we work with less privileged children education, sanitation & hygiene programs for women, Skill development & employability skills, Mental health awareness. ",
            },

        ];

        locations.forEach(location => {
            // Create a marker and bind a popup
            L.marker(location.coords).addTo(map)
                .bindPopup(`
                    <strong>${location.name}</strong><br />
                    ${location.description}<br />
                    <a href="https://www.google.com/maps/search/?api=1&query=${location.coords[0]},${location.coords[1]}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                `);
        });

        
        return () => {
            map.remove(); 
        };
    }, []); 

    return (
        <div>
            <div className="location-info">
                <h1>LOCATIONS</h1>
            </div>

            <div id="map" style={{ height: '500px' }}></div>
        </div>
    );
};

export default MapComponent;
