import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const meals = [
        {
            name: "Grilled Chicken Salad",
            protein: 35,
            carbs: 10,
            fats: 5,
            calories: 300,
            tagId: "MEAL001",
        },
        {
            name: "Beef Stir Fry",
            protein: 40,
            carbs: 20,
            fats: 12,
            calories: 420,
            tagId: "MEAL002",
        },
        {
            name: "Miso Salmon Bowl",
            protein: 38,
            carbs: 45,
            fats: 14,
            calories: 520,
            tagId: "MEAL003",
        },
    ];

    for (const meal of meals) {
        await prisma.meal.upsert({
            where: { tagId: meal.tagId },
            update: meal,
            create: meal,
        });
    }

    console.log("Seed data inserted successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });