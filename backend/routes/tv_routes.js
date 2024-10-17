import express from "express"
import {getTrendingTV, getTVTrailers , getTVDetails, getSimilarTV, getTVByCategory} from "../controllers/tv_shows_controller.js"
const router=express.Router();

router.get("/trending", getTrendingTV)
router.get("/:id/trailers", getTVTrailers)
router.get("/:id/details", getTVDetails)
router.get("/:id/similar", getSimilarTV)
router.get("/:category", getTVByCategory);

export default router;