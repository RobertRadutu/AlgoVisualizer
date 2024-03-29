import React, { useState, useEffect } from 'react';
import "../style.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdAddTask} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../login/helpers';

const Create = () => {
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
        if (!getUser()) {
            navigate('/login');
          }
      }, [navigate]);
      
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });
    // destructure values from state
    const { title, content, user } = state;
   
    // onchange event handler
    const handleChange = name => event => {
         //console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    // function handleChange(name) {
    //     return function(event) {
    //         setState({ ...state, [name]: event.target.value });
    //     };
    // }

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', content: '', user: '' });
                // show sucess alert
                alert(`Post titled ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container p-5">
            <div data-aos="fade-up">
            <MdAddTask color="green" size={50} />
            <h2>CREATE POST</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input
                        onChange={handleChange('title')}
                        value={title}
                        type="text"
                        className="form-control light-green-text-field"
                        placeholder="Post title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea
                        onChange={handleChange('content')}
                        value={content}
                        type="text"
                        className="form-control light-green-text-field"
                        placeholder="Write something.."
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">User</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control light-green-text-field"
                        placeholder="Your name"
                        required
                    />
                </div>
                <div>
                <br />
                    <button className="btn btn-success">Create</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Create;
