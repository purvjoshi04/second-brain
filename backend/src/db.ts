import mongoose, { model, Mongoose, Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
})


const ContentSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}, 
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String
})


const LinkSchema = new Schema({
    hash: String,
    userId: [{type: mongoose.Types.ObjectId, ref: "User", required:true,}]
})

const TagSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true},
    title: String
})

const UserModel = model("User", UserSchema)
const ContentModel = model("Content", ContentSchema);
const LinkModel = model("Links", LinkSchema);
const TagModel = model("Tag", TagSchema);

export {
    UserModel,
    ContentModel,
    LinkModel,
    TagModel
}