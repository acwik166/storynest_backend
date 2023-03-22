import express from 'express'

import { create, remove, update, getComments, getUserComments, like, unlike } from '../controllers/commentsController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import isAuthor from '../middleware/isAuthor.js'

const router = express.Router()

router.post('/', isAuthenticated, create)
router.delete('/:id', isAuthenticated, isAuthor('Comment'), remove)
router.put('/:id', isAuthenticated, isAuthor('Comment'), update)
router.put('/like/:id', isAuthenticated, like)
router.put('/unlike/:id', isAuthenticated, unlike)
router.get('/user', isAuthenticated, getUserComments)
router.get('/article/:id', getComments)


export default router