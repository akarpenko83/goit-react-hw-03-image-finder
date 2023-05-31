// import ImageGalleryItem from './ImageGallery';

import {
    ImageGalleryContainer,
    ImageGalleryItemContainer,
    ImageGalleryItemImage,
} from './ImageGallery.styled';

export default function ImageGallery(props) {
    console.log(props.pictures);
    const pics = props.pictures;
    return (
        <ImageGalleryContainer>
            {pics.map(({ id, webformatURL, tags }) => (
                <ImageGalleryItemContainer key={id}>
                    <ImageGalleryItemImage
                        src={webformatURL}
                        alt={tags}
                    ></ImageGalleryItemImage>
                </ImageGalleryItemContainer>
            ))}
        </ImageGalleryContainer>
    );
}
