// import React from 'react';
import { nanoid } from 'nanoid';

export default function ImageGalleryItem({
    id,
    imgLink,
    altName,
}) {
    return (
        <li key={nanoid()}>
            <img
                src="https://pixabay.com/get/g3dbb85da4c1e239d6ea3900da677246947ba8e8b7eb11a516d405cdc4e251c59a52dda91c533d5e77ed51fef409c2ca6_640.jpg"
                alt="cat"
            />
        </li>
    );
}
