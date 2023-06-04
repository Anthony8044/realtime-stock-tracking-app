import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";
import { db } from "../firebase-config";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

const useFetchWatchList = (api, endpoint, symbols) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const stocksRef = collection(db, "stocks");

  // IF STOCK DOES NOT EXIST
  // > fetch from api > add to firestore > get from firestore

  // MULTIPLE // IF ALL STOCKS EXISTS AND LAST UPDATED IS RECENT
  // > get all data from firestore

  // MULTIPLE // IF ALL STOCKS EXISTS AND AT LEAST ONE IS NOT RECENT
  // > fetch all from api > update firestore > get data from firestore

  let options = {
    method: "GET",
    url: `https://twelve-data1.p.rapidapi.com/${endpoint}`,
    params: {
      symbol: symbols.toString(),
      interval: "1day",
      format: "json",
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    const w = query(stocksRef, where("symbol", "in", symbols));
    const querySnapshot = await getDocs(w);
    const stocksData = querySnapshot.docs.map((d) => d.data());

    // const multipleExist = symbols.every((value) => {
    //   return stocksData.symbol.includes(value);
    // });

    setData(stocksData);
    // if (multipleExist) {
    //   console.log("test");
    // }

    // console.log(stocksData);

    // try {
    //   const response = await axios.request(options);
    //   if (response.data?.code === 429) {
    //     setError(response.data?.message);
    //   } else {
    //     setData(response.data);
    //     setIsLoading(false);
    //   }
    //   console.log("API request from: ", api);
    // } catch (error) {
    //   setError(error?.message ?? error);
    //   console.log("error: ", error);
    // } finally {
    //   setIsLoading(false);
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetchWatchList;
