import React from "react";
import { useSelector } from "react-redux";
function RecommendFeature() {

  const imagesList = useSelector((state) => state.image.imagesList);
  //alert(JSON.stringify(imagesList))
  return (
  //   <div>
  //   {imagesList.map((image, index) => (
  //     <img key={index} src={image.url} alt={`Image ${index}`} />
  //   ))}
  // </div>
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
              <div class="col-lg-6 col-md-6">
                <div class="single-product">
                  <div
                    className="product-card"
                    style={{
                      border: "0.1px solid hsla(210, 10%, 85%, 0.3)",
                    }}
                  >
                    <div class="product-img">
                      <img
                        class="img-fluid w-100"
                        src="http://localhost:5000/resources/img/product/new-product/n2.jpg"
                        alt=""
                      />
                      <div class="p_icon">
                        <a href="#">
                          <i class="ti-eye"></i>
                        </a>

                        <a href="#">
                          <i class="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="product-btm">
                    <a href="#" class="d-block">
                      <h4>Nike latest sneaker</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">$25.00</span>
                      <del>$35.00</del>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="single-product">
                  <div
                    className="product-card"
                    style={{
                      border: "0.1px solid hsla(210, 10%, 85%, 0.3)",
                    }}
                  >
                    <div class="product-img">
                      <img
                        class="img-fluid w-100"
                        src="http://localhost:5000/resources/img/product/new-product/n2.jpg"
                        alt=""
                      />
                      <div class="p_icon">
                        <a href="#">
                          <i class="ti-eye"></i>
                        </a>
                        <a href="#">
                          <i class="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="product-btm">
                    <a href="#" class="d-block">
                      <h4>Nike latest sneaker</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">$25.00</span>
                      <del>$35.00</del>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="single-product">
                  <div
                    className="product-card"
                    style={{
                      border: "0.1px solid hsla(210, 10%, 85%, 0.3)",
                    }}
                  >
                    <div class="product-img">
                      <img
                        class="img-fluid w-100"
                        src="http://localhost:5000/resources/img/product/new-product/n2.jpg"
                        alt=""
                      />
                      <div class="p_icon">
                        <a href="#">
                          <i class="ti-eye"></i>
                        </a>

                        <a href="#">
                          <i class="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="product-btm">
                    <a href="#" class="d-block">
                      <h4>Nike latest sneaker</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">$25.00</span>
                      <del>$35.00</del>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="single-product">
                  <div
                    className="product-card"
                    style={{
                      border: "0.1px solid hsla(210, 10%, 85%, 0.3)",
                    }}
                  >
                    <div class="product-img">
                      <img
                        class="img-fluid w-100"
                        src="http://localhost:5000/resources/img/product/new-product/n2.jpg"
                        alt=""
                      />
                      <div class="p_icon">
                        <a href="#">
                          <i class="ti-eye"></i>
                        </a>

                        <a href="#">
                          <i class="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="product-btm">
                    <a href="#" class="d-block">
                      <h4>Nike latest sneaker</h4>
                    </a>
                    <div class="mt-3">
                      <span class="mr-4">$25.00</span>
                      <del>$35.00</del>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default RecommendFeature;
