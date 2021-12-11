import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: 6,
        max: 64
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
}, {timestamps: true});

userSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                console.error('bcrypt hash error: ', err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    }
    return next();
});

export default model("User", userSchema);