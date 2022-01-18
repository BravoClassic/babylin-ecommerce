import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen (props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo,error,loading} = userSignin;
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    },[userInfo,redirect,props.history]);
        return (
            <div>   
                <form className="form" onSubmit={submitHandler}>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="fail">{error}</MessageBox>}
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
                        <p>Don't have an account? <Link to={`/register?redirect=${redirect}`} >Create Account</Link></p>
                    </div>
                    </form>
            </div>

        );
    }