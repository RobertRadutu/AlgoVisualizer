import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../style.css";
import AOS from "aos";
import "aos/dist/aos.css";
const UpdatePost = props => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
      }, []);
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: ''
    });
    const { title, content, slug, user } = state;
    let params = useParams();
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${params.slug}`)
            .then(response => {
                const { title, content, slug, user } = response.data;
                setState({ ...state, title, content, slug, user });
            })
            .catch(error => alert('Error loading single post'));
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, user })
            .then(response => {
                console.log(response);
                const { title, content, slug, user } = response.data;
                // empty state
                setState({ ...state, title, content, slug, user });
                // show sucess alert
                alert(`Post titled ${title} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
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
            <br/>
            <div>
                <button className="btn btn-success">Update</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
              <div data-aos="fade-up">
            <br />
            <h2>UPDATE POST</h2>
            {showUpdateForm()}
            </div>
        </div>
    );
};

export default UpdatePost;
