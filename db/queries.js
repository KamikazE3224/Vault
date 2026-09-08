const { prisma } = require("../lib/prisma");

async function postDetails(email,password){

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

module.exports = {
        getUserByIdentifier,
        postDetails
};