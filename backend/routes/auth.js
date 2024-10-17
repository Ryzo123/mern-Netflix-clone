
import express from "express"
import { signup, login, logout, authcheck } from "../controllers/auth_controller.js";
import { protectedRoute } from "../middleware/protectedroute.js";

const router=express.Router();

router.post("/signup",signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/authcheck", protectedRoute, authcheck)

export default router;