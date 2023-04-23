import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

const SinglePost = props => {

     let params = useParams();
    // return <div>{JSON.stringify(props)}</div>
    const [post,setPost] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/post/${params.slug}`)
        .then(response => setPost(response.data))
        .catch(error => alert('Error loading the single post'));
    }, []);

    return(
        <div className="container pb-5">
            <br />
            <h1>{post.title}</h1>
            <hr />
            <p className="lead">{post.content}</p>
                        <p>
                            Author: <span className="badge" style={{ fontSize: '15px',  color: 'green'  }}>{post.user}</span> Published on:{' '}
                            <span className="badge" style={{ fontSize: '15px',  color: 'green'  }}>{new Date(post.createdAt).toLocaleString()}</span>
                        </p>
        </div>
    )

}

export default SinglePost;