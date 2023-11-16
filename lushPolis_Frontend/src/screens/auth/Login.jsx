import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {login} from '../../auth/auth';
import {useNavigate} from 'react-router-dom';
import {AppContext} from '../context/appContext';
import './login.css';
import logopic from '../../assets/images/logo.png';
import girlimg from '../../assets/images/girl.svg';
import plantimg from '../../assets/images/plant.svg';
import potimg from '../../assets/images/pot.svg';
import baseUrl from '../../api/serverAPI';


function Login(){
    const [email, setEmail] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {socket} = useContext(AppContext);

    const isLoggedIn = localStorage.getItem('user');
    let validToken = false;
    const verifyToken = async() => {
        const token = localStorage.getItem('token');
        if(token){
            const res = await axios.post(`${baseUrl}/verifyToken`, {token});
            if(res.data.error){
                console.log(res.data.message);
            }
            else{
                console.log(res.data.message);
                validToken = true;
            }
        }
    }

    useEffect(() => {
        verifyToken();
        if (isLoggedIn) {
          alert('You are already logged in. Please logout to login from a different account.');
          window.location.href = '/';
        }
    },[]);

    if(isLoggedIn){
        return null;
    }
    
    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(`${baseUrl}/login`, {email, password})
        .then((res) => {
            console.log("Got user data from auth")
            const data = res.data;
            console.log(data);
            if(data.error){
                setLoading(false);
                alert(data.message);
            }else{
                localStorage.setItem("user", JSON.stringify(data.user));
                setLoading(false);
                login();
            }
        })
        .catch(err => {
            setLoading(false);
            alert(err);
        });
    }

    return (
        <>
            <div className="container-fluid AuthPage_loginPage__t4kBX">
                <img className="AuthPage_logo__xzyl_" src={logopic} alt="Logo" />

                <form className="LoginForm_login__7MdLc" onSubmit={handleSubmit} >
                    <h1 className="LoginForm_heading__ZCsj3">Sign in</h1>
                    <div className="LoginForm_emailContainer__17IOQ">
                        <span className="LoginForm_emailPlaceholder__pdVWQ">Email</span>
                        <input type='text' placeholder="Enter Email"  name="email" className= "form-control LoginForm_email__OFBOC LoginForm_field__3TllL false" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="LoginForm_passContainer__FWDfD">
                        <span className="LoginForm_passPlaceholder__3pGxO">Password</span>
                        <input type='password' placeholder="Enter Password" name="password" className= "form-control LoginForm_password__3Cv5F LoginForm_field__3TllL " onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {isLoading?
                    <button className="LoginForm_signIn__loOpD" type="submit" disabled>
                        <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                    </button>:
                    <button className="LoginForm_signIn__loOpD" type="submit">Sign in</button>
                    }
                    <div className="LoginForm_signup__hooZx">
                        <p className="LoginForm_signUpTxt__uL2le">Don't have an account?</p>
                        <a href="/signup"><span className="LoginForm_signupLink__ULpIj">Sign Up</span></a>
                    </div>
                </form>
                <img className="AuthPage_girl__RKM9T" src={girlimg} alt="Girl" />
                <img className="AuthPage_pot__hhXsI" src={potimg} alt="Pot" />
                <img className="AuthPage_plant__4bP1x" src={plantimg} alt="Plant" />
            </div>
        </>
    );
};
export default Login;