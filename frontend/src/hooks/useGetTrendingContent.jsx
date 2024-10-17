import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
    const [TrendingContent, setTrendingContent] = useState(null);
    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
            const response = await axios.get(`/api/v1/${contentType}/trending`, {
                headers: { 'Content-Length': '0' }  // Explicitly defining Content-Length as 0
            });
            setTrendingContent(response.data.content);
        };

        getTrendingContent();
    }, [contentType]);

    return { TrendingContent };
}


export default useGetTrendingContent