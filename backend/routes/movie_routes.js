import express from "express"
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingmovies } from "../controllers/movie_controller.js";

const router=express.Router();


router.get("/trending", getTrendingmovies)
router.get("/:id/trailers", getMovieTrailers)
router.get("/:id/details", getMovieDetails)
router.get("/:id/similar", getSimilarMovies)
router.get("/:category", getMoviesByCategory);

export default router;

