import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Smallnavsearch from "./navbarsearch.jsx";
import Navbar from '../components/Navbar';
import  {useParams} from 'react-router-dom';
import BlogCard from './blogdisplay';
import UserList from './userlist.jsx';
import Footer from '../components/footer.jsx';
import baseUrl from '../../api/serverAPI';
const Search = () => {
    const {query} = useParams();
    const [userResults, setUserResults] = useState([]);
    const [postResults, setPostResults] = useState([]);
    const [activeItem, setActiveItem] = useState('uusers');
    const [isLoading, setIsLoading] = useState(false);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    useEffect(() => {
        setIsLoading(true);
        console.log("In Search of query: ", query)
        const fetchUsers = async () => {
            try {
                const res = await axios.post(`${baseUrl}/searchUsers`, {query});
                console.log("users",res.data);
                setUserResults(res.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        const fetchPosts = async () => {
            try{
                const res = await axios.post(`${baseUrl}/searchPosts`, {query});
                setPostResults(res.data);
            }
            catch(err) {
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchUsers();
        fetchPosts();
    }, [query]);

    return (
        <>
        <Navbar />
        <div className='container marketing'>
        {isLoading? (
        <div>
          <h1>Loading...</h1>
        </div>
        ):(
            <>
            <p>Search Results for the Query: "{query}"</p>
            <div className="row">
            <div className="col-md-8 leftsection">
            <nav className="navbar n1">
                <ul className="nav-list n2">
                    <li className={`nav-ite ${activeItem === 'uusers' ? 'active' : ''}`} onClick={() => handleItemClick('uusers')}>Users</li>
                    <li className={`nav-ite ${activeItem === 'bblogs' ? 'active' : ''}`} onClick={() => handleItemClick('bblogs')}>Blogs</li>
                </ul>
            </nav>
            <hr style={{marginTop:'0'}}></hr>
                {console.log(postResults.posts)}
                {activeItem === 'bblogs' ? <>
                {postResults.posts.length > 0 ? (
                    postResults.posts.map((post) =>(
                    <BlogCard post={post} key={post._id} />
                    ))
                    ) : (
                    <div>No Posts Related to your Query.</div>
                    )}
                </>
                : 
                <>
                {userResults.users && userResults.users.length>0 ? (
                    userResults.users.map((user) =>(
                    <UserList user={user} key={user._id} />
                    ))
                    ) : (
                    <div>No Users Found.</div>
                    )}
                </>
            }
            </div>
            </div>
            </>
            )}
        </div>
        <Footer/>
        </>
    );
}

export default Search;
