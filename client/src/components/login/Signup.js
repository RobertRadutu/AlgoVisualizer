// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const { name, email, password } = formData;

//   const handleChange = (name) => (event) => {
//     setFormData({ ...formData, [name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(`process.env.REACT_APP_API}/signup`, { name, email, password });
//       console.log(response.data.message);
//       setFormData({
//         ...formData,
//         name: '',
//         email: '',
//         password: '',
//       });
//     } catch (error) {
//       console.error('Error signing up:', error.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={handleChange('name')} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={handleChange('email')} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={handleChange('password')} required />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdOutlineLogin} from "react-icons/md";
import { authenticate } from './helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthContext";

const SignUp = () => {

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
        email: '',
        password: ''
    });

    const { name, email, password } = state; // destructure values from state
    const { setIsLoggedIn } = useContext(AuthContext);
    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.table({ name, email, password });
        axios
        .post(`${process.env.REACT_APP_API}/signup`, { name, email, password })
        .then((response) => {
          console.log(response);
          setState({
            ...state,
            name: '',
            email: '',
            password: '',
          });
          navigate('/Login');
        })
        .catch((error) => {
          console.log(error.response);
          alert(error.response.data);
        });
    };
    
    


    return (
        <div className="container pb-5">
            <div data-aos="fade-up">
            <h1><MdOutlineLogin color="green" size={50} />SIGNUP</h1>
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
                    <label className="text-muted">Email</label>
                    <input
                        onChange={handleChange('email')}
                        value={email}
                        type="text"
                        className="form-control light-green-text-field"
                        placeholder="Your e-mail"
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
                    <button className="btn btn-success">Sign up</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default SignUp;
