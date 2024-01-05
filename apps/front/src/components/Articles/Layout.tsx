import React from "react";
import "../../style/article.scss";
import OneArticle from "./OneArticle";
import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import Loader from "../Loader";
import api from "../../services/api";
import Select from "../Select";

export default function Layout() {
    const [responseArticles, setResource] = React.useState([]);
    const [keywords, setKeywords] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.getArticles(keywords);
                setResource(data);
            } catch (error) {
                console.error("Error fetching cryptos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [keywords]);

    // TODO : remplacer par valeur de l'API
    const options = [
        { value: "bitcoin", label: "Bitcoin" },
        { value: "ethereum", label: "Ethereum" },
        { value: "TaMere", label: "TaMere" },
    ];

    console.log(keywords);
    console.log(responseArticles);
  return (
    <Box className="articleDisplayContainer">
        <form className="searchBarContainer">
            <Box className="selectSearchContainer">
                <Box className="selectSearch">
                    <Select
                        name="Select"
                        label="Choose a keyword"
                        options={options}
                        handleChange={(e: any) => setKeywords(e.target.value)}
                    />
                </Box>
            </Box>
        </form>

        <Box className="articleMasterContainer">
            <OneArticle/>
        </Box>
    </Box>
  );
}
