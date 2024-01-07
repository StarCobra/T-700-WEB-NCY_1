import React from "react";
import CryptoArray from "../Crypto/Array";
import CryptoChart from "../Crypto/Chart";
import Select from "../Select";
import {Box,SnackbarContent} from "@mui/material";
import { Link } from "react-router-dom";
import "../../style/cryptoDisplay.scss";
import api from "../../services/api";
import Loader from "../Loader";
import useAuth from "../../Context/UserProvider";

export default function Layout() {
  const { user } = useAuth();

  const [valueCrypto, setValueCrypto] = React.useState("btc");

  // responses API
  const [responseAllCrypto, setResponseAllCrypto] = React.useState([] as any);
  const [responseCandleStick, setResponseCandleStick] = React.useState(
    [] as any,
  );
  const [responseFavoriteCrypto, setResponseFavoriteCrypto] = React.useState(
    [] as any,
  );

  // loading
  const [loadingAllCrypto, setLoadingAllCrypto] = React.useState(true);
  const [loadingCandleStick, setLoadingCandleStick] = React.useState(true);
  const [loadingFavoriteCrypto, setLoadingFavoriteCrypto] =
    React.useState(true);

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

  // Requete pour récupérer les données pour le candlestick
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCandleStick(true);
        const data = await api.getCandleStick(valueCrypto);
        setResponseCandleStick(data);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoadingCandleStick(false);
      }
    };

    fetchData();
  }, [valueCrypto]);

  // Requete pour récupérer les données des cryptos favorites
  React.useEffect(() => {
    let favoriteCrypto = "";
    user?.favorite_cryptos?.map((item: any) => {
      favoriteCrypto += item.crypto + ",";
    });
    const fetchData = async () => {
      try {
        setLoadingFavoriteCrypto(true);
        const data = await api.getCryptos(favoriteCrypto);
        setResponseFavoriteCrypto(data);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoadingFavoriteCrypto(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="homeDisplay">
      <Box className="selectCryptoContainer">
        <Select
          label={loadingAllCrypto ? "Loading crypto..." : "Select a crypto(s):"}
          options={responseAllCrypto.data}
          forCrypto={true}
          handleChange={(e: any) => setValueCrypto(e.target.value)}
        />

        {user && (
          <Box className="prefContainer">
            <Link className="updatePreferencies" to={"/preferences"}>
              Click here to update preferencies
            </Link>
          </Box>
        )}
      </Box>

      <Box className="chartContainer">
        {loadingCandleStick ? (
          <Loader />
        ) : responseCandleStick?.data?.length > 0 ? (
          <CryptoChart
            resource={responseCandleStick?.data}
            title={
              valueCrypto !== ""
                ? `CandleStick of ${valueCrypto}`
                : "Select a crypto"
            }
          />
        ) : (
          <SnackbarContent message="No data for this crypto" />
        )}
      </Box>

      {user ? (
        <Box>
          {loadingFavoriteCrypto ? (
            <Loader />
          ) : (
            responseFavoriteCrypto?.data?.length > 0 && (
              <>
                <h3>Table of your preferences crypto</h3>
                <CryptoArray resource={responseFavoriteCrypto?.data} />
              </>
            )
          )}
        </Box>
      ) : (
        <Box>
          <h3>
            Log in to benefit from a personalized view of your favorite cryptos
          </h3>
        </Box>
      )}
    </Box>
  );
}
