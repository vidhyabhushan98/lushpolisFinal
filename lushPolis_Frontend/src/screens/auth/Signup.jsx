import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './login.css';
import logopic from '../../assets/images/logo.png';
import girl from '../../assets/images/girl.svg'
import potimage from '../../assets/images/pot.svg'
import plant from '../../assets/images/plant.svg'
import baseUrl from '../../api/serverAPI';

function Signup() { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setrePassword] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        setLoading(true);
        if(password !== rePassword){
            setLoading(false);
            alert("Passwords do not match");
            return;
        }
        e.preventDefault();
        axios.post(`${baseUrl}/register`, {name, email, password})
        .then(res => {console.log(res)
        navigate('/login')
        setLoading(false);
        })
        .catch(err =>{
            setLoading(false);
            console.log(err)
        });
    }
    useEffect(() => {
        if (isLoggedIn) {
          alert('You are already logged in. Please logout to login from a different account.');
          window.location.href = '/';
        }
    }, [isLoggedIn]);

    if(isLoggedIn){
        return null;
    }

    return (
        <>
        <div>
        <div className="container-fluid AuthPage_loginPage__t4kBX">
        <img className="AuthPage_logo__xzyl_" src={logopic} width="120px" height="40px" />
        <form className="SignupForm_login__AGi42" >
            <h1 className="LoginForm_heading__ZCsj3">Sign up</h1>
           
            <div className="LoginForm_login__7MdLc" style={{paddingLeft:'5rem'}}>
                <div className="LoginForm_emailContainer__17IOQ" >
                        <div className="LoginForm_emailPlaceholder__pdVWQ" >Email</div>
                        <input type='text' placeholder="Enter Email" name="email" className= "form-control LoginForm_email__OFBOC LoginForm_field__3TllL false" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="LoginForm_passContainer__FWDfD">
                        <div className="LoginForm_passPlaceholder__3pGxO" >Name</div>
                        <input type='text' placeholder="Enter Name"  name="title" className= "form-control LoginForm_password__3Cv5F LoginForm_field__3TllL " onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="LoginForm_passContainer__FWDfD">
                        <div className="LoginForm_passPlaceholder__3pGxO">Password</div>
                        <input type='password' placeholder="Enter Password" name="password" className= "form-control LoginForm_password__3Cv5F LoginForm_field__3TllL " onChange={(e) => setPassword(e.target.value)}/>
                        
                    </div>
                    <div className="LoginForm_passContainer__FWDfD">
                        <div className="LoginForm_passPlaceholder__3pGxO">Confirm Password</div>
                        <input type='password' placeholder="Re-Enter Password" name="repassword" className= "form-control LoginForm_password__3Cv5F LoginForm_field__3TllL " onChange={(e) => setrePassword(e.target.value)}/>
                        
                    </div>
            </div>

            {isLoading ?
                <button className="LoginForm_signIn__loOpD" type="submit" onClick={handleSubmit} disabled>
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </button>
                :
                <button className="LoginForm_signIn__loOpD" type="submit" onClick={handleSubmit} >Sign up</button>
            }
            {/* <button className="LoginForm_signIn__loOpD" type="submit" onClick={handleSubmit} >Sign up</button> */}
            <div className="SignupForm_signIn__s2GgU">
                <p className="SignupForm_signInTxt__ObFL8">Already have an account?<a href="/login"><div className="LoginForm_signupLink__ULpIj">Login</div>
                </a>
            </p>
        </div>
    </form>
        <img className="AuthPage_girl__RKM9T" src={girl}/>
        <img className="AuthPage_pot__hhXsI" src={potimage}/>
        <img className="AuthPage_plant__4bP1x" src={plant}/>
    </div>
    </div>
    </>
    );
}

export default Signup;