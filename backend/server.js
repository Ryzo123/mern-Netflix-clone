
import express from 'express';
import authRoutes from "./routes/auth.js"
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';
import movieRoutes from "./routes/movie_routes.js"
import tvseriesRoutes from "./routes/tv_routes.js"
import {protectedRoute}  from './middleware/protectedroute.js';
import cookieParser from 'cookie-parser';
import SearchRoutes from "./routes/search_routes.js"
import path from "path"


const app=express();

const PORT=ENV_VARS.PORT
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie",protectedRoute,movieRoutes)
app.use("/api/v1/tvseries",protectedRoute, tvseriesRoutes)
app.use("/api/v1/search",protectedRoute, SearchRoutes)

if(ENV_VARS.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    } )
}

app.listen(PORT, ()=>{
    console.log("server started")
    connectDB();
})


