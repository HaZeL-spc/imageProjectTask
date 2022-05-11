import React from "react";
import styled from "styled-components";
import { device } from "./Information";

const Card = styled.div`
  height: 430px;
  width: 380px;
  background-image: url("${(props) => {
    return props.theme.rawUrls.full;
  }}");
  background-position: center;
  background-size: cover;
  margin-right: 10px;
  margin-left: 10px;
  border: 5px solid black;

  @media ${device.large} {
    width: 300px;
    height: 350px;
  }

  @media ${device.medium} {
    width: 250px;
    height: 300px;
  }

  @media ${device.small} {
    width: 200px;
    height: 250px;
  }

  @media ${device.extraSmall} {
    width: 150px;
    height: 200px;
    margin-right: 3px;
    margin-left: 3px;
  }

  @media ${device.extraExtraSmall} {
    width: 200px;
    height: 250px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const ImageCard = () => {
  return <Card></Card>;
};

export default ImageCard;
