const express = require("express");
const router = express.Router();

// Posts 
// Index - posts
router.get("/", (req, res)=> {
    res.send("GET for posts");
});

// Show - posts
router.get("/:id", (req, res) => {
    res.send("GET for show posts");
});

// post - posts
router.post("/", (req, res) => {
    res.send("POST for posts");
});

// Delete - posts
router.delete("/:id", (req, res) => {
    res.send("DELETE for posts id");
});

module.exports = router;