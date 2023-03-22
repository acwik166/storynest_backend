import Article from '../models/Article.js'

export const getOne = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })

        res.status(200).json(article)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getAll = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' })

        res.status(200).json(articles)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getTop = async (req, res) => {
    try {
        const count = req.query.count || 6
        const articles = await Article.find().sort({ likeCount: 'desc' }).limit(count)

        res.status(200).json(articles)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const remove = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).deleteOne()

        res.status(200).json({ 'msg': 'successfully deleted' })
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getUserArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })

        res.status(200).json(article)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getUserArticles = async (req, res) => {
    try {
        const articles = await Article.find({ author: req.user.id }).sort({ createdAt: 'desc' })

        res.status(200).json(articles)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const like = async (req, res) => {
    try {
        const article = await Article.find({ '_id': req.params.id }).where('likes').ne(req.user.id).updateOne({ $push: { 'likes': req.user.id }, $inc: { 'likeCount': 1 } })

        res.status(200).json(article)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const unlike = async (req, res) => {
    try {
        const article = await Article.find({ '_id': req.params.id }).where('likes').equals(req.user.id).updateOne({ $pull: { 'likes': req.user.id }, $inc: { 'likeCount': -1 } })

        res.status(200).json(article)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const grade = async (req, res) => {
    try {
        const article = await Article.find({ '_id': req.params.id }).where('grades').ne(req.user.id).updateOne({ $push: { 'grades': req.user.id, 'gradeList': req.body.grade } })

        res.status(200).json(article)
    } catch (error) {
        console.log(error)
        res.status(404).json({ 'msg': 'error' })
    }
}





