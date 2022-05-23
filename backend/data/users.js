import bcrypt from 'bcryptjs'

const users = [
    {
        name : 'Ankit',
        email : "ankit@gmail.com",
        password : bcrypt.hashSync('ankit',10),
        isAdmin : true,
    },
    {
        name : 'Mohit',
        email : "mohit@gmail.com",
        password : bcrypt.hashSync('mohit',10)
    },
    {
        name : 'sid',
        email : "sid@gmail.com",
        password : bcrypt.hashSync('sid',10)
    }
]

export default users