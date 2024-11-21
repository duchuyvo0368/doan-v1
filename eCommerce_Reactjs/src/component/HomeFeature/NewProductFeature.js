import React from "react";
import ItemProduct from "../Product/ItemProduct";
import HeaderContent from "../Content/HeaderContent";
function NewProductFeature(props) {
  return (
    <section className="inspired_product_area section_gap_bottom_custom">
      <div className="container">
        <HeaderContent
          mainContent={props.title}
          infoContent={props.description}
        >
          {" "}
        </HeaderContent>
       
        <div className="row">
          {props.data &&
            props.data.length > 0 &&
            props.data.map((item, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-6">
                  <div class="single-product">
                    <ItemProduct
                      id={item.id}
                      name={item.name}
                      img={item.productDetail[0].productImage[0].image}
                      price={item.productDetail[0].originalPrice}
                      discountPrice={item.productDetail[0].discountPrice}
                    />
                  </div>
                </div>
              );
            })}
        </div>
       
      </div>
    </section>
  );
}

export default NewProductFeature;
