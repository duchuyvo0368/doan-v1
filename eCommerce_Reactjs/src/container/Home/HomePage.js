import React, { useState, useEffect } from "react";
import HomeBanner from "../../component/HomeFeature/HomeBanner";
import MainFeature from "../../component/HomeFeature/MainFeature";
import ProductFeature from "../../component/HomeFeature/ProductFeature";
import NewProductFeature from "../../component/HomeFeature/NewProductFeature";
import HomeBlog from "../../component/HomeFeature/HomeBlog";
import RecommendFeature from "../../component/HomeFeature/RecommendFeature";
import {
    getAllBanner,
    getProductFeatureService,
    getProductNewService,
    getNewBlog,
    getProductRecommendService,
} from "../../services/userService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function HomePage(props) {
    const [dataProductFeature, setDataProductFeature] = useState([]);
    const [dataNewProductFeature, setNewProductFeature] = useState([]);
    const [dataNewBlog, setdataNewBlog] = useState([]);
    const [dataBanner, setdataBanner] = useState([]);
    const [dataProductRecommend, setdataProductRecommend] = useState([]);
    let settings = {
        dots: false,
        Infinity: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        cssEase: "linear",
    };
  //  alert("data"+ JSON.stringify(dataProductRecommend.length))
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            fetchProductRecommend(userData.id);
        }
        fetchBlogFeature();
        fetchDataBrand();
        fetchProductFeature();
        fetchProductNew();

        window.scrollTo(0, 0);
    }, []);
    let fetchBlogFeature = async () => {
        let res = await getNewBlog(3);
        if (res && res.errCode === 0) {
            setdataNewBlog(res.data);
        }
    };
    let fetchProductFeature = async () => {
        let res = await getProductFeatureService(4);
        if (res && res.errCode === 0) {
            setDataProductFeature(res.data);
        }
    };
    let fetchProductRecommend = async (userId) => {
        let res = await getProductRecommendService({
            limit: 4,
            userId: userId,
        });
        if (res && res.errCode === 0) {
            setdataProductRecommend(res.data);
        }
    };
    let fetchDataBrand = async () => {
        let res = await getAllBanner({
            limit: 6,
            offset: 0,
            keyword: "",
        });
        if (res && res.errCode === 0) {
            setdataBanner(res.data);
        }
    };
    let fetchProductNew = async () => {
        let res = await getProductNewService(8);
        if (res && res.errCode === 0) {
            setNewProductFeature(res.data);
        }
    };
    return (
        <div>
            <Slider {...settings}>
                {dataBanner &&
                    dataBanner.length > 0 &&
                    dataBanner.map((item, index) => {
                        return (
                            <HomeBanner image={item.image} name={item.name}></HomeBanner>
                        );
                    })}
            </Slider>

            <MainFeature></MainFeature>
     
            <ProductFeature
                title={"Featured products"}
                data={dataProductFeature}
            ></ProductFeature>
            <RecommendFeature 
            data={dataProductRecommend}>
            </RecommendFeature>
            <NewProductFeature
                title="Inspired products"
                description="Bring called seed first of third give itself now ment"
                data={dataNewProductFeature}
            ></NewProductFeature>
            <HomeBlog data={dataNewBlog} />
        </div>
    );
}

export default HomePage;