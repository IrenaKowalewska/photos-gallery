import {createPhotoCard} from "./createPhotoCrad.js";
import {getData} from "./getData.js";

export const scrollLoad = (grid, gallery, lastElem) => {
    const observer = new IntersectionObserver(
        async (entries) => {
                if (entries[0].isIntersecting) {
                    const photos = await getData('data.json');
                    const photosCards = photos.map(createPhotoCard);

                    Promise.all(photosCards).then((cards) => {
                        gallery.append(...cards);
                        grid.appended(cards);
                    });
                }
        },
        {
            rootMargin: '150px',
        }
    );

    observer.observe(lastElem);
}
