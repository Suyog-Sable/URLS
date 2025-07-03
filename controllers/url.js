const { nanoid } = require("nanoid");
const URL = require('../models/url')


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" })

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    const fullUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

    return res.render("home", {
        id: shortId,
        fullUrl: fullUrl
    });
    return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
async function handleRedirect(req, res) {
    try {
        const shortId = req.params.shortId;

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() },
                },
            }
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        return res.redirect(entry.redirectURL);
    } catch (err) {
        console.error("Redirect Error:", err);
        return res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirect,
};