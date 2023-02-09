import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import PersonService from "../../CRUDS/PersonsCRUD";


function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null,
        failureMessage: null
    })
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const [post, setPost] = useState(null);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        (async() => {
            const response = await PersonService.login(state.email,state.password);
            if(response.status === 200){
                setState({email:"", password:"", failureMessage:null, successMessage:"Login successful. Redirecting to main page.."})
                await sleep(1000);
                localStorage.setItem(ACCESS_TOKEN_NAME,response.data.accessToken);
                redirectToHome();
            }
            else if(response.status === 204){
                setState({email:"", password:"", failureMessage:"Incorrect Credentials", successMessage:null})
            }          
          })();
        } 
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/mainpage');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" 
                           className="form-control" 
                           id="email" 
                           aria-describedby="emailHelp" 
                           placeholder="Enter email" 
                           value={state.email}
                           onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                           className="form-control" 
                           id="password" 
                           aria-describedby="passwordHelp" 
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange} 
                    />
                    </div>
                    <div className="form-check">
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >Submit</button>
                </form>
                <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
                <div className="alert alert-danger mt-2" style={{display: state.failureMessage ? 'block' : 'none' }} role="alert">
                    {state.failureMessage}
                </div>
                <div className="registerMessage">
                    <span>Dont have an account? </span>
                    <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
                </div>
            </div>
        )
    }
//}

export default withRouter(LoginForm);