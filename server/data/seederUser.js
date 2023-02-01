
const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URI)
.then(() => {
    console.log('seeding ok')
})
.catch((err) => {
    console.log(err)
})

const users = [
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    },
    {
        password: "1234"
    }
]

const colors = ["blue", "green", "red", "orange", "purple", "yellow", "brown", "white", "black"]


for (let i = 0; i< users.length; i++) {


    let leaves = Math.floor((Math.random() + 1) * 1000)

    // get random index value
    const randomIndex = Math.floor(Math.random() * colors.length);

    // get random item
    const item = colors[randomIndex];

    

    users[i].username = `Test${i}`
    users[i].email = `test${i}@gmail.com`
    users[i].leaves = leaves
    users[i].color = item

} 



const seedDB = async () => {
    await User.deleteMany({})
    await User.insertMany(users)

}

seedDB().then(() => {
    mongoose.connection.close()
})