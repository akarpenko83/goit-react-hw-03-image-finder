import styled from '@emotion/styled';

export const LoadMoreBtnStyle = styled.button`
    position: absolute;
    left: 50%;
    margin-top: 3rem;
    transform: translate(-50%);
    box-shadow: inset 0px 1px 0px 0px #efdcfb;
    background: linear-gradient(
        to bottom,
        #dfbdfa 5%,
        #bc80ea 100%
    );
    background-color: #dfbdfa;
    border-radius: 6px;
    border: 1px solid #c584f3;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #9752cc;
    &:hover {
        background: linear-gradient(
            to bottom,
            #bc80ea 5%,
            #dfbdfa 100%
        );
        background-color: #bc80ea;
    }
    &:active {
        position: relative;
        top: 1px;
    }
`;
