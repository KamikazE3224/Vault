const { prisma } = require("../lib/prisma");

async function getUserByIdentifier(identifier){
        const user = await prisma.user.findFirst({
        where: {
            OR: [
                {name: identifier },
                {email: identifier }
            ],
        },
    });

    return user;
}

async function getUserById(id){
        return await prisma.user.findUnique({
        where: {
            id: id
        }
    });
}

async function SignUpUser(name,email,password){
        const user = await prisma.user.create({
                name:name,
                email:email,
                password:password
        });
        console.log("USER CREATED:", user);
}

module.exports = {
        getUserById,
        getUserByIdentifier,
        SignUpUser
};