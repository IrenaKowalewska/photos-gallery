import {createElement} from "./createElement.js";

export const createPhotoInfo = (wrapper, photo) => {
    console.log(photo)
    const photoPicture = createElement('img', {
        className: "photo__picture",
        src: photo.urls.full,
        alt: photo.alt_description,
    });

    const photoAuthorLink = createElement('a', {
        className: "photo__author",
        href: photo.links.html,
        target: '_blank'
    });

    const photoAuthor = createElement('img', {
        src: photo.user.profile_image.medium,
        alt: photo.user.bio,
        title: photo.user.name,
    });
    const photoAuthorName = createElement('span', {
        textContent: photo.user.name
    })

    photoAuthorLink.append(photoAuthor, photoAuthorName);

    const photoControl = createElement('div', {
        className: "photo__control"
    });

    const likeBtn = createElement('button', {
        className: "photo__like",
        id: photo.id,
        textContent: photo.likes
    });

    const downloadBtn = createElement('a', {
        className: "photo__download",
        download: "true",
        target: "_blank",
        href: photo.links.download
    });

    photoControl.append(likeBtn, downloadBtn);

    wrapper.append(photoPicture, photoAuthorLink, photoControl);
}

