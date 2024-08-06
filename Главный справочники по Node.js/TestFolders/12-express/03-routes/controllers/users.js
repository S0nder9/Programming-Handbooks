const getUsersHandler = (req, res) => {
    res.send("getUsersHandler");
};

const postUsersHandler = (req, res) => {
    res.send("postUsersHandler");
};

const getSingleUsersHandler = (req, res) => {
    res.send("getSingleUsersHandler");
};

module.exports = {
    getUsersHandler, postUsersHandler, getSingleUsersHandler,
}