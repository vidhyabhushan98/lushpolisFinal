import './blogdisplay.css' 


const BlogCard = ({ post, key }) => {
    console.log(post.title, post._id)
    const getSinglePost = '/getsinglePost/';
  
    return (
      <>
        <div className="card" style={{ border: 'none' }}>
          <div className="row no-gutters">
            <div className="col-md-8">
              <a href = {getSinglePost + post._id} style={{textDecoration:"none"}}>
              <div className="card-body">
                <h5 className="card-title" style={{color:"green"}}>{post.title}</h5>
                <p className="card-text" style={{color:"green"}}>{post.summary}</p>
              </div>
              </a>
              <div className="card-footer" style={{ border: 'none' }}>
                <button className="icon-button" style={{ border: 'none' }}><i className="far fa-bookmark"></i></button>
                <button className="icon-button" style={{ border: 'none' }}><i className="far fa-heart"></i></button>
                <button className="icon-button" style={{ border: 'none' }}><i className="far fa-comment"></i></button>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img src={post.titleImage[0].url? post.titleImage[0].url : 'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='} className="card-img bimg" alt="Cat" />
            </div>
          </div>
        </div>
        <hr></hr>
      </>
    );
  };

export default BlogCard;