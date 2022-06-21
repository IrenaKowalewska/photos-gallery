import {API_URL_PHOTOS} from './constants.js';

export const handlerLike = (photoLikeBtn) => {
    const url = new URL(`${API_URL_PHOTOS}/${photoLikeBtn.id}/like`);

    const toggleLike = (data) => {
        data.photo.liked_by_user ? photoLikeBtn.classList.remove('photo__like_o') : photoLikeBtn.classList.add('photo__like_o');
        photoLikeBtn.likedByUser = data.photo.liked_by_user;
        photoLikeBtn.textContent = data.photo.likes;
    
    }

   
    fetch(url, {
        method: photoLikeBtn.likedByUser ? 'DELETE' : "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
        }
    })
    .then(res => res.json())
    .then(toggleLike);
}