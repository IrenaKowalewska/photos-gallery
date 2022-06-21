import { getData } from "./getData.js";
import { createGallery} from "./createGallery.js";
import {createPhotoInfo} from "./createPhotoInfo.js";
import { authorization } from "./authorization.js";
import { handlerLike } from "./handlerLike.js";

const init = async ({selectorGalleryWrapper, selectorPhotoWrapper, selectorAuthButton}) => {
    const galleryWrapper = document.querySelector(selectorGalleryWrapper);
    const photoWrapper = document.querySelector(selectorPhotoWrapper);
    const authButton = document.querySelector(selectorAuthButton);

    authorization(authButton);

    if (galleryWrapper) {
        const photos = await getData({count: 30});
        createGallery(galleryWrapper, photos);
    }

    if (photoWrapper) {
        const url = new URL(location.href);
        const photoId =  url.searchParams.get('photo');
       
        if (photoId) {
            const photo = await getData({photoId});
            const likedByUserBtn = createPhotoInfo(photoWrapper, photo);
            likedByUserBtn.addEventListener('click', () => {
                if(localStorage.getItem('Bearer')) {
                    handlerLike(likedByUserBtn);
                }
            });
            
        }
    }
}

init({
    selectorGalleryWrapper: '.gallery__wrapper',
    selectorPhotoWrapper: '.photo__wrapper',
    selectorAuthButton: '.header__login-button'
});
