import { Component } from 'react';

import Modal from './Modal';
import Searchbar from './Searchbar/Searchbar';
import PixabayApi from 'services/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';

const pixabayApi = new PixabayApi();
class App extends Component {
    state = {
        showModal: false,
        searchQuery: null,
        pixabay: null,
    };

    onSubmit = queryResult => {
        this.setState({
            searchQuery: queryResult,
        });
    };
    async componentDidUpdate(prevProps, prevState) {
        if (
            prevState.searchQuery !== this.state.searchQuery
        ) {
            // console.log(
            //     'searchQuery changed to: ' +
            //         this.state.searchQuery,
            // );
            pixabayApi.searchQuery = this.state.searchQuery;
            const response = await pixabayApi.fetchPhotos();
            // console.log('response: ', response);
            this.setState({ pixabay: response });
        }
    }
    // async componentDidMount() {
    //     await fetch(
    //         'https://pixabay.com/api/?q=cat&page=1&key=35064628-b4315bc92921e9ccef2ae28e5&image_type=photo&orientation=horizontal&per_page=12',
    //     )
    //         .then(response => response.json())
    //         .then(response =>
    //             this.setState({ pixabay: response.hits }),
    //         );
    //     console.dir(this.state.pixabay);
    // }
    // modalToggle = () => {
    //     this.setState(({ showModal }) => ({
    //         showModal: !showModal,
    //     }));
    // };

    render() {
        console.log(this.state);
        const { showModal, pixabay } = this.state;
        return (
            <>
                <Searchbar onSubmit={this.onSubmit} />
                {showModal && (
                    <Modal closeModal={this.modalToggle} />
                )}
                {pixabay && (
                    <ImageGallery
                        pictures={this.state.pixabay}
                    />
                )}
            </>
        );
    }
}

export default App;
