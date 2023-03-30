import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerms } = useParams();
  console.log(searchTerms)
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerms}`).then((data) =>{
      setVideos(data.items)
      console.log(data.items)
    });
  }, [searchTerms]);
  return (
    <Box p={2} sx={{
      overflowY:"auto",
      height:"90vh",
      flexl:2
    }} >
      <Typography
        varient="h4"
        fontWeight="bold"
        mb={2}
        sx={{
          color: "white",
        }}
      >
        Search Results for: <span style={{color:"#F31503"}}>{searchTerms}</span>
        <span
          style={{
            color: "#F31503",
            marginLeft:2
          }}
        >
          videos
        </span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
