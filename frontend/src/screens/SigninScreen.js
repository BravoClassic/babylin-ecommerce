import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function SigninScreen () {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Signin');
    }
        return (
            <div>   
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Sign In</button>
                    </div>
                    <div>
                        <p>Don't have an account? <Link to="/register" >Create Account</Link></p>
                    </div>
                    </form>
            </div>

        );
    }