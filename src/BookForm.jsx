import React, { Component } from "react";
class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", author: " ", year: 0, pages: 0, cover: " " };
    this.textInput = React.createRef();
  }

  inputChanged = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  clearInput = event => {
    event.preventDefault();
    this.props.addBookProps(this.state);
    this.setState(
      { title: "", author: " ", year: 0, pages: 0, cover: " " },
      this.refs.form.reset()
    );
    this.focusTextInput();
  };

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  };

  render() {
    return (
      <React.Fragment>
        <form ref="form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              onChange={this.inputChanged}
              ref={this.textInput}
            />
          </label>
          <label>
            <br />
            Author:
            <input type="text" name="author" onChange={this.inputChanged} />
          </label>
          <br />
          <label>
            Year:
            <input type="number" name="year" onChange={this.inputChanged} />
          </label>
          <br />
          <label>
            Pages:
            <input type="number" name="pages" onChange={this.inputChanged} />
          </label>
          <br />
          <label>
            Cover:
            <input type="text" name="cover" onChange={this.inputChanged} />
          </label>
          <br />
          <input type="submit" value="Submit" onClick={this.clearInput} />
        </form>
      </React.Fragment>
    );
  }
}

export default BookForm;
