
import React, { useState } from 'react'
import { useAuthStore } from '../../store/authuser'
import Navbar from '../../components/Navbar'
import { Info, MoveIcon, Play } from 'lucide-react'
import {Link} from 'react-router-dom'
import useGetTrendingContent from '../../hooks/useGetTrendingContent'
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from '../../utils/constants'
import { useContentStore } from '../../store/content'
import MovieSlider from '../../components/MovieSlider'

const HomeScreen = () => {
  const {TrendingContent}=useGetTrendingContent();
  const {contentType}=useContentStore();
  const {imageloading, setimageloading}=useState(true)
    const{logout}=useAuthStore()

    if(!TrendingContent) return (
      <div className='h-screen text-white relative'>
        <Navbar/>
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />

      </div>
    )
  return (
    <>
    <div className='relative h-screen text-white '>
				
        <Navbar/>
        {imageloading && (
           <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
        )}
				<img
					src={ORIGINAL_IMG_BASE_URL + TrendingContent?.backdrop_path}
					alt='Hero img'
					className='absolute top-0 left-0 w-full h-full object-cover -z-50'
          onLoad={()=>{
              setimageloading(false);
          }}
					
				/>

				<div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
					<div
						className='bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10'
					/>

					<div className='max-w-2xl'>
						<h1 className='mt-4 text-6xl font-extrabold text-balance'>
							{TrendingContent?.title || TrendingContent?.name}
						</h1>
						<p className='mt-2 text-lg'>
							{TrendingContent?.release_date?.split("-")[0] ||
								TrendingContent?.first_air_date.split("-")[0]}{" "}
							| {TrendingContent?.adult ? "18+" : "PG-13"}
						</p>

						<p className='mt-4 text-lg'>
							{TrendingContent?.overview.length > 200
								? TrendingContent?.overview.slice(0, 200) + "..."
								: TrendingContent?.overview}
						</p>
					</div>

					<div className='flex mt-8'>
						<Link
							to={`/watch/${TrendingContent?.id}`}
							className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center'
						>
							<Play className='size-6 mr-2 fill-black' />
							Play
						</Link>

						<Link
							to={`/watch/${TrendingContent?.id}`}
							className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
						>
							<Info className='size-6 mr-2' />
							More Info
						</Link>
					</div>
				</div>
			</div>

      <div className='flex flex-col gap-10 bg-black py-10'>
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
			</div>
    </>
  )
}

export default HomeScreen