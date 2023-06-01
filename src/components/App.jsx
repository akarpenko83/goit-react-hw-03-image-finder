import React from 'react';

import Modal from './Modal';
import Searchbar from './Searchbar/Searchbar';
import PixabayApi from 'services/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './Button/LoadMoreBtn';

const pixabayApi = new PixabayApi();

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
            pixabayApi.searchQuery = this.state.searchQuery;
            pixabayApi.page = this.state.page;
            pixabayApi.per_page = this.state.per_page;
            const response = await pixabayApi.fetchPhotos();

            this.setState({
                pixabay: [
                    ...this.state.pixabay,
                    ...response.hits,
                ],
                totalPages: response.totalHits,
                status: STATUS.RESOLVED,
            });
        }
        if (
            prevState.searchQuery !== this.state.searchQuery
        ) {
            pixabayApi.searchQuery = this.state.searchQuery;
            pixabayApi.page = this.state.page;
            pixabayApi.per_page = this.state.per_page;
            const response = await pixabayApi.fetchPhotos();

            this.setState({
                pixabay: response.hits,
                page: 1,
                status: STATUS.RESOLVED,
            });
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
        console.log(totalPages);
        if (totalPages !== this.state.page) {
            return true;
        }
        return false;
    }

    render() {
        const { showModal, pixabay, picLink, status } =
            this.state;
        console.log(pixabay);
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
            </>
        );
    }
}

export default App;
