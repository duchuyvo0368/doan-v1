import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function RecommendFeature(props) {
  const sampleData = [
    {
      id: 19,
      name: "Product 1",
      contentMarkdown: "khong",
      statusId: "S1",
      productDetail: [
        {
          id: 27,
          productId: 19,
          originalPrice: 29,
          discountPrice: 20,
          productImage: [
            {
              id: 10211,
              productDetailId: 27,
              image:
                "http://localhost:5000/resources/img/product/inspired-product/i4.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 20,
      name: "Product 2",
      contentMarkdown: "mô tả sản phẩm 2",
      statusId: "S1",
      productDetail: [
        {
          id: 28,
          productId: 20,
          originalPrice: 39,
          discountPrice: 30,
          productImage: [
            {
              id: 10212,
              productDetailId: 28,
              image:
                "http://localhost:5000/resources/img/product/inspired-product/i5.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 21,
      name: "Product 3",
      contentMarkdown: "mô tả sản phẩm 3",
      statusId: "S1",
      productDetail: [
        {
          id: 29,
          productId: 21,
          originalPrice: 49,
          discountPrice: 40,
          productImage: [
            {
              id: 10213,
              productDetailId: 29,
              image:
                "http://localhost:5000/resources/img/product/inspired-product/i6.jpg",
            },
          ],
        },
      ],
    },
    {
      id: 22,
      name: "Product 4",
      contentMarkdown: "mô tả sản phẩm 4",
      statusId: "S1",
      productDetail: [
        {
          id: 30,
          productId: 22,
          originalPrice: 59,
          discountPrice: 50,
          productImage: [
            {
              id: 10214,
              productDetailId: 30,
              image:
                "http://localhost:5000/resources/img/product/inspired-product/i7.jpg",
            },
          ],
        },
      ],
    },
  ];
  //Blog mới đăngalert(JSON.stringify(props));
  const renderData = () => {
    const data = props.data || [];
    const totalNeeded = 4 - data.length;
    if (totalNeeded > 0) {
      return [...data, ...sampleData.slice(0, totalNeeded)];
    }
    return data.slice(0, 4);
  };

  const dataToRender = renderData();

  return (
    <section class=" section_gap_bottom_custom">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="main_title">
              <h2>
                <span>new products</span>
              </h2>
              <p>Bring called seed first of third give itself now ment</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="new_product">
              <h5 class="text-uppercase">collection of 2019</h5>
              <h3 class="text-uppercase">Men’s summer t-shirt</h3>
              <div class="product-img">
                <img
                  class="img-fluid"
                  src="http://localhost:5000/resources/img/product/new-product/new-product1.png"
                  alt=""
                />
              </div>
              <h4>$120.70</h4>
              <a href="#" class="main_btn">
                Add to cart
              </a>
            </div>
          </div>

          <div class="col-lg-6 mt-5 mt-lg-0">
            <div class="row">
              {dataToRender.map((item, index) => (
                <div className="col-lg-6 col-md-6" key={index}>
                  <div className="single-product">
                    <div className="product-img">
                      {/* {item.productDetail?.[0]?.productImage?.[0]?.image ? ( */}
                        <img
                          className="img-fluid w-100"
                          src={item.productDetail[0].productImage[0].image}
                          alt={item.name || "Product"}
                        />
                      {/* ) : (
                        <div className="img-placeholder">
                          <p>Image not available</p>
                        </div>
                      )} */}
                      <div className="p_icon">
                        <a href="#">
                          <i className="ti-eye"></i>
                        </a>
                        <a href="#">
                          <i className="ti-heart"></i>
                        </a>
                        <a href="#">
                          <i className="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                    <div className="product-btm">
                      <Link to="#" className="d-block">
                        <h4>{item.name}</h4>
                      </Link>
                      <div className="mt-3">
                        <span className="mr-4">
                          ${item.productDetail[0].discountPrice.toFixed(2)}
                        </span>
                        {/* <del>${product.oldPrice}</del> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default RecommendFeature;
