const express = require("express");
const router = express.Router();
const fs = require("fs");

function readVideos() {
  const videosData = fs.readFileSync("./data/video-details.json");
  const parsedVideos = JSON.parse(videosData);
  return parsedVideos;
}

function writeVideos(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/video-details.json", stringifiedData);
}

//all videos
router.get("/", (request, response) => {
  const parsedData = readVideos();

  const mappedData = parsedData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      image: video.image,
      channel: video.channel
    }
  })
  response.json(mappedData);
});

//single video
router.get("/:id", (request, response) => {
  const parsedData = readVideos();
  const individualVideo = parsedData.find(
    (video) => video.id === request.params.id
  );

  if (!individualVideo) {
    return response.status(404).send("video not found!");
  }
  response.json(individualVideo);
});

//post upload
router.post("/", (request, response) => {
  const videos = readVideos();
  const { title, description, id} = request.body;
  const newVideo = {
    title,
    description,
    id,
    image: "http://localhost:8080/images/Upload-video-preview.jpg",
    channel: "Bitcoin",
    views: "0",
    likes: "0",
    duration: "1:00",
    timestamp: new Date().getTime(),
    comments: []
  };

  videos.push(newVideo);
  writeVideos(videos);

  response.status(201).json(newVideo);
});

module.exports = router;
