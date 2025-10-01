import pkg from 'mongoose';
const { Schema, model } = pkg;

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

export default model("user", UserSchema);