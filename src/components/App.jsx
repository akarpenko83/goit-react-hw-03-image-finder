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
            pixabay: [],
            picLink: null,
            page: 1,
            per_page: 12,
            totalHits: 0,
            status: STATUS.IDLE,
        });
    };
    async componentDidUpdate(prevProps, prevState) {
        if (
            prevState.page !== this.state.page ||
            prevState.searchQuery !== this.state.searchQuery
        ) {
            try {
                Loading.arrows();
                const response = await fetchPhotos(
                    this.state,
                );
                await this.setState({
                    // page: 1,
                    pixabay: [
                        ...this.state.pixabay,
                        ...response.hits,
                    ],
                    totalHits: response.totalHits,
                    status: STATUS.RESOLVED,
                });
                console.log(
                    'response from API: ',
                    response,
                );
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
            } finally {
                Loading.remove();
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
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    getEndOfQuery() {
        const totalPages = Math.ceil(
            this.state.totalHits / this.state.per_page,
        );
        console.log(
            this.state.page,
            ' of pages ',
            totalPages,
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

                <ImageGallery
                    pictures={pixabay}
                    onPictureClick={this.onPictureClick}
                />

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
