import { Component } from 'react';
import Modal from './Modal';
class App extends Component {
    state = {
        showModal: true,
    };

    modalToggle = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    render() {
        const { showModal } = this.state;
        return (
            <div>
                {showModal && (
                    <Modal closeModal={this.modalToggle} />
                )}
            </div>
        );
    }
}

export default App;
