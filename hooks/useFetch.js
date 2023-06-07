import { useState, useEffect } from "react";
import axios from "axios";
import {
  ALPHA_VANTAGE_KEY,
  RAPID_API_KEY,
  FINANCIALMODELING_API_KEY,
} from "@env";

const useFetch = (api, endpoint, query, checkApi = false) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let options = {};

  // switch the api based on what api and endpoint is passed
  switch (api) {
    case "rapidapi":
      options = {
        method: "GET",
        url: `https://twelve-data1.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };
      break;
    case "financialmodelingprep":
      options = {
        method: "GET",
        url: `https://financialmodelingprep.com/api/v3/${endpoint}`,
        params: { apikey: FINANCIALMODELING_API_KEY },
      };
      break;
    case "alphavantage":
      options = {
        method: "GET",
        url: `https://www.alphavantage.co/query?`,
        params: { ...query, apikey: ALPHA_VANTAGE_KEY },
      };
      break;
    default:
      console.log(`Use a valid api string`);
      return { data, isLoading, error, refetch };
  }

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      if (response.data?.code === 429) {
        setError(response.data?.message);
      } else if (response.data?.code === 400) {
        setError(response.data?.message);
      } else {
        setData(checkApi ? response : response.data);
        setIsLoading(false);
      }
      // console.log("API request from: ", api);
    } catch (error) {
      setError(error?.message ?? error);
      // console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // refetch data
  const refetch = () => {
    setIsLoading(true);
    setError(null);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
