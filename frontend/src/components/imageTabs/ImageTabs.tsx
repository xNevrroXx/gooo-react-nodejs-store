import React, {FC, useMemo, useState} from 'react';
import {Stack, styled} from "@mui/material";
// own modules
import ImageMagnifier from "../imageMagnigier/ImageMagnifier";

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

const ImageTabs: FC<IImageSliderProps> = ({images, alt}) => {
    const [active, setActive] = useState<number>(0);

    const tabs = useMemo(() => images.map((image, index) => (
        <TabImage
            key={index + "tab"}
            alt={alt + " thumb " + index}
            src={image}
            onClick={() => setActive(index)}
        />
    )), [images, alt])

    const activeImage = useMemo(() => {
        const targetImage = images.find((image, index) => index === active);

        if (!targetImage) return null;
        return (
            <ImageMagnifier
                key={active + "image"}
                imageSrc={targetImage}
                alt={alt}
                leftPositioningMagnifier="50vw"
                topPositioningMagnifier="20vh"
                maxSizeMagnifierArea={{width: 200, height: 200}}
                maxHeightContent={600}
            />
        )
    }, [active])

    return (
        <Stack direction="row" width="100%" height="100%" spacing={20}>
            <Stack direction="column" width="3rem" height="max-content" spacing={1}>
                {tabs}
            </Stack>
            {activeImage}
        </Stack>
    );
};

export default ImageTabs;