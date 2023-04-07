import React, {FC} from 'react';
import SlickSlider, {Settings as SettingsSlickSlider} from "react-slick";

interface IImageSliderProps {
    settingsSlider?: SettingsSlickSlider,
    children: React.ReactNode
}

const ImageSlider: FC<IImageSliderProps> = ({
                                                settingsSlider = {
                                                    dots: true,
                                                    infinite: true,
                                                    speed: 500,
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1
                                                } as SettingsSlickSlider,
                                                children
}) => {
    return (
        <SlickSlider {...settingsSlider}>
            {children}
        </SlickSlider>
    )
};

export default ImageSlider;