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

module.exports = {
        getUserById,
        getUserByIdentifier
};