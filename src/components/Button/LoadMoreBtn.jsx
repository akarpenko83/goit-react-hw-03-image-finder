import { LoadMoreBtnStyle } from './LoadMoreBtn.styled';
export default function LoadMoreBtn({ onLoadMore }) {
    return (
        <LoadMoreBtnStyle
            type="button"
            onClick={onLoadMore}
        >
            Load more
        </LoadMoreBtnStyle>
    );
}
