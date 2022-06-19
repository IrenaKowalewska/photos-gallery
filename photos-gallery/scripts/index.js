import { getData } from "./getData.js";
import { createGallery} from "./createGallery.js";
import {createPhotoInfo} from "./createPhotoInfo.js";

const init = async ({selectorGalleryWrapper, selectorPhotoWrapper}) => {
    const galleryWrapper = document.querySelector(selectorGalleryWrapper);
    const photoWrapper = document.querySelector(selectorPhotoWrapper);

    if (galleryWrapper) {
        const photos = await getData({count: 30});
        createGallery(galleryWrapper, photos);
    }

    if (photoWrapper) {
        const url = new URL(location.href);
        const photoId =  url.searchParams.get('photo');
        const photo = await getData({photoId});
        createPhotoInfo(photoWrapper, photo);
    }
}

init({
    selectorGalleryWrapper: '.gallery__wrapper',
    selectorPhotoWrapper: '.photo__wrapper'
});
