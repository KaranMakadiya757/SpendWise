import { Router } from "express";
import { healthcheck } from "../Controllers/healthcheck.controller";

const router = Router();

// Health check route
router.route("/").get(healthcheck);

export default router;
