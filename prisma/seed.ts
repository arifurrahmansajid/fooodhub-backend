import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { PrismaClient } from "./generated/prisma/client.ts";
import { categories, providers, meals } from "./seed-data";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Cleaning database...");
    await prisma.meal.deleteMany();
    await prisma.category.deleteMany();
    await prisma.providerProfile.deleteMany();
    await prisma.user.deleteMany();

    console.log("Seeding categories...");
    const createdCategories = await Promise.all(
        categories.map((category) =>
            prisma.category.create({
                data: category,
            })
        )
    );
    console.log(`Created ${createdCategories.length} categories.`);

    console.log("Seeding providers...");
    const createdProviders = await Promise.all(
        providers.map(async (provider) => {
            const user = await prisma.user.create({
                data: {
                    id: `user_${Math.random().toString(36).substr(2, 9)}`,
                    name: provider.name,
                    email: provider.email,
                    role: "PROVIDER",
                    status: "ACTIVE",
                },
            });

            const profile = await prisma.providerProfile.create({
                data: {
                    shopName: provider.shopName,
                    userId: user.id,
                },
            });

            return { user, profile };
        })
    );
    console.log(`Created ${createdProviders.length} providers.`);

    console.log("Seeding meals...");
    for (const meal of meals) {
        const category = createdCategories.find((c) => c.name === meal.categoryName);
        const provider = createdProviders.find(
            (p) => p.profile.shopName === meal.providerShopName
        );

        if (category && provider) {
            await prisma.meal.create({
                data: {
                    name: meal.name,
                    details: meal.details,
                    price: meal.price,
                    image_url: meal.image_url,
                    categoryId: category.id,
                    providerId: provider.profile.id,
                },
            });
        }
    }
    console.log(`Created ${meals.length} meals.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
