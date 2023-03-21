import { Schema, model } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

const User = model('User', UserSchema)

export default User