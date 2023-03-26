import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import User from './models/User.js'
import Article from './models/Article.js'

import auth from './routes/auth.js'
import articles from './routes/articles.js'
import comments from './routes/comments.js'

passport.use(User.createStrategy())

mongoose.connect(process.env.MONGO_URI)

const app = express()
const port = process.env.PORT || 3333;
const portSocket = process.env.PORT_SOCKET || 3334

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

app.use(cors({
    origin: 'https://storynest-frontend-production.up.railway.app',
    credentials: true,
}))


app.use('/api/articles', articles)
app.use('/api/auth', auth)
app.use('/api/comments/', comments)


// Socket
import { Server } from 'socket.io'
import { createServer } from 'http'
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://storynest-frontend-production.up.railway.app',
        methods: ['GET', 'POST'],
    }
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('get-document', async ({ documentId, userId }) => {
        const document = await findOrCreateArticle(documentId, userId)
        socket.join(documentId)
        socket.emit('load-document', document)

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('send-title', (title) => {
            socket.broadcast.to(documentId).emit('receive-title', title)
        })

        socket.on('save-document', async (data) => {
            await Article.findByIdAndUpdate(documentId, { data: data })
        })

        socket.on('save-title', async (title) => {
            await Article.findByIdAndUpdate(documentId, { title: title })
        })
    })
})

async function findOrCreateArticle(docId, userId) {
    if (docId == null && userId == null) return

    const document = await Article.findById(docId)

    if (document) return document

    console.log(userId)

    return await Article.create({ _id: docId, author: userId, data: '', title: '' })
}

server.listen(port, () => {
    console.log('server running..')
})