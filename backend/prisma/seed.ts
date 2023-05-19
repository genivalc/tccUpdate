// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create users
    const post1 = await prisma.users.upsert({
        where: {},
        update: {},
        create: {
            name: 'Genival Neto',
            email: 'genival@teste.com',
            password: '123',
            apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165'
        },
    });
    const post2 = await prisma.feedbacks.upsert({
        where: {},
        update: {},
        create: {
            text: 'Muito bom!',
            fingerprint: '490135491',
            apiKey: 'fcd5015c-10d3-4e9c-b395-ec7ed8850165',
            type: 'OTHER',
            device: 'Chrome 85.0, macOS 10.14',
            page: 'https://feedbacker.com/pricing',
        },
    });

    console.log({ post1, post2 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });