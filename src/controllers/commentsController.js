import Comment from '../models/Comment.js'

export const create = async (req, res) => {
    try {
        const comment = await Comment.create({ author: req.user.id, text: req.body.text, article: req.body.article })

        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const update = async (req, res) => {
    try {
        const update = await Comment.findByIdAndUpdate(req.params.id, { text: req.body.text }, { upsert: true })

        res.status(200).json({ 'msg': 'successfully updated' })
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const remove = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).deleteOne()

        res.status(200).json({ 'msg': 'successfully deleted' })
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const like = async (req, res) => {
    try {
        const comment = await Comment.find({ '_id': req.params.id }).where('likes').ne(req.user.id).updateOne({ $push: { 'likes': req.user.id }, $inc: { 'likeCount': 1 } })

        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const unlike = async (req, res) => {
    try {
        const comment = await Comment.find({ '_id': req.params.id }).where('likes').equals(req.user.id).updateOne({ $pull: { 'likes': req.user.id }, $inc: { 'likeCount': -1 } })

        res.status(200).json(Comment)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ article: req.params.id }).sort({ createdAt: 'desc' })

        res.status(200).json(comments)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getUserComments = async (req, res) => {
    try {
        const comments = await Comment.find({ author: req.user.id }).sort({ createdAt: 'desc' })

        res.status(200).json(comments)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}
