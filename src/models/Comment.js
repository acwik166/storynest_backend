import { Schema, model } from 'mongoose'

const CommentSchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    text: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likeCount: 0
}, { timestamps: true })

const Comment = model('Comment', CommentSchema)

export default Comment