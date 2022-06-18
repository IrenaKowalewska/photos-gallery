import { getData } from "./getData.js";
import { createGallery} from "./createGallery.js";

const init = async () => {
    const photos = await getData();
    createGallery(photos);

}

init();
