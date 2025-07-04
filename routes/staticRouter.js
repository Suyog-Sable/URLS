const express = require("express");
const router = express.Router();
const URL = require('../models/url');

router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allurls,
        user: req.user,
    });
})

router.get('/signup', async (req, res) => {
    return res.render("signup");
});

router.get('/login', async (req, res) => {
    return res.render("login");
});

router.get('/about', (req, res) => {
  res.render('about', { user: req.user || null });
});

module.exports = router;