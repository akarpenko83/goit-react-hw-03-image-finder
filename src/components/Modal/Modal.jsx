import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener(
            'keydown',
            this.handleEscKey,
        );
        document.body.style.overflow = 'hidden';
        Loading.arrows();
    }
    componentWillUnmount() {
        window.removeEventListener(
            'keydown',
            this.handleEscKey,
        );
        document.body.style.overflow = 'visible';
        Loading.remove();
    }

    handleEscKey = evt => {
        if (evt.code === 'Escape') {
            console.log('ESC');
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
                        src={this.props.picSrc}
                        alt="cat"
                    />
                    {this.props.children}
                </ModalContent>
            </Overlay>,
            modalRoot,
        );
    }
}
