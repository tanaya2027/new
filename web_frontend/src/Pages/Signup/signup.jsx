import React, { useState } from "react";
import "./signup.css";
import { assets } from "../../assets/assets";

function Signup() {
    const [userType, setUserType] = useState("donor");

    return (
        <div className="signup-container">
            {/* Left Side - Image */}
            <div className="signup-image">
                <img src={assets.signup_login} alt="Sign-up" />
            </div>

            {/* Signup Form */}
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form>

                    {/* User Details */}
                    <input type="text" placeholder="Username" required />
                    <input type="email" placeholder="Email Address" required />
                    <input type="tel" placeholder="Phone Number" required />

                    {/* Profile Photo Upload */}
                    <label>Upload Profile Photo:</label>
                    <input type="file" accept="image/*" required />

                    {/* User Type Selection */}
                    <div className="user-type">
                        <label>
                            <input 
                                type="radio" 
                                name="userType" 
                                value="donor" 
                                checked={userType === "donor"} 
                                onChange={() => setUserType("donor")} 
                            />
                            Donor
                        </label>

                        <label>
                            <input 
                                type="radio" 
                                name="userType" 
                                value="recipient" 
                                checked={userType === "recipient"} 
                                onChange={() => setUserType("recipient")} 
                            />
                            Recipient
                        </label>

                        <label>
                            <input 
                                type="radio" 
                                name="userType" 
                                value="volunteer" 
                                checked={userType === "volunteer"} 
                                onChange={() => setUserType("volunteer")} 
                            />
                            Volunteer
                        </label>
                    </div>

                    {/* Organization Name (For Volunteers & Organizations) */}
                    {(userType === "volunteer" || userType === "organization") && (
                        <input type="text" placeholder="Organization Name" required />
                    )}

                    {/* Aadhar/Voter/PAN Card Upload */}
                    <label>Upload Aadhar/Voter/PAN Card:</label>
                    <input type="file" accept=".jpg, .jpeg, .png, .pdf" required />

                    {/* Skills (For Volunteers) */}
                    {userType === "volunteer" && (
                        <textarea placeholder="Enter your skills (e.g., delivery,communication)" required />
                    )}

                    {/* Description */}
                    <textarea placeholder="Tell us about yourself" required />

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
