import express from 'express'
import { getOne, remove, getAll, getTop, getUserArticle, getUserArticles, like, unlike, grade } from '../controllers/articlesController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import isAuthor from '../middleware/isAuthor.js'

const router = express.Router()

router.get('/', getAll)
router.get('/top', getTop)
router.get('/user/:id', isAuthenticated, isAuthor('Article'), getUserArticle)
router.get('/user/', isAuthenticated, getUserArticles)
router.get('/:id', getOne)
router.delete('/:id', isAuthenticated, isAuthor('Article'), remove)
router.put('/like/:id', isAuthenticated, like)
router.put('/unlike/:id', isAuthenticated, unlike)
router.put('/grade/:id', isAuthenticated, grade)

export default router