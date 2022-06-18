import {createElement} from "./createElement.js";

export const createPhotoCard = (data) => {
    const card = createElement('li', {
        className: "card",
    });

    const cardItem = createElement('a', {
        className: "grid-item",
        id: data.id,
        href: `page.html?photo=${data.id}`
    });

    const photo = new Image();
    photo.width = 200;
    photo.src = data.urls.small;
    photo.alt = data.alt_description;

    const author = createElement('a', {
        className: 'card__author',
        href: data.user.links.html
    });

    const avatarAuthor = new Image();
    avatarAuthor.className = 'author__photo';
    avatarAuthor.src = data.user.profile_image.medium;
    avatarAuthor.width = '32';
    avatarAuthor.height = '32';
    avatarAuthor.alt = data.user.bio;
    avatarAuthor.title = data.user.username;

    author.append(avatarAuthor);

    const likeBtn = createElement('button', {
        className: 'card__photo-like',
        textContent: data.likes,
    });

    const downloadBtn = createElement('a', {
        className: "card__download",
        target: "_blank",
        href: data.links.download,
        download: true,
    });

    cardItem.append(photo, author, likeBtn, downloadBtn);
    card.append(cardItem);

    return card;
}
