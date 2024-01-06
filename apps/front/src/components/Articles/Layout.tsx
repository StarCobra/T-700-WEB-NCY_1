import React from "react";
import "../../style/article.scss";
import OneArticle from "./OneArticle";
import { Box } from "@mui/material";
import Loader from "../Loader";
import api from "../../services/api";
import Select from "../Select";

export default function Layout(props: any) {
  const { user = null } = props;

  const [responseArticles, setResonseArticles] = React.useState([] as any);
  const [keywords, setKeywords] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getArticles(keywords);
        setResonseArticles(data);
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

  return (
    <Box className="articleDisplayContainer">
      {user && (
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
      )}
      {loading ? (
        <Loader />
      ) : (
        <Box className="articleMasterContainer">
          {responseArticles.data.map((article: any) => (
            <Box key={article?.title}>
              <OneArticle article={article} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
