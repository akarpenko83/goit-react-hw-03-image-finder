import React from 'react';
import {
    SearchBar,
    SearchForm,
    SearchFormBtn,
    SearchFormBtnLabel,
    SearchFormInput,
} from './Searchbar.styled';
export default class Searchbar extends React.Component {
    state = {
        query: '',
    };
    handleSubmit = evt => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const queryResult = form.elements.query.value;
        console.log(queryResult);
        if (!queryResult) {
            return alert('please enter a query');
        }
        this.props.onSubmit(queryResult);
        // this.formReset();
        // form.reset();
    };
    handleChange = evt => {
        this.setState({ query: evt.target.value });
    };
    render() {
        return (
            <SearchBar>
                <SearchForm
                    onSubmit={this.handleSubmit}
                    className="search-form header"
                    id="search-form"
                >
                    {/* <div className="input-group"> */}
                    <SearchFormInput
                        onChange={this.handleChange}
                        value={this.state.query}
                        id="searchQuery"
                        className="search-field"
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search images and photos..."
                    />
                    <SearchFormBtn type="submit">
                        <SearchFormBtnLabel>
                            "Search"
                        </SearchFormBtnLabel>
                    </SearchFormBtn>
                    {/* </div> */}
                </SearchForm>
            </SearchBar>
        );
    }
}
