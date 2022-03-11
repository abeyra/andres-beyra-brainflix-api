const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
// const {Bike} = require('../public/images/Upload-video-preview.jpg');

function readVideos() {

  const videosData = fs.readFileSync('./data/video-details.json');

  const parsedVideos = JSON.parse(videosData);
  return parsedVideos;
}

function writeVideos(data) {

  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync('./data/video-details.json', stringifiedData);
}

//all videos
router.get('/', (request, response) => {
    const parsedData = readVideos();
    response.json(parsedData);
    console.log('working');
})

//single video 
router.get('/:id', (request, response) => {
    console.log('getting single video');
    const parsedData = readVideos();

    const individualVideo = parsedData.find((video) => video.id === request.params.id)

    if(!individualVideo){
      return response.status(404).send('video not found!');
    }

    response.json(individualVideo);
})
    
//post upload
router.post('/', (request, response) => {
    const videos = readVideos();

    // const staticImage = {Bike}; 

    const {title, description, id} = request.body;
    console.log(request.body);

    const newVideo = {
      title,
      description,
      id,
      image: Bike,
      channel: 'Bitcoin',
      views: '0',
      likes: '0',
      duration: '1:00',
      timestamp: new Date().toLocaleDateString(),
      comments: [
      {
        "name": "Micheal Lyons",
        "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        "likes": 0,
        "timestamp": 1628522461000
      },
      {
        "name": "Gary Wong",
        "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        "likes": 0,
        "timestamp": 1626359541000
      },
      {
        "name": "Theodore Duncan",
        "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He is definitely my favorite ever!",
        "likes": 0,
        "timestamp": 1626011132000
      }
    ]
    }

    videos.push(newVideo);
    writeVideos(videos);

    console.log(videos);

    response.status(201).json(newVideo);
})

module.exports = router;