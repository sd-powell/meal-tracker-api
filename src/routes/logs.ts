import express, { Request, Response } from "express";
import prisma from "../db";

const router = express.Router();

// POST /api/logs - record a scan event
router.post("/", async (req: Request, res: Response) => {
    const { tagId, status } = req.body;

    if (!tagId) {
        return res.status(400).json({ message: "tagId is required" });
    }

    try {
        // Find the corresponding meal by tagId
        const meal = await prisma.meal.findUnique({ where: { tagId } });
        if (!meal) {
            return res.status(404).json({ message: "Meal not found for this tagId" });
        }
        
        // Create a new log entry linked to that meal
        const newLog = await prisma.log.create({
            data: {
                tagId,
                mealName: meal.name,
                status: status || "eaten",
            },
        });

        res.status(201).json(newLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create log" });
    }
});

// GET /api/logs - get all logs
router.get("/", async (_req: Request, res: Response) => {
    try {
        const logs = await prisma.log.findMany({
            orderBy: { timestamp: "desc" },
        });
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch logs" });
    }
});

// PUT /api/logs/:id - update status
router.put("/:id", async (req: Request, res: Response) => {
    const { status } = req.body;
    const logId = Number(req.params.id);

    if (!["prepped", "eaten"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const updated = await prisma.log.update({
            where: { id: logId },
            data: { status },
        });
        res.json(updated);
    } catch (error) {
        const err = error as any;
        console.error(error);
        if (err.code === 'P2025') {
            // Prisma error code for "Record to update does not exist."
            return res.status(404).json({ message: "Log not found" });
        }
        res.status(500).json({ message: "Failed to update log" });
    }
});

// DELETE /api/logs/:id - delete a specific log entry by ID
router.delete("/:id", async (req: Request, res: Response) => {
    const logId = parseInt(req.params.id);

    if (isNaN(logId)) {
        return res.status(400).json({ message: "Invalid log ID" });
    }

    try {
        const deletedLog = await prisma.log.delete({
            where: { id: logId },
        });
        res.json({ message: "Log deleted successfully", deletedLog });
    } catch (error) {
        const err = error as any;
        console.error(error);
        if (err.code === 'P2025') {
            // Prisma error code for "Record to delete does not exist."
            return res.status(404).json({ message: "Log not found" });
        }
        res.status(500).json({ message: "Failed to delete log" });
    }
});

// DELETE /api/logs/tag/:tagId - delete all logs for a given tagId
router.delete("/tag/:tagId", async (req: Request, res: Response) => {
    try {
        const deleted = await prisma.log.deleteMany({
            where: { tagId: req.params.tagId },
        });

        if (deleted.count === 0) {
            return res.status(404).json({ message: "No logs found for this tag" });
        }

        res.json({
            message: `Deleted ${deleted.count} logs for tag ${req.params.tagId}`,
        });
    } catch (error) {
        const err = error as any;
        console.error(err);
        res.status(500).json({ message: "Failed to delete logs" });
    }
});

export default router;