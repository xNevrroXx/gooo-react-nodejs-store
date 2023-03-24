import React, {FC, useCallback, useEffect, useState} from 'react';
import {styled} from "@mui/material";
// own modules
import ZoomImage from "./ZoomImage";

interface IImageWithZoomedPlace {
    image: string,
    sideZoomPlaceProp?: number,
    alt?: string
}
const ContentImage = styled("div")`
  width: calc(100% - 5rem - 3.5rem);
  height: 100%;
`;
const Img = styled("img")`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%; 
`;
const ZoomPlaceOnImage = styled("div")`
  border: solid 1px gray;
  position: absolute;
`;
const ImageMagnifier: FC<IImageWithZoomedPlace> = ({image, alt, sideZoomPlaceProp = 200}) => {
    const [zoomPosition, setZoomPosition] = useState<{x: number, y: number} | null>(null);
    const [sideZoomPlace, setSideZoomPlace] = useState<{x: number, y: number}>({x: sideZoomPlaceProp, y: sideZoomPlaceProp});
    const [imgAnchor, setImgAnchor] = useState<null | HTMLElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [offsetTop, setOffsetTop] = useState<number>(0);
    const [offsetLeft, setOffsetLeft] = useState<number>(0);

    useEffect(() => {
        if(!imgAnchor) return;

        if(imgAnchor.offsetWidth < sideZoomPlaceProp) setSideZoomPlace({...sideZoomPlace, x: imgAnchor.offsetWidth});
        if(imgAnchor.offsetHeight < sideZoomPlaceProp) setSideZoomPlace({...sideZoomPlace, y: imgAnchor.offsetHeight});
        setWidth(imgAnchor.offsetWidth);
        setHeight(imgAnchor.offsetHeight);
        setOffsetTop(imgAnchor.getBoundingClientRect().top);
        setOffsetLeft(imgAnchor.getBoundingClientRect().left);
    }, [imgAnchor])

    const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if(event.pageX < offsetLeft || event.pageX > offsetLeft + width
        || event.pageY < offsetTop || event.pageY > offsetTop + height) {
            setZoomPosition(null);
        }
        else if (event.pageX - (sideZoomPlace.x / 2) > offsetLeft && event.pageX + (sideZoomPlace.x / 2) < offsetLeft + width
            && event.pageY - (sideZoomPlace.y / 2) > offsetTop && event.pageY + (sideZoomPlace.y / 2) < offsetTop + height) {
            setZoomPosition({
                x: event.pageX - (sideZoomPlace.x / 2),
                y: event.pageY - (sideZoomPlace.y / 2)
            })
        }
        // Y is higher than necessary and X is lefter/righter than necessary
        else if (event.pageY - (sideZoomPlace.y / 2) < offsetTop && event.pageX - (sideZoomPlace.x / 2) < offsetLeft) {
            setZoomPosition({
                x: offsetLeft,
                y: offsetTop
            })
        }
        else if (event.pageY - (sideZoomPlace.y / 2) < offsetTop && event.pageX + (sideZoomPlace.x / 2) > offsetLeft + width) {
            setZoomPosition({
                x: offsetLeft + width - sideZoomPlace.x,
                y: offsetTop
            })
        }
        // Y is lower than necessary X is lefter/righter than necessary
        else if (event.pageY + (sideZoomPlace.y / 2) > offsetTop + height && event.pageX + (sideZoomPlace.x / 2) > offsetLeft + width) {
            setZoomPosition({
                x: offsetLeft + width - sideZoomPlace.x,
                y: offsetTop + height - sideZoomPlace.y
            })
        }
        else if (event.pageY + (sideZoomPlace.y / 2) > offsetTop + height && event.pageX - (sideZoomPlace.x / 2) < offsetLeft) {
            setZoomPosition({
                x: offsetLeft,
                y: offsetTop + height - sideZoomPlace.y
            })
        }
        else if (event.pageY - (sideZoomPlace.y / 2) < offsetTop) {
            setZoomPosition({
                x: event.pageX - (sideZoomPlace.x / 2),
                y: offsetTop
            })
        }
        else if (event.pageX - (sideZoomPlace.x / 2) < offsetLeft) {
            setZoomPosition({
                x: offsetLeft,
                y: event.pageY - (sideZoomPlace.y / 2)
            })
        }
        else if (event.pageY + (sideZoomPlace.y / 2) > offsetTop + height) {
            setZoomPosition({
                x: event.pageX - (sideZoomPlace.x / 2),
                y: offsetTop + height - sideZoomPlace.y
            })
        }
        else if (event.pageX + (sideZoomPlace.x / 2) > offsetLeft + width) {
            setZoomPosition({
                x: offsetLeft + width - sideZoomPlace.x,
                y: event.pageY - (sideZoomPlace.y / 2)
            })
        }
    }, [imgAnchor, offsetLeft, offsetTop, width, height, sideZoomPlace])

    return (
        <ContentImage sx={{display: "flex", justifyContent: "center", alignItems: "center"}} onMouseMove={onMouseMove} onMouseLeave={() => setZoomPosition(null)}>
            <Img onLoad={event => setImgAnchor(event.currentTarget)} src={image} alt={alt}/>
            {zoomPosition != null && (
                <>
                    <ZoomPlaceOnImage style={{top: zoomPosition.y, left: zoomPosition.x, width: sideZoomPlace.x + "px", height: sideZoomPlace.y + "px"}}/>
                    <ZoomImage x={(zoomPosition.x - offsetLeft) / (width / 100)} y={(zoomPosition.y - offsetTop) / (height / 100)} image={image}/>
                </>
            )}
        </ContentImage>
    );
};

export default ImageMagnifier;