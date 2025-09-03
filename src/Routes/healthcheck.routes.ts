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
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessResponse"
 *             example:
 *                 success: true
 *                 statusCode: 200
 *                 message: "Server is running"
 *                 data: {}
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").get(healthcheck);

export default router;
