import { AiFillStar } from "react-icons/ai";
import { BsSearch, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const ShopProducts = ({ visible, setVisible, filterdProducts }) => {
  return (
    <>
      <div className="shop-box-products">
        {filterdProducts.map((prod) => (
          <>
          {prod.onSale && prod.itemsCount > 0 && (
            <a href={`/shop/${prod._id}`}>
            
              <div
                className="product-box-shop"
                key={prod.id}
                onMouseEnter={() => setVisible(prod.id)}
                onMouseLeave={() => setVisible(null)}
              >
                <div className="img">
                  {/* {visible === prod.id && (
                <div className="overlay">
                  <Link to={`/shop/${prod._id}`}>
                    <BsSearch />
                  </Link>
                </div>
              )} */}
                  <img src={prod.image[0].url} alt={prod.title} />
                </div>
                <div className="info-box">
                  <div style={{display:'block'}}>
                  <p className="title" style={{fontWeight:'bold'}}>{prod.title.slice(0, 21)}</p>
                  <p className="description">{prod.description.slice(0, 50)}</p>
                  </div>
                  <div className="details">
                    <span>${prod.price}</span>
                    <div className="rating">
                      <AiFillStar className="icon" />
                      {prod.rating.length > 0 ? (
                        <span>
                          {(
                            prod.rating.reduce(
                              (acc, item) => acc + item.rate,
                              0
                            ) / prod.rating.length
                          ).toFixed(1)}
                        </span>
                      ) : (
                        <span>0.0</span>
                      )}
                      {/* <BsFillPersonFill className="icon person" />
                      {prod.rating.length > 0 ? (
                        <span>{prod.rating.length}</span>
                      ) : (
                        <span>0</span>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              </a>
            )}
        </>
        ))}
      </div>
    </>
  );
};
