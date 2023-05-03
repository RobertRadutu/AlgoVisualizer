import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdOutlineLogin} from "react-icons/md";
import { authenticate } from './helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

const Login = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
      }, []);
      let params = useParams();
      const navigate = useNavigate();
    // create a state
    const [state, setState] = useState({
        name: '',
        password: ''
    });
    const { name, password } = state; // destructure values from state
    const { setIsLoggedIn } = useContext(AuthContext);
    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.table({ name, password });
        axios
        .post(`${process.env.REACT_APP_API}/login`, { name, password })
        .then((response) => {
          console.log(response);
          authenticate(response, () => {
            navigate("/CreatePost");
            setIsLoggedIn(true); // Use setIsLoggedIn from context
          });
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data);
        });
    };
    
    


    return (
        <div className="container pb-5">
            <div data-aos="fade-up">
            <h1><MdOutlineLogin color="green" size={50} />LOGIN</h1>
            <hr />
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        type="text"
                        className="form-control light-green-text-field"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                        onChange={handleChange('password')}
                        value={password}
                        type="password"
                        className="form-control light-green-text-field"
                        placeholder="Your Password"
                        required
                    />
                </div>
                <div>
                    <br/>
                    <button className="btn btn-success">Login</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Login;
