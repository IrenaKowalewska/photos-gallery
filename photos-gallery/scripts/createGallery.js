import {createPhotoCard} from "./createPhotoCrad.js";


export const createGallery = (photos) => {
    const gallery = document.querySelector('.grid');

    const photosCards = photos.map(createPhotoCard);

    gallery.append(...photosCards);
}
