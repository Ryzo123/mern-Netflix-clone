import { fetchFromTMDB } from "../services/tmdbservice.js";


export async function getTrendingmovies(req,res){
    
    try {

        const data=await fetchFromTMDB("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")
        const movie=data.results[Math.floor(Math.random()*data.results?.length)];
        res.json({
            success:true,
            content:movie
        })
        
    } catch (error) {
        res.status(411).json({
            success:false,

            message:"cannot fetch sorry!"
        })
        
    }
}

export async function getMovieTrailers(req, res){

    const {id}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({
            success:true,
            trailers:data.results
        })
    } catch (error) {
        res.status(411).json({
            success:false,
            message:"cannot fetch"
        })
    }
    

}

export async function getMovieDetails(req, res){

    const {id}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.json({
            success:true,
            content:data
        })
    } catch (error) {
        res.status(411).json({
            success:false,
            message:"cannot fetch"
        })
    }
    

}

export async function getSimilarMovies(req, res){

    const {id}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.json({
            success:true,
            similar:data.results
        })
    } catch (error) {
        res.status(411).json({
            success:false,
            message:"cannot fetch"
        })
    }
    

}
export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}