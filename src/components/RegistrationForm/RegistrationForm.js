import React, {useState} from 'react';
import './RegistrationForm.css';
import { withRouter } from "react-router-dom";
import PersonService from "../../CRUDS/PersonsCRUD";
const baseURL = "http://localhost:8080/persons";

function RegistrationForm(props) {
    const [post, setPost] = useState(null);
    const [state , setState] = useState({
        name: "",
        address: "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
                (async() => {
                  const response = await PersonService.addPerson(state.name,state.address,state.email,state.password);
                  setPost(response.data);
                  if(response.status === 200){
                    setState({name: "", address: "", email:"", password:"", confirmedPassword:"", successMessage:"Registration successful. Redirecting to login page.."});
                    await sleep(3000);
                    //console.log(response.data);
                    redirectToLogin();
                  }
                })();  
                }
        
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/'); 
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
            <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Name"
                        value={state.name}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="address" 
                        className="form-control" 
                        id="address" 
                        placeholder="Address"
                        value={state.address}
                        onChange={handleChange} 
                    />
                </div>
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
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={sendDetailsToServer}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default withRouter(RegistrationForm);