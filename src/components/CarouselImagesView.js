import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import constants from '../constants';

const { height, width } = Dimensions.get('window');

const CarouselImagesView = (props) => {
    const { images } = props
    const [imagesArray, setImagesArrat] = useState([constants.Images.UploadScreenImage1, constants.Images.UploadScreenImage2])
    const [activeIndex, setActiveIndex] = React.useState(0)

    const payment_image = (item, index) => {
        return (
            <Image
                resizeMode='stretch'
                source={item}
                style={styles.productImagestyle}
            />
        )
    }
    return (
        <Carousel
            data={imagesArray}
            renderItem={({ item, index }) => payment_image(item, index)}
            removeClippedSubviews={false}
            sliderWidth={width}
            itemWidth={width - 60}
            onSnapToItem={(index) => { setActiveIndex(index) }} />
    )
}

const styles = StyleSheet.create({
    productImagestyle: {
        height: width,
        width: width - 60,
        borderRadius: 10,
        alignSelf: 'center'
    }
})

export default CarouselImagesView