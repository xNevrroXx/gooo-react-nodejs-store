import React, {FC, useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import {styled} from "@mui/material";

interface IZoomImage {
    image: string,
    x: number,
    y: number,
    mainWidth?: number,
    mainHeight?: number
}
const ZoomImageStyledElem = styled("div")`
  z-index: 999;
  display: block;
  border: solid 1px gray;
  position: absolute;
  left: 50%;
  top: 20%;
  width: 600px;
  height: 600px;
  background-repeat: no-repeat;
  pointer-events: none;
  background-color: white;
`;

const ZoomImage: FC<IZoomImage> = ({image, x, y, mainWidth = 600, mainHeight = 600}) => {
    const refLoadImg = useRef<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [backgroundWidth, setBackgroundWidth] = useState<number>(0);
    const [backgroundHeight, setBackgroundHeight] = useState<number>(0);
    const [backgroundSize, setBackgroundSize] = useState<{x: number, y: number}>({x: 0, y: 0});

    useEffect(() => {
        if(refLoadImg.current) return;

        const img = new Image();
        img.onload = () => {
            let bgWidth = 0,
                bgHeight = 0,
                width = 0,
                height = 0,
                bgSizeX = 0,
                bgSizeY = 0;

            if(img.width < mainWidth || img.height < mainHeight) {
                bgWidth = img.width * 2;
                bgHeight = img.height * 2;
                bgSizeX = img.width;
                bgSizeY = img.height;
            }
            else {
                bgWidth = img.width;
                bgHeight = img.height;
                bgSizeX = img.width;
                bgSizeY = img.height;
            }

            width = mainWidth;
            height = mainHeight;

            setWidth(width);
            setHeight(height);
            setBackgroundWidth(bgWidth);
            setBackgroundHeight(bgHeight);
            setBackgroundSize({
                x: bgSizeX,
                y: bgSizeY
            })
        }
        img.src = image;
        refLoadImg.current = true;
    }, [image])

    return ReactDOM.createPortal(
        <ZoomImageStyledElem style={{
            backgroundImage: `url("${image}")`,
            width: width + "px",
            height: height + "px",
            backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
            backgroundPositionX: backgroundWidth / 100 * -x  + "px",
            backgroundPositionY: backgroundHeight / 100 * -y + "px"
        }}
        />,
        document.body
    )
};

export default ZoomImage;