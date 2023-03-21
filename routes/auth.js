import express from 'express'
import passport from 'passport'

import { login, logout, register, update, getUser, refresh } from '../controllers/authController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', passport.authenticate('local', { session: false }), login)
router.post('/logout', logout)
router.get('/:id', getUser)
router.put('/:id', isAuthenticated, update)
router.post('/refresh', isAuthenticated, refresh)

export default router