import "./App.css";
import { useEffect, useState } from "react";
import { ACCESSKEY } from "./Information";
import axios from "axios";
import ImageCard from "./ImageCard";
import { ThemeProvider } from "styled-components";

function App() {
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesToShow, setImagesToShow] = useState([]);

  useEffect(() => {
    initImages();
  }, []);

  const initImages = async () => {
    let requestPicsum = await axios.get("https://picsum.photos/v2/list");
    const data = requestPicsum.data;
    let imagesData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].url.split("/").length === 5) {
        data[i]["unsplashID"] = data[i].url.split("/")[4];
        imagesData.push(data[i]);
      }
    }
    for (let i = 0; i < 3; i++) {
      const unsplashData = await getUnsplashData(imagesData[i]);
      imagesData[i].rawUrls = unsplashData.data.urls;
    }
    // console.log(imagesData);
    setImagesToShow([imagesData[0], imagesData[1], imagesData[2]]);
    setImageList(imagesData);
  };

  const getUnsplashData = async (imageData) => {
    let url = `https://api.unsplash.com/photos/${imageData.unsplashID}?client_id=${ACCESSKEY}`;
    return axios.get(url);
  };

  const nextImagesLoad = async () => {
    let counter = 0;
    let i = 3;
    let newList = imageList;
    let newImagesToShow = [];
    while (counter < 3) {
      // console.log(newImagesToShow);
      const index = (currentIndex + i) % imageList.length;
      const element = imageList[index];
      if (!element.rawUrls) {
        await getUnsplashData(element)
          .then((response) => {
            element.rawUrls = response.data.urls;
            newList[index] = element;
            newImagesToShow.push(element);
            counter++;
          })
          .catch((err) => {
            // console.log(err);
          });
      } else {
        newImagesToShow.push(element);
        counter++;
      }
      i++;
    }
    setCurrentIndex(currentIndex + (i - 3));
    setImagesToShow(newImagesToShow);
    setImageList(newList);
  };

  // console.log(imagesToShow);
  // console.log(imageList);

  return (
    <div className="App">
      {imageList.length > 0 && (
        <div className="gallery-container">
          {imagesToShow.map((element) => (
            <ThemeProvider key={element.id} theme={element}>
              <ImageCard />
            </ThemeProvider>
          ))}
        </div>
      )}
      <button type="button" className="next-button" onClick={nextImagesLoad}>
        Next
      </button>
    </div>
  );
}

export default App;
