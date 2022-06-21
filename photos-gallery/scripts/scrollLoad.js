import {createPhotoCard} from "./createPhotoCrad.js";
import {getData} from "./getData.js";

export const scrollLoad = (grid, gallery, lastElem) => {
    let i = 1;
    const observer = new IntersectionObserver(
        async (entries) => {
                if (entries[0].isIntersecting) {
                    const photos = await getData({page: ++i, count: 30});
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
