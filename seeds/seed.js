const sequelize = require("../config/connection")
const { User, Blog, Comment } = require("../models")

const users = [
    {
        username: "Jonah",
        password: "password1"
    },
    {
        username: "Kyle",
        password: "password2"
    },
    {
        username: "Derek",
        password: "password3"
    },

]

const blogs = [
    {
        title: "Hello",
        content: "Hi",
        userId: 1
    },
    {
        title: "Hi",
        content: "Hello",
        userId: 1
    },
    {
        title: "Hey",
        content: "Huh",
        userId: 2
    },
    {
        title: "What",
        content: "?",
        userId: 3
    },
]

const comments = [
    {
        body: "Hey there!",
        blogId: 1,
        userId: 1
    },
    {
        body: "Hi there!",
        blogId: 3,
        userId: 2
    },
    {
        body: "Ho there!",
        blogId: 4,
        userId: 1
    },

]

const seedDatabase = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

seedDatabase();