import { Schema, model } from 'mongoose'

const ArticleSchema = new Schema({
    _id: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    title: String,
    data: Object,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likeCount: 0,
    grades: [{ type: Schema.Types.ObjectId, ref: 'Grade' }],
    gradeList: [{ type: Schema.Types.Number }],
}, { toJSON: { virtuals: true }, timestamps: true })

ArticleSchema.virtual('totalGrade').get(function () {
    if (this.gradeList == null) return

    const grade = this.gradeList.reduce((acc, grade) => { return acc + grade }, 0)

    return (grade / this.grades.length).toFixed(2)
})


const Article = model('Article', ArticleSchema)

export default Article

