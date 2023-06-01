// import ImageGalleryItem from './ImageGallery';

import {
    ImageGalleryContainer,
    ImageGalleryItemContainer,
    ImageGalleryItemImage,
} from './ImageGallery.styled';

export default function ImageGallery(props) {
    const { pictures, onPictureClick } = props;
    return (
        <ImageGalleryContainer>
            {pictures.map(
                ({ webformatURL, tags }, index) => (
                    <ImageGalleryItemContainer key={index}>
                        <ImageGalleryItemImage
                            onClick={() => {
                                console.log(webformatURL);
                                onPictureClick(
                                    webformatURL,
                                );
                            }}
                            src={webformatURL}
                            alt={tags}
                        ></ImageGalleryItemImage>
                    </ImageGalleryItemContainer>
                ),
            )}
        </ImageGalleryContainer>
    );
}
