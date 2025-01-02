const preOrderPrice = () => 50; // Hàm trả giá đặt trước
const promotionPrice = () => 70; // Hàm trả giá khuyến mãi
const blackFridayPrice = () => 30; // Hàm trả giá Black Friday
const dayPrice = () => 100; // Hàm trả giá hàng ngày
const defaultPrice = () => 120; // Hàm trả giá mặc định

const getPriceStrategies = {
  preOrder: preOrderPrice,
  promotion: promotionPrice,
  blackFriday: blackFridayPrice,
  dayPrice:dayPrice, // shorthand property
  default: defaultPrice,
};

// Sử dụng chiến lược giá
const selectedStrategy = "dayPrice";
const price = getPriceStrategies[selectedStrategy] || getPriceStrategies.default;
console.log(price()); // Kết quả: 30
