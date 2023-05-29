import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener(
            'keydown',
            this.handleEscKey,
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            'keydown',
            this.handleEscKey,
        );
    }

    handleEscKey = evt => {
        if (evt.code === 'Escape') {
            this.props.closeModal();
        }
    };

    handleBackdropClick = evt => {
        if (evt.target === evt.currentTarget) {
            this.props.closeModal();
        }
    };

    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalContent>
                    <img
                        src="https://unsplash.it/800/600"
                        alt=""
                    />
                    {this.props.children}
                </ModalContent>
            </Overlay>,
            modalRoot,
        );
    }
}
