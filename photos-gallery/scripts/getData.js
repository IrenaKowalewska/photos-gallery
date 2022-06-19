import {ACCESS_KEY, API_URL_PHOTOS} from './constants.js'

export const getData = ({page = 1, count, photoId}) => {
    const url = new URL(API_URL_PHOTOS);

    url.searchParams.set('client_id', ACCESS_KEY);

    if(page && count) {
        url.searchParams.append('per_page', count);
        url.searchParams.append('page', page);
    }
 
    if (photoId) {
        url.pathname += `/${photoId}`;
    }

    return fetch(url).then((res) => res.json());
}
