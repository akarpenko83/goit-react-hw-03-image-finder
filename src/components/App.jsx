import React from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Modal from './Modal';
import Searchbar from './Searchbar/Searchbar';
import fetchPhotos from 'services/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './Button/LoadMoreBtn';

// const pixabayApi = new PixabayApi();

const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};
class App extends React.PureComponent {
    state = {
        showModal: false,
        searchQuery: null,
        pixabay: [],
        picLink: null,
        page: 1,
        per_page: 12,
        totalPages: 0,
        status: STATUS.IDLE,
    };

    onSubmit = queryResult => {
        this.setState({
            searchQuery: queryResult,
        });
    };
    async componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            Loading.arrows();
            const response = await fetchPhotos(this.state);

            await this.setState({
                pixabay: [
                    ...this.state.pixabay,
                    ...response.hits,
                ],
                totalPages: response.totalHits,
                status: STATUS.RESOLVED,
            });
            Loading.remove(500);
        }
        if (
            prevState.searchQuery !== this.state.searchQuery
        ) {
            try {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
                await this.setState({
                    page: 1,
                });
                Loading.arrows();
                const response = await fetchPhotos(
                    this.state,
                );
                console.log(
                    'response from API: ',
                    response,
                );
                this.setState({
                    pixabay: response.hits,
                    status: STATUS.RESOLVED,
                });
                Loading.remove(500);
            } catch (error) {
                console.log(error);
                this.setState({
                    pixabay: [],
                    page: 1,
                    showModal: true,
                    picLink:
                        'https://www.cloudways.com/blog/wp-content/uploads/wordpress-404-error.jpg',
                    status: STATUS.REJECTED,
                });
            }
        }
    }

    onPictureClick = picture => {
        this.setState({
            picLink: picture,
            showModal: true,
        });
    };
    modalClose = () => {
        this.setState({ showModal: false });
    };
    onLoadMore = () => {
        console.log(this.state.page);
        this.setState({ page: this.state.page + 1 });
    };

    getEndOfQuery() {
        const totalPages = Math.ceil(
            this.state.totalPages / this.state.per_page,
        );
        if (totalPages !== this.state.page) {
            return true;
        }
        return false;
    }

    render() {
        const { showModal, pixabay, picLink, status } =
            this.state;
        return (
            <>
                <Searchbar onSubmit={this.onSubmit} />
                {showModal && (
                    <Modal
                        closeModal={this.modalClose}
                        picSrc={picLink}
                    />
                )}
                {status === STATUS.RESOLVED && (
                    <ImageGallery
                        pictures={pixabay}
                        onPictureClick={this.onPictureClick}
                    />
                )}
                {status === STATUS.RESOLVED &&
                    this.getEndOfQuery() && (
                        <LoadMoreBtn
                            onLoadMore={this.onLoadMore}
                        />
                    )}
                {status === STATUS.REJECTED &&
                    showModal && (
                        <Modal
                            closeModal={this.modalClose}
                            picSrc={picLink}
                        />
                    )}
            </>
        );
    }
}

export default App;
