// const fs = require('fs');
// const mysql = require('mysql2');
// const path = require('path');

// // Kết nối cơ sở dữ liệu
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '', 
//   database: 'ecom2' 
// });

// // Hàm chuyển đổi file sang Base64 với prefix MIME type
// const getBase64 = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, (err, data) => {
//       if (err) {
//         return reject(err);
//       }

//       // Xác định MIME type dựa vào phần mở rộng file
//       const ext = path.extname(filePath).toLowerCase();
//       let mimeType = '';
//       if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
//       else if (ext === '.png') mimeType = 'image/png';
//       else if (ext === '.gif') mimeType = 'image/gif';
//       else return reject(new Error('Unsupported file type'));

//       // Tạo chuỗi Base64 với prefix MIME type
//       const base64String = `data:${mimeType};base64,${data.toString('base64')}`;
//       resolve(base64String);
//     });
//   });
// };

// // Hàm lưu Base64 vào cơ sở dữ liệu
// const uploadImageToDB = (productDetailId, base64Image) => {
//   return new Promise((resolve, reject) => {
//     const query = 'INSERT INTO ProductImages (productDetailId, image) VALUES (?, ?)';
//     connection.execute(query, [productDetailId, base64Image], (err, results) => {
//       if (err) {
//         console.error(`Error inserting image for productDetailId ${productDetailId}:`, err);
//         reject(err);
//       } else {
//         console.log(`Image uploaded successfully for productDetailId ${productDetailId}`);
//         resolve(results);
//       }
//     });
//   });
// };

// // Hàm chính xử lý toàn bộ quá trình
// const main = async () => {
//   const imageDirectory = 'C:/Users/duchuy/Downloads/archive/data1/'; // Đường dẫn thư mục chứa ảnh
  
//   try {
//     // Lấy danh sách file hình ảnh
//     const filenames = fs.readdirSync(imageDirectory)
//       .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
//       .map(file => path.join(imageDirectory, file));
    
//     // Duyệt qua từng file và xử lý
//     for (let index = 0; index < filenames.length; index++) {
//       const imagePath = filenames[index];
//       const productDetailId = index + 1; // Giả định ID sản phẩm tăng dần từ 1
      
//       try {
//         const base64Image = await getBase64(imagePath); // Tạo Base64
//         await uploadImageToDB(productDetailId, base64Image); // Lưu vào DB
//       } catch (error) {
//         console.error(`Failed to process image at ${imagePath}:`, error);
//       }
//     }
//   } catch (err) {
//     console.error("Error reading image directory:", err);
//   } finally {
//     connection.end(); // Đóng kết nối CSDL
//   }
// };

// // Gọi hàm chính
// main();
const mysql = require('mysql');

// Kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecom2',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Truy vấn lấy Base64 từ bảng
const query = 'SELECT image_base64 FROM products WHERE id = ?'; // Giả sử bảng là `products` và cột lưu Base64 là `image_base64`
const productId = 1; // ID sản phẩm cần lấy

connection.query(query, [productId], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }

  if (results.length > 0) {
    const base64Image = results[0].image_base64; // Lấy chuỗi Base64 từ kết quả
    console.log('Base64 Image:', base64Image);

    // Nếu muốn gửi kết quả này tới frontend
    // Có thể sử dụng dưới dạng `data:image/png;base64,` nếu cần hiển thị ảnh
    console.log(`data:image/png;base64,${base64Image}`);
  } else {
    console.log('No image found for the given product ID.');
  }
});

// Đóng kết nối
connection.end();

