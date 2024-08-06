const getCommentsHandler = (req, res) => {
    res.send("GetComments");
};

const postCommentsHandler = (req, res) => {
    res.send("PostComments");
};

const deleteCommentHandler = (req, res) => {
    res.send("Comment deleted");
};

const getCommentHandler = (req, res) => {
    console.log(req.params);
    console.log(req.params.commentId);
    res.send("getCommentHandler");
};

module.exports = {
    getCommentsHandler,
    postCommentsHandler,
    getCommentHandler,
    deleteCommentHandler,
};
