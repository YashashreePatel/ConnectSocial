import * as commentService from "../services/comment-service.js";

// post route to save comment
export const post = async (req, res) => {
    try {
        let newComment;
        // formatting the req body
        if (Object.keys(req.body).length > 1) {
            newComment = req.body;
        } else {
            newComment = JSON.parse(Object.keys(req.body)[0]);
        }
        // calling save function in service file
        let comment = await commentService.save(newComment).then((res) => { return res; }).catch((err) => { return err; });
        let statusCode = 201;
        // calling success reponse fn and passing data
        return setSuccessfulResponse(comment, res, statusCode);
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// fn to fetch all comments
export const get = async (req, res) => {
    try {
        let comments = await commentService.getAll();
        // calling success reponse fn and passing data
        return setSuccessfulResponse(comments, res);
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// fn to update a comment
export const put = async (req, res) => {
    try {
        let updateComment;
        if (Object.keys(req.body).length > 1) {
            updateComment = req.body;
        } else {
            updateComment = JSON.parse(Object.keys(req.body)[0]);
        }
        const id = updateComment.id;
        if (!id) {
            let statusCode = 404;
            return setErrorResponse('ID not defined!', res, statusCode);
        }
        // udpating the comment
        let comment = await commentService.update(id, updateComment);
        // if comment is not found then send err
        if (!comment) {
            let statusCode = 404;
            return setErrorResponse('Comment not found!', res, statusCode);
        } else {
            // calling success reponse fn and passing data
            return setSuccessfulResponse(comment, res);
        }
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// fn to remove a comment
export const remove = async (req, res) => {
    try {
        // getting id from query
        const id = req.query.id;
        if (!id) {
            let statusCode = 404;
            return setErrorResponse('ID not defined!', res, statusCode);
        }
        let comment = await commentService.remove(id);
        // if comment is not found then send err
        if (!comment) {
            let statusCode = 404;
            return setErrorResponse('Comment not found!', res, statusCode);
        } else {
            // calling success reponse fn and passing data
            return setSuccessfulResponse({ comment, msg: 'Deleted Sucessfully' }, res);
        }
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// get comment by id
export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        let comment = await commentService.getById(id);
        // if comment is not found then send err
        if (!comment) {
            let statusCode = 404;
            return setErrorResponse('Comment not found!', res, statusCode);
        } else {
            // calling success reponse fn and passing data
            return setSuccessfulResponse(comment, res);
        }
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// update by id
export const putById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            let statusCode = 404;
            return setErrorResponse('ID not defined!', res, statusCode);
        }
        const updateComment = req.body;
        let comment = await commentService.update(id, updateComment);
        // if comment is not found then send err
        if (!comment) {
            let statusCode = 404;
            return setErrorResponse('Comment not found!', res, statusCode);
        } else {
            // calling success reponse fn and passing data
            return setSuccessfulResponse(comment, res);
        }
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// remove by id fn to find and remove
export const removeById = async (req, res) => {
    try {
        const id = req.params.id;
        // if no id in req
        if (!id) {
            let statusCode = 404;
            return setErrorResponse('ID not defined!', res, statusCode);
        }
        let comment = await commentService.remove(id);
        // if comment not found then send err
        if (!comment) {
            let statusCode = 404;
            return setErrorResponse('Comment not found!', res, statusCode);
        } else {
            // calling success reponse fn and passing data
            return setSuccessfulResponse({ comment, msg: 'Deleted Sucessfully' }, res);
        }
    }
    catch (err) {
        // calling error fn and passing data
        return setErrorResponse(err, res);
    }
}

// success response fn to send response
const setSuccessfulResponse = (obj, res) => {
    res.status(200);
    // validating json 
    const responseData = JSON.parse(JSON.stringify(obj));
    res.json(responseData);
}

// error response fn to send error
const setErrorResponse = (err, res, statusCode) => {
    if (!statusCode) res.status(500);
    else res.status(statusCode);
    res.json({
        error: {
            message: err
        }
    })
}