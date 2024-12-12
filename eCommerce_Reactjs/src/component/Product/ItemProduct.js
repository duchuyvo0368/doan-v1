import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemCartStart } from "../../action/ShopCartAction";
import CommonUtils from "../../utils/CommonUtils";
import axios from "axios";
import { useSelector } from "react-redux";
import { setSimilarProducts } from "../../reducer/productSlice";
import "./ItemProduct.scss";
import { saveImages } from "../../reducer/actions";
function ItemProduct(props) {
  const dispatch = useDispatch();
  // const handleProductClick = async () => {
  //   try {
  //     const response = await axios.post("http://127.0.0.1:8080/predict", {
  //       image: props.img,
  //     });
  //     //alert(props.img);
  //     dispatch(saveImages(response.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      className="product-card"
      
    >
      <Link to={`/detail-product/${props.id}`}>
        <div className="product-img">
          <div className="product-img w-100">
            <img className="img-fluid w-100" src={props.img} alt={props.name} />
            <div className="p_icon">
              <a>
                <i className="ti-eye" />
              </a>
              <a href="#">
                <i class="ti-heart"></i>
              </a>
              <a>
                <i className="ti-shopping-cart" />
              </a>
            </div>
          </div>
        </div>
        <div className="product-btm">
          <a className="d-block">
            <h4>{props.name}</h4>
          </a>
          <div className="mt-3">
            <span className="mr-4">
              {CommonUtils.formatter.format(props.discountPrice)}
            </span>
            <del>{CommonUtils.formatter.format(props.price)}</del>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemProduct;
