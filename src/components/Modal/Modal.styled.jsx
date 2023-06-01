import styled from '@emotion/styled';

export const Overlay = styled.div`
    position: fixed;
    z-index: 1200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    -webkit-box-shadow: 4px 3px 20px 3px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 4px 3px 20px 3px rgba(0, 0, 0, 0.5);
    box-shadow: 4px 3px 20px 3px rgba(0, 0, 0, 0.5);
`;
