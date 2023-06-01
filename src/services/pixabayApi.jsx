import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default async function fetchPhotos({
    searchQuery,
    page,
    per_page,
}) {
    const url = 'https://pixabay.com/api/';
    const axiosParams = {
        params: {
            key: '35064628-b4315bc92921e9ccef2ae28e5',
            q: encodeQuery(searchQuery),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'false',
            page: page,
            per_page: per_page,
        },
    };
    try {
        const response = await axios.get(url, axiosParams);
        const totalPages = Math.ceil(
            response.data.totalHits /
                axiosParams.params.per_page,
        );
        console.log(
            'totalPages: ',
            totalPages,
            'current page: ',
            page,
            'per page: ',
            per_page,
        );

        if (response.data.hits.length === 0) {
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.',
            );
            throw new Error(response);
        }
        if (totalPages === page) {
            Notify.warning(
                "We're sorry, but you've reached the end of search results.",
            );
            // ButtonLoadMore.disable();
        }
        Notify.info(
            `Hooray! We found ${response.data.totalHits} images on ${totalPages} pages. Current page: ${page}`,
        );
        return response.data;
    } catch (error) {}
}

function encodeQuery(searchQuery) {
    return encodeURIComponent(searchQuery).replace(
        /%20/g,
        '+',
    );
}
