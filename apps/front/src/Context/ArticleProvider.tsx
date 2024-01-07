import React, { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";

interface ArticleProviderProps {
  children: ReactNode;
}

const ArticleContext = createContext<any | undefined>(undefined);

export const ArticleProvider: React.FC<ArticleProviderProps> = ({
  children,
}) => {
  const [currentArticle, setCurrentArticle] = useState(null);

  const setArticle = (article: any) => {
    setCurrentArticle(article);
  };

  return (
    <ArticleContext.Provider value={{ currentArticle, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

ArticleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useArticle = () => {
  return useContext(ArticleContext);
};
