import React, { useEffect, useState, useCallback, useRef } from "react";
import "quill/dist/quill.snow.css";
import "./CreatePost.css";
import Editor from "../posts/editor";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import '../posts/quillpost.css';
import './profilepage.css';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import { useLocation, useParams } from 'react-router-dom';
import baseUrl from '../../api/serverAPI';

export default function CreatePost() {
    const location = useLocation();
    const [isUploading, setIsUploading] = useState(false);
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [quill, setQuill] = useState(null);
    const [titleImageUrl, setTitleImageUrl] = useState('');
    const quillRef = useRef(null);
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);
    const isPrivate = false;
    const user = JSON.parse(localStorage.getItem("user"));
    const author = user.name;
    const [selectedTags, setSelectedTags] = useState([]);
    const availableTags = ['Gardening', 'Plant Care', 'Organic', 'Indoor Gardening'];
    const {id} = useParams();
    
    const [post, setPost] = useState({});

    const fetchPost = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getSinglePost/${id}`);
        setPost(res.data.post);
        setTitle(res.data.post.title);
        setSummary(res.data.post.summary);
        setContent(res.data.post.content);
        setSelectedTags(res.data.post.tags);
        setTitleImageUrl(res.data.post.titleImageUrl);
        console.log("in edit post", post.userId, user._id);
        if(res.data.post.userId !== user._id){
            alert("You are not authorized to edit this post. Redirecting to the explore to see more posts.");
            window.location.href = "/explore";
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        // alert("Failed to fetch the post. Redirecting to the explore to see more posts.");
        // window.location.href = "/explore";
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(() => {
      fetchPost();
    }, []);


    const handleTagChange = (tag) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    };
    
    const handleImage = (e) =>{
      const file = e.target.files[0];
      setFileToBase(file);
      console.log(file);
    }

    const setFileToBase = (file) =>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        setTitleImageUrl(reader.result);
      }
    }


    const handleSubmit = async (ev) => {
      ev.preventDefault();
      setIsUploading(true);
      axios.post(`${baseUrl}/updatePost`, {
        postId: id,
        userId: user._id,
        title,
        summary,
        content,
        tags: selectedTags,
        isPrivate: false,
        author,
        titleImageUrl,
      })
        .then(res => {
          console.log(res);
          //wait till the upload is done
          setIsUploading(false);
         
        })
        .catch(err => {
          console.error(err);
          setIsUploading(false);
          alert("Error creating post please try again");
        })
        .finally(() => {
            navigate('/getSinglePost/'+id);
            }
        );
        
    };

    const [textarea1Height, setTextarea1Height] = useState('60px');
    const [textarea2Height, setTextarea2Height] = useState('50px');
  
    const handleTextarea1Input = (event) => {
      event.preventDefault();
      const { scrollHeight } = event.target;
      setTextarea1Height(scrollHeight + 'px');
    };
  
    const handleTextarea2Input = (event) => {
      event.preventDefault();
      const { scrollHeight } = event.target;
      setTextarea2Height(scrollHeight + 'px');
    };

    return(
      <>
      <Navbar/>
      <div className="gg" >
      <div className="container marketing2">
      <form onSubmit={handleSubmit}>
        
      <div class="row" style={{paddingBottom: '3rem'}}>
            <div >
            <textarea id="t1" style={{height:textarea1Height}} onInput={handleTextarea1Input} className="title-input" type="title" placeholder = {'Title'} value={title} onChange ={ev=>setTitle(ev.target.value)}/>
            </div>
        </div>
        <div class="row" style={{paddingBottom: '2rem'}}  >
            <div>
            <textarea id="t2" style={{height:textarea2Height}} onInput={handleTextarea2Input} className="title-input2" type="summary" placeholder = {'Summary'} value={summary} onChange ={ev=>setSummary(ev.target.value)}/>
            </div>
        </div>
        <h6><i>Give lead image for your blog here...</i></h6><br></br>
        <div className="form-outline" style={{margin:'0'}}>
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control" />
                
                <label className="form-label" htmlFor="form4Example2"></label>
        </div>
        <img className="img-fluid" src={titleImageUrl} alt="" style={{ display: 'block', margin: '0 auto' }} />
        <br></br>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {availableTags.map((tag) => (
            <label key={tag} style={{ fontFamily: 'Helvetica', fontSize: '18px', fontWeight: '', flexBasis: '30%' }}>
              <input
                type="checkbox"
                value={" "+tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
        <br></br>
        <Editor value={content}  onChange={setContent} ref={quillRef}/>
        <div>
        
      </div>
      {!isUploading ? (
      <button className="custombtn" style={{ marginTop: '5px' }} disabled={isUploading}>
        Update post
      </button>
      ) : (
      <button className="custombtn" style={{ marginTop: '5px' }} disabled={isUploading}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </button>
      )  
      }
      </form>
      </div>
      <br/>
      <br/>
      
      </div>
      <Footer></Footer>
      </>
    );  
  }

