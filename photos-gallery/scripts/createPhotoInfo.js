import {createElement} from "./createElement.js";

export const createPhotoInfo = (wrapper, photo) => {
    const photoPicture = createElement('img', {
        className: "photo__picture",
        src: photo.urls.regular,
        alt: photo.description,
        style: 'max-height: 80vh'
    });

    const author = createElement('a', {
        className: "photo__author",
        href: photo.links.html,
        target: '_blank'
    });

    const avatarPhoto = createElement('img', {
        src: photo.user.profile_image.medium,
        alt: photo.user.bio,
        title: photo.user.name,
    });
    const avatarName = createElement('span', {
        textContent: photo.user.name
    })

    author.append(avatarPhoto, avatarName);

    const photoControl = createElement('div', {
        className: "photo__control"
    });

    const likeBtn = createElement('button', {
        className: "photo__like",
        id: photo.id,
        textContent: photo.likes,
        likedByUser: photo.liked_by_user
    });

    if (!likeBtn.likedByUser) {
        likeBtn.classList.add('photo__like_o');
    }

    const downloadBtn = createElement('a', {
        className: "photo__download",
        download: "true",
        target: "_blank",
        href: photo.links.download
    });

    photoControl.append(likeBtn, downloadBtn);

    wrapper.append(photoPicture, author, photoControl);

    return likeBtn;
}

