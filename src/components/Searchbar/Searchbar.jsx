import React from "react";
import { Header } from "./Searchbar.styled";

export default class Searchbar extends React.Component {
  state = { value: '' }
  
  handleChange = ({ target: { value } }) => {
    this.setState({value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSearch(this.state.value)
  }
  
  render() {
    return (
      <Header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </Header>
    )
  }
}
