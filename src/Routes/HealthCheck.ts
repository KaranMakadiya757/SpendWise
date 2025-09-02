import { Router } from "express";
import { healthcheck } from "../Controllers/healthcheck.controller";

const router = Router();

// Health check route
/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Health check
 *     tags: [Health Check]
 *     security: []
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.route("/").get(healthcheck);

export default router;
