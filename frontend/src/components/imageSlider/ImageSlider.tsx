import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {Stack, styled, Zoom} from "@mui/material";
import {Transition} from "react-transition-group";
import ZoomImage from "../zoomImage/ZoomImage";
import ImageWithZoomedPlace from "../zoomImage/ImageWithZoomedPlace";

interface IImageSliderProps {
    images: string[],
    alt?: string
}

const TabImage = styled("img")`
  height: 3.5rem;
  width: 3.5rem;
  object-fit: contain;
  transition: .25s all ease;
  border: solid 2px transparent;
  &:hover {
    border: solid 2px orange;
  }
`;

const ImageSlider: FC<IImageSliderProps> = ({images, alt}) => {
    const [active, setActive] = useState<number>(0);

    const tabs = useMemo(() => images.map((image, index) => (
        <TabImage
            key={index + "tab"}
            alt={alt + " thumb " + index}
            src={image}
            onClick={() => setActive(index)}
        />
    )), [images, alt])

    const tabsContent = useMemo(() => images.map((image, index) => {
        if(index !== active) return null;

        return (
            <ImageWithZoomedPlace key={index + "image"} image={image} alt={alt} sideZoomPlaceProp={200}/>
        )
    }), [active])

    return (
        <Stack direction="row" width="100%" height="100%" spacing={20}>
            <Stack direction="column" width="3rem" height="max-content" spacing={1}>
                {tabs}
            </Stack>
            {tabsContent}
        </Stack>
    );
};

export default ImageSlider;