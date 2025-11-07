import express, { Request, Response } from "express";
import prisma from "../db";

const router = express.Router();

//GET - all meals
router.get("/", async (_req: Request, res: Response) => {
    try {
        const meals = await prisma.meal.findMany();
        res.json(meals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch meals" });
    }
});

// GET - meal by tag ID (for RFID scan)
router.get("/tag/:tagId", async (req: Request, res: Response) => {
    try {
        const meal = await prisma.meal.findUnique({
            where: { tagId: req.params.tagId },
        });
        if (!meal) return res.status(404).json({ message: "Meal not found" });
        res.json(meal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching meal" });
    }
});

// POST - add a new meal
router.post("/", async (req: Request, res: Response) => {
    const { name, protein, carbs, fats, calories, tagId } = req.body;
    if (!name || !tagId)
        return res.status(400).json({ message: "Name and Tag ID are required" });

    try {
        const newMeal = await prisma.meal.create({
            data: {
                name,
                protein: Number(protein),
                carbs: Number(carbs),
                fats: Number(fats),
                calories: Number(calories),
                tagId
            },
        });
        res.status(201).json(newMeal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create meal" });
    }
});

export default router;