import { fetchFromTMDB } from "../services/tmdbservice.js";


export async function getTrendingTV(req,res){
    
    try {

        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
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

export async function getTVTrailers(req, res){

    const {id}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
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

export async function getTVDetails(req, res){

    const {id}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
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

export async function getSimilarTV(req, res){

    const {id}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
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
export async function getTVByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}