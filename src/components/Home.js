import React from "react";
import Notes from './Notes'; // Import the Notes component

const Home = ({ showAlert }) => { // Receive showAlert as a prop
    return (
        <div>
            <Notes showAlert={showAlert} /> {/* Pass showAlert to Notes */}
        </div>
    );
};

export default Home;
