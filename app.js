require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url")
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { handleRedirect } = require("./controllers/url");



const app = express();
const PORT = process.env.PORT || 8001;

// connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
//     .then(() => console.log("MongoDB Connected!"))
connectToMongoDB(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });



app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkAuth);
// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home',{
//         urls: allUrls,
//     });
// });

// Set `res.locals.user` so it's available in all EJS templates
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.use("/user", userRoute);
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", staticRoute);

app.use(express.static(path.resolve('./public')));

app.get("/:shortId", handleRedirect); 

// //I had forgot to add /url previously in this route
// app.get("/url/:shortId", async (req, res) => {
//     try {
//         const shortId = req.params.shortId;

//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             {
//                 $push: {
//                     visitHistory: { timestamp: Date.now() },
//                 },
//             }
//         );

//         if (!entry) {
//             return res.status(404).send("Short URL not found");
//         }

//         res.redirect(entry.redirectURL);
//     } catch (err) {
//         console.error("Error during redirection:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });

app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`))