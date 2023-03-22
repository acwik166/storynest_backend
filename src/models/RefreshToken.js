import { Schema, model } from 'mongoose'

const RefreshTokenSchema = Schema({
    token: String,
}, { timestamps: true })

const RefreshToken = model('RefreshToken', RefreshTokenSchema)

export default RefreshToken