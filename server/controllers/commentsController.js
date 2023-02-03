const asyncHandler = require('express-async-handler')
const Tree = require('../models/Tree')
const User = require('../models/User')
const Comment = require('../models/Comment')


//@desc Put a comment on a tree
//@route POST /trees/comment
//@access Private

const commentTree = asyncHandler(async (req,res) => {
    const { user_id, tree_id, content } = req.body

    const user = await User.findById(user_id).select("-password").exec()

    if(!user) return res.json({"Message": "User not found"})

    const foundTree = await Tree.findById(tree_id).exec()

    if(!foundTree) return res.json({"Message": "Tree does not exist"})

    const createdComment = await Comment.create({user_id, tree_id, content})

    res.json({message: `Created comment with content: ${createdComment.content}`})


})

//@desc Edit a comment on a tree
//@route PATCH /trees/comment
//@access Private

const editComment = asyncHandler(async (req,res) => {
    const { user_id, tree_id, content } = req.body

    const user = await User.findById(user_id).select("-password").exec()

    if(!user) return res.json({"Message": "User not found"})

    const foundTree = await Tree.findById(tree_id).exec()

    if(!foundTree) return res.json({"Message": "Tree does not exist"})

    const previousComment = await Comment.findOne({user_id, tree_id}).exec()

    previousComment.content = content

    const updatedComment = await previousComment.save()


    res.json({message: `Updated comment with content: ${updatedComment.content}`})


})

//@desc Delete a comment on a tree
//@route DELETE /trees/comment
//@access Private

const deleteComment = asyncHandler(async (req,res) => {
    const { user_id, tree_id } = req.body

    const user = await User.findById(user_id).select("-password").exec()

    if(!user) return res.json({"Message": "User not found"})

    const foundComment =  await Comment.findOne({user_id, tree_id}).exec()


    if(parseInt(user._id) != parseInt(foundComment.user_id)) return res.json({message: `Cannot delete comments that are not from user`})


    const deletedComment = await Comment.deleteOne({user_id, tree_id}).exec()



    res.json({message: `Deleted comment`})


})

//@desc Get all comments on a tree
//@route GET /trees/comment
//@access Private

const getComments = asyncHandler(async (req,res) => {
    const { tree_id } = req.body

    const foundComments = await Comment.find({tree_id}).exec()

    res.json(foundComments)
})



module.exports = {
    commentTree,
    editComment,
    deleteComment,
    getComments
}