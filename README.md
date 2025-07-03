# 🔗 URL Shortener

A full-stack **URL Shortener App** that lets users register, log in, and generate custom short links for any long URL. Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, and deployed on **Render**.

### 🌍 Live Demo
👉 [https://urls-4kyu.onrender.com](https://urls-4kyu.onrender.com)

---

## 📸 Features

- 🔐 **User Authentication** (Sign up & Login)
- 🔗 **URL Shortening** with unique nanoid-based short IDs
- 📈 **Analytics** showing total number of visits per URL
- 💾 **MongoDB Database** integration using Mongoose
- 📄 **EJS Templating** for dynamic pages
- 📊 **Click Tracking** with timestamp logs
- 🛡️ Protected Routes using Middleware
- ☁️ **Deployed on Render**

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **EJS** | Template engine |
| **nanoid** | For generating unique short IDs |
| **Render** | Deployment |
| **dotenv** | Environment variable management |
| **cookie-parser** | Cookie management |
| **Bootstrap + Custom CSS** | Frontend styling |

---

## 📁 Project Structure

<img width="203" alt="{34EAD937-22D4-4113-91BD-8577C432ABD8}" src="https://github.com/user-attachments/assets/5059ba51-96c8-4b85-a80d-c1944ca80791" />

---

## 🚀 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/url-shortener.git
   cd url-shortener
   
2. Install dependencies
   npm install
   
3. Create .env file
  MONGO_URL=mongodb://localhost:27017/short-url
  PORT=8001

4. Run the app
  npm start

✅ TODOs / Future Scope
 - Add custom alias support for short URLs
 - Add expiration time for links
 - Integrate QR code generation
 - Add social sharing options
 - Implement rate limiting & security headers

   🙌 Acknowledgements
- Inspired by real-world tools like Bitly and TinyURL. Big shoutout to:
- NanoID
- MongoDB Atlas
- Render

🧑‍💻 Author
Made with 💙 by Suyog Sable
- GitHub: @Suyog-Sable
- LinkedIn: Suyog Sable

📜 License
This project is licensed under the MIT License.





