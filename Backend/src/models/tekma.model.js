import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true, // popravljeno
            trim: true,
            minLength: 1,
            maxLength: 30,
        },
        password: { // popravljeno
            type: String,
            required: true,
            minLength: 6,
            maxLength: 100, // povečaj, ker hash zavzame več prostora
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 5, // zmanjšano za krajše emaile
            maxLength: 100,
        },
    }, {
    timestamps: true,
}
);


//before saving the user, hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

//method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User', userSchema);