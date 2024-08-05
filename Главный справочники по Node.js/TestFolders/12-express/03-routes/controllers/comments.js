const getRootHandler = (req, res) => {
    res.send("firstHandler");
};

const getCommentsHandler = (req, res) => {
    res.send("GetComments");
};

const postCommentsHandler = (req, res) => {
    res.send("PostComments");
};

const deleteCommentHandler = (req, res) => {
    res.send("Comment deleted");
};

const getUsersHandler = (req, res) => {
    res.send("getUsersHandler");
};

const postUsersHandler = (req, res) => {
    res.send("postUsersHandler");
};

const getSingleUsersHandler = (req, res) => {
    res.send("getSingleUsersHandler");
};

const getCommentHandler = (req, res) => {
    console.log(req.params);
    console.log(req.params.commentId);
    res.send("getCommentHandler");
};

module.exports = {
    getRootHandler, 
    getCommentsHandler, 
    postCommentsHandler, 
    getCommentHandler, 
    deleteCommentHandler, 
    getUsersHandler, 
    postUsersHandler, 
    getSingleUsersHandler
};
