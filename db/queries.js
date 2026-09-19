const { prisma } = require("../lib/prisma");

async function postDetails(fullName,email, password) {
    const user = await prisma.user.create({
        data: {
            name:fullName,
            email: email,
            password: password
        }
    });
    console.log("USER CREATED:", user);

    return user;
}

async function getUserByIdentifier(identifier) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { name: identifier },
                { email: identifier }
            ],
        },
    });

    return user;
}
async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    });
}
module.exports = {
        getUserByIdentifier,
        postDetails,
        getUserById
};