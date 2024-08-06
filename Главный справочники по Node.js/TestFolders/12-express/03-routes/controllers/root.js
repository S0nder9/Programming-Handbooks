const getRootHandler = (req, res) => {
    res.send("firstHandler");
};

module.exports = { getRootHandler };