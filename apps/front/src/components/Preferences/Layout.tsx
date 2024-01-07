import React from "react";
import { Box } from "@mui/material";
import CryptoArray from "../Crypto/Array";
import Select from "../Select";
import "../../style/preferencies.scss";
import "../../style/cryptoDisplay.scss";
import api from "../../services/api";
import Loader from "../Loader";

export default function Layout() {
  const [favoriteCrypto, setFavoriteCrypto] = React.useState([]);

  const [responseAllCrypto, setResponseAllCrypto] = React.useState([] as any);
  const [loadingAllCrypto, setLoadingAllCrypto] = React.useState(true);

  // Requete pour récupérer toutes les cryptos
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingAllCrypto(true);
        const data = await api.getAllCryptos();
        setResponseAllCrypto(data);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoadingAllCrypto(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="preferencesLayout">
      <Box className="headerContainer">
        <h3>Preferences page</h3>
        <small>
          This page is used to manage your preferences. You can choose your
          favorite crypto.
        </small>
        <small>
          The chosen crypto will be displayed on the home page and you&apos;ll
          receive in priority the new articles about it.
        </small>
      </Box>
      <Box className="arrayContainer">
        {loadingAllCrypto ? (
          <Loader />
        ) : (
          <>
            <h3>Table of cryptos available</h3>
            <CryptoArray resource={responseAllCrypto.data} />
          </>
        )}
      </Box>
      <Box className="addPrefContainer">
        <Box className="selectContainer">
          <h3>Add crypto to your favorite cypto</h3>
          <Select
            name="Select"
            label={
              loadingAllCrypto
                ? "Loading crypto..."
                : "Favorite crypto(s) chosen:"
            }
            type="multiple"
            options={responseAllCrypto.data}
            forCrypto={true}
            handleChange={(e: any) => setFavoriteCrypto(e.target.value)}
          />
        </Box>
        <Box className="cryptoDisplayContainer">
          <h3>
            You have chosen {favoriteCrypto.length} crypto(s) as favorite crypto
            :
          </h3>
          {favoriteCrypto.length > 0 && (
            <ul>
              {favoriteCrypto.map((crypto: any) => (
                <li key={crypto}>{crypto}</li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </Box>
  );
}
