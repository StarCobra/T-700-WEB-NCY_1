import React, { useEffect } from "react";
import "../../style/article.scss";
import OneArticle from "./OneArticle";
import { Box, SnackbarContent } from "@mui/material";
import Loader from "../Loader";
import api from "../../services/api";
import Select from "../Select";
import useAuth from "../../Context/UserProvider";

export default function Layout() {
  const { user, userToken } = useAuth();

  const [responseArticles, setResonseArticles] = React.useState([] as any);
  const [responseKeywords, setResponseKeywords] = React.useState([] as any);
  const [keywords, setKeywords] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getArticles(keywords, userToken ?? "");
        setResonseArticles(data);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keywords]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getKeywords(false, userToken ?? "");
        setResponseKeywords(data);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="articleDisplayContainer">
      {user && responseKeywords?.data?.length > 0 && (
        <form className="searchBarContainer">
          <Box className="selectSearchContainer">
            <Box className="selectSearch">
              <Select
                name="Select"
                type="multiple"
                label="Choose a keyword"
                forkeyword={true}
                options={responseKeywords ? responseKeywords.data : []}
                handleChange={(e: any) => setKeywords(e.target.value)}
              />
            </Box>
          </Box>
        </form>
      )}
      <Box className="articleMasterContainer">
        {loading ? (
          <Loader />
        ) : responseArticles?.data?.length > 0 ? (
          <>
            {responseArticles?.data?.map((article: any) => (
              <Box key={article?.title}>
                <OneArticle article={article} />
              </Box>
            ))}
          </>
        ) : (
          <SnackbarContent message="No data with this keywords" />
        )}
      </Box>
    </Box>
  );
}
