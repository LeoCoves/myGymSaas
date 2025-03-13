import React from 'react';
import { useState } from 'react';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = {
            username,
            password
        };

        try{
            const response = await fetch('https://localhost:7216/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if(response.ok){
                history.push('/login');
            }
            else{
                console.error(data.message);
            }
        }
        catch(error){
            console.error('Error:', error);
        }
    }


    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                />
                
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;