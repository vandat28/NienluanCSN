import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const user = JSON.parse(userData);
        if (user) {
            navigate('/');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        postData(formData)
    };

    const postData = async (formData) => {
        try {
            const response = await fetch('/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                localStorage.setItem('user', JSON.stringify(data));
                setIsLoggedIn(true)
                navigate('/');
            } else {
                setIsLoggedIn(false)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type='text' name="username" value={formData.username} onChange={handleChange} />
                <input type='text' name="password" value={formData.password} onChange={handleChange} />
                <button type='submit'>Gửi</button>
            </form>
            {isLoggedIn ? <p>Welcome, User!</p> : <p>Please log in.</p>}
        </div>

    );
}