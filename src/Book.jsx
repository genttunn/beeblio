import React, { Component } from "react";
import { ThemeContext } from "./AppWrapper";
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { currentDate: new Date(), liked: this.props.values.liked };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    this.timerID = clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      currentDate: new Date()
    });
  }

  handleLikeClick = e => {
    e.preventDefault();
    this.props.toggleLike(this.props.values.id);
  };

  //// color: this.state.liked ? "green" : this.context.theme doesnt work cause theme is an entire object, gotta get the color property directly
  render() {
    let { title, author, year, pages, cover } = this.props.values;
    return (
      <div>
        <h4
          style={{
            color: this.state.liked ? "green" : this.context.theme.color
          }}
        >
          {title}
        </h4>
        <button onClick={this.handleLikeClick}>
          Liked : {this.state.liked ? "yes" : "no"}
        </button>
        <br></br>
        Author: {author}
        <br></br>
        Year: {year}
        <br></br>
        Pages: {pages}
        <br></br>
        Seconds since publish:{" "}
        {Math.floor(
          (this.state.currentDate.getTime() - new Date(year, 0).getTime()) /
            1000
        )}
        <br></br>
        <br></br>
        <img src={cover} style={{ maxHeight: "300px" }} />
      </div>
    );
  }
}

export default Book;
Book.contextType = ThemeContext;
