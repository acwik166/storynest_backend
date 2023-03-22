import jwt from 'jsonwebtoken'

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization || ''

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    } else {
        return res.sendStatus(401)
    }
}

export default isAuthenticated