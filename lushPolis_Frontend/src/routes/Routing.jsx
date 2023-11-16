import React,{useEffect, useContext,useState} from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signup from '../screens/auth/Signup';
import SinglePost from '../screens/posts/blogview';
import Login from '../screens/auth/Login';
import Redirect from '../screens/auth/redirect';
import Logout from '../screens/auth/Logout';
import PageNotFound from '../screens/auth/pagenotfound';
import IntroPage from '../screens/auth/intropage';
import LoginRedirect from '../screens/auth/loginredirect';

import Chat from '../screens/chatpage/Chat';
import { AppContext,socket } from '../screens/context/appContext';

import Following from '../screens/posts/following';
import Bookmarks from '../screens/profile/bookmarks';

import FileUpload from '../screens/plants/FileUpload';
import Plants from '../screens/plants/Plants';
import SearchPlant from '../screens/plants/PlantSearch';
import HealthAssessment from '../screens/plants/PlantHealth';

import ProfilePage from '../screens/profile/profilepage';

import CreatePost from '../screens/posts/quillPost';
import Explore from '../screens/explore/explore';
import Seemore from '../screens/explore/seemore';
import Search from '../screens/search/search';
import EditPost from '../screens/profile/editPost';

import Shop from '../screens/shop/shop';
import SingleProduct from '../screens/shop/singleProduct/SingleProduct';
import Cart from '../screens/shop/cart/Cart';
import AddProduct from '../screens/shop/addProduct';
import SearchShop from '../screens/shop/searchShop';
import Favorite from '../screens/shop/favorite/Favorite';

import ChatBot from '../screens/chatbot/ChatBot';

import Diaries from '../screens/diaries/Diaries';
import SingleDiary from '../screens/diaries/SingleDiary';
import CreateDiary from '../screens/diaries/CreateDiary';

const Routing = () => {
    const jwt = localStorage.getItem("user");

    if(jwt){
        console.log("JWT exists");
    }else{
        console.log("JWT does not exist");
    }
    return (
        <AppContext.Provider value={{}}>
        <BrowserRouter>
            <Routes>
                {!jwt && <Route path="/" element={<IntroPage/>}/>}
                {!jwt && <Route path="/*" element={<LoginRedirect/>}/>}
                {!jwt && <Route path="/signup" element={<Signup/>}/>}
                {!jwt &&<Route path="/login" element={<Login/>}/>}
               
                
                {jwt && <Route path="/" element={<Logout/>}/>}
                {jwt && <Route path="/login" element={<Redirect/>}/>}
                {jwt && <Route path="/signup" element={<Redirect/>}/>}
                
                {jwt &&<Route path="/chat" element={<Chat/>}/>}
               

                {jwt && <Route path="/createPost" element={<CreatePost/>}/> }
                {jwt && <Route path='/getSinglePost/:id' element={<SinglePost/>}/>}
                {jwt && <Route path='/following' element={<Following/>}/>}
                {jwt && <Route path='/editPost/:id' element={<EditPost/>}/>}
                
                {jwt && <Route path='/plants'  element={<Plants/>}/>}
                {jwt && <Route path='/plants/identification'  element={<FileUpload/>}/>}
                {jwt && <Route path='/plants/search'  element={<SearchPlant/>}/>}
                {jwt && <Route path='/plants/health_assessment'  element={<HealthAssessment/>}/>}

                {jwt && <Route path="/explore" element={<Explore></Explore>}/>}
                {jwt &&  <Route path='/profile/:id' element={<ProfilePage/>}/>}
                {jwt && <Route path='/seemore/:tag' element={<Seemore/>}/>}
                {jwt && <Route path='/search/:query' element={<Search/>}/>}
                {jwt && <Route path='/bookmarks' element={<Bookmarks/>}/>}
                
                {jwt && <Route path="/shop" element={<Shop/>}/>}
                {jwt && <Route path="/shop/:id" element={<SingleProduct/>}/>}
                {jwt && <Route path="/shop/search/:query" element={<SearchShop/>}/>}
                {jwt && <Route path="/shop/cart" element={<Cart/>}/>}
                {jwt && <Route path="/shop/add" element={<AddProduct/>}/>}
                {jwt && <Route path="/shop/favorites" element={<Favorite/>}/>}

                {jwt && <Route path="/assistant" element={<ChatBot/>}/>}

                {jwt && <Route path="/diaries" element={<Diaries/>}/>}
                {jwt && <Route path="/diaries/:id" element={<SingleDiary/>}/>}
                {jwt && <Route path="/createDiary" element={<CreateDiary/>}/>}
                {jwt && <Route path="/*" element ={<PageNotFound/>}></Route>}
                
            </Routes>
        </BrowserRouter>
        </AppContext.Provider>
    )
}

export default Routing;