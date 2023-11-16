import React,{useEffect, useState}  from 'react';
import './explore.css';
import sampledp from '../../assets/images/introageimage.jpg';

const TopBlogs = (posts) => {
    const Posts = posts.posts;
    //console.log(Posts);
    const getSinglePost = '/getSinglePost/'
    return (
    <>
    <div>
    <h1 className='exploretopcat'>Trending Blogs</h1>
    
    <hr />
    <div >
    <div className="row">
    <div className="col-md-6">
        <div ><a href= {getSinglePost + Posts[0]?._id} style={{textDecoration:"none"}}>
        
        <img src={Posts[0]?.titleImage[0].url?Posts[0]?.titleImage[0].url:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="toppost-img-fluid"  alt="Cat" />       
             <p className="blog-title" style={{color:'green'}}><strong>{Posts[0]?.title}</strong></p>
            <p className="blog-summary" style={{color:'green'}}>{Posts[0]?.summary}</p>
            <div className="author-info">
                
                <div className="author-details">
                    <div className="user-info">
                    </div>
                    <div className="author-meta">
                    
                    </div>
                </div>
            </div>
            </a></div>
        
    </div>
        
        
        <div className="col-md-6">
            <div className="row mb-3">
                <div className="col-md-6">
                <a href= {getSinglePost + Posts[1]?._id} style={{textDecoration:"none"}}>
                <img src={Posts[1]?.titleImage[0].url?Posts[1]?.titleImage[0].url:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="img-fluid section-img" alt="Cat" />
                    <h4 className='new' style={{color:'green'}}>{Posts[1]?.title}</h4>
                </a>
                </div>
                <div className="col-md-6">
                <a href= {getSinglePost + Posts[2]?._id} style={{textDecoration:"none"}}>
                <img src={Posts[2]?.titleImage[0].url?Posts[2]?.titleImage[0].url:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="img-fluid section-img" alt="Cat" />
                    <h4 className='new' style={{color:'green'}}>{Posts[2]?.title}</h4>
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <a href= {getSinglePost + Posts[3]?._id} style={{textDecoration:"none"}}>
                <img src={Posts[3]?.titleImage[0].url?Posts[3].titleImage[0].url:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="img-fluid section-img" alt="Cat" />
                    <h4 className='new' style={{color:'green'}}>{Posts[3]?.title}</h4>
                </a>
                </div>
                <div className="col-md-6">
                <a href= {getSinglePost + Posts[4]?._id} style={{textDecoration:"none"}}>
                <img src={Posts[4]?.titleImage[0].url?Posts[4].titleImage[0].url:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'} className="img-fluid section-img" alt="Cat" />
                    <h4 className='new' style={{color:'green'}}>{Posts[4]?.title}</h4>
                </a>
                </div>
            </div>
        </div>
        </div>
        <a href = "#seeallPosts">
    <button type="button" className="btn btn-light see-more-btn">See More</button>        
    </a>    
    <br></br>
        <hr/>
        
    </div>
    </div>

    
</>
        );
};

export default TopBlogs;
