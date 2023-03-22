import Article from '../models/Article.js'
import Comment from '../models/Comment.js'

const isAuthor = (model) => {
    return async (req, res, next) => {

        switch (model) {
            case 'Article':
                model = Article
                break
            case 'Comment':
                model = Comment
                break
            default:
                break
        }

        const modelInstance = await model.findById(req.params.id)

        if (modelInstance === null) return res.status(404).json({ 'msg': 'Couldnt find an object' })

        if (modelInstance.author == req.user.id) {
            next()
        } else {
            res.sendStatus(403)
        }
    }
}

export default isAuthor