import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import MovieComponent from "./MovieComponent";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);

  const getCardData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const data = await res.json();
    setCard((prev) => [...prev, ...data]);
  };

  const handleInfiniteScroll = async () => {
    try {
      console.log("scrollHeigtht " + document.documentElement.scrollHeight);
      console.log("innerHeigtht " + window.innerHeight);
      console.log("scrollTop " + document.documentElement.scrollTop);

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <MovieComponent movieInfo={card} />
    </>
  );
};

export default Home;
