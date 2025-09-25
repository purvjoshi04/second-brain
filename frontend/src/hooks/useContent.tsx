import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useContents = () => {
    const [contents, setContents] = useState([]);

    const fetchContents = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log("API Response:", response.data);
            setContents(response.data.content);
        } catch (error) {
            console.error("Failed to fetch contents:", error);
        }
    };

    useEffect(() => {
        fetchContents();
    }, []);

    return { contents, refetch: fetchContents };
}