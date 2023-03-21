import User from '../models/User.js'
import RefreshToken from '../models/RefreshToken.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const accessToken = jwt.sign({ id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300000 })
        const refreshToken = jwt.sign({ id: req.user._id }, process.env.REFRESH_TOKEN_SECRET)

        const refresh = await RefreshToken.create({ token: refreshToken })

        const user = await User.findById(req.user._id)

        res.status(200).json({ user: user, accessToken: accessToken, refreshToken: refreshToken })
    } catch (error) {
        res.status(404).json({ msg: 'error' })
    }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)

        const token = await RefreshToken.findOneAndRemove({ token: refreshToken })

        return res.sendStatus(200)
    } catch (error) {
        res.status(404).json({ msg: 'error' })
    }
}

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const user = User({ first_name, last_name, email })
        await User.register(user, password)

        res.status(201).json({ 'msg': 'User created successfully' })
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const update = async (req, res) => {
    try {
        const first_name = req.body.first_name.trim()
        const last_name = req.body.last_name.trim()
        const email = req.body.email.trim()
        const old_password = req.body.old_password.trim()
        const password = req.body.password.trim()

        if (!first_name || !last_name || !email || !password || !old_password) return res.sendStatus(404)

        const user = await User.findByIdAndUpdate(req.params.id, { first_name: first_name, last_name: last_name, email: email })

        user.changePassword(old_password, password, function (err) {
            if (err) {
                return res.status(204).json({ 'msg': 'failed to update' })
            } else {
                return res.status(200).json({ 'msg': 'user updated successfully' })
            }
        })

    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)

        const token = RefreshToken.find({ token: refreshToken })
        if (token == null) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = jwt.sign({ id: req.user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1200 })

            return res.status(200).json({ accessToken: accessToken })
        })
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ 'msg': 'error' })
    }
}



