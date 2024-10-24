import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [submissions, setSubmissions] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/submit", {
                name,
                contact,
                email,
            });

            alert("Submitted Successfully: " + JSON.stringify(response.data));
            fetchSubmissions();
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed. Please try again.");
        }
    };

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/submissions");
            setSubmissions(response.data);
        } catch (error) {
            console.error("Fetching submissions error:", error);
            alert("Failed to fetch submissions. Please try again.");
        }
    };

    const clearForm = () => {
        setName("");
        setContact("");
        setEmail("");
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div>
            <h1>Contact Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={clearForm}>Cancel</button>
            </form>
            <h2>Previous Submissions</h2>
            <ul>
                {submissions.map((submission, index) => (
                    <li key={index}>
                        {submission.name} - {submission.contact} - {submission.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactForm;
