import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { ChannelCard } from './';
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  
  //console.log(channelDetail, videos);

  useEffect(()=> {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    }
    fetchResults();


    // fetchFromAPI(`channels?part=snippet&id=${id}`)
    //   .then((data) => setChannelDetail(data?.items[0]));

    // const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);
    // setVideos(videosData?.items);

    // fetchFromAPI(`search`, {
    //   params: {
    //     maxResults: '50',
    //     channelId : id,
    //     order: 'date',
    //   },
    //   headers: {
    //     "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    //     "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    //   }
    // })
    //   .then((data) => {
    //     setVideos(data?.items);
    //     console.log(data.items)
    //   });
  },[id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div 
          style={{
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(218,22,194,1) 35%, rgba(0,212,255,1) 100%)',
            zIndex:10,
            height:'300px'
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
          <Box sx={{ mr: {sm:"100px"}}} />
          <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
