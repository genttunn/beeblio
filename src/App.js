import React, { Component } from "react";
import "./App.css";
import { tsConstructorType } from "@babel/types";
import Book from "./Book";
import BookForm from "./BookForm";
import BookList from "./BookList";
import { ThemeContext } from "./AppWrapper";
import { BrowserRouter, Link, Route } from "react-router-dom";
export class Navbar extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.context.setTheme}>Change theme</button>
      </div>
    );
  }
}

function About() {
  return (
    <div>Beeblio was developed @ HES-SO Valais, thanks for your interest!</div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d: new Date(),
      demoBooks: [
        {
          title: "Don Quixote",
          author: "Miguel de Cervantes",
          year: 1605,
          pages: 1032,
          cover: "http://fast.hevs.ch/temp/covers/1.png"
        },
        {
          title: "Alice's Adventures in Wonderland",
          author: "Lewis Carroll",
          year: 1865,
          pages: 192,
          cover: "http://fast.hevs.ch/temp/covers/2.jpeg"
        },
        {
          title: "The Adventures of Huckleberry Finn",
          author: "Mark Twain",
          year: 1884,
          pages: 327,
          cover: "http://fast.hevs.ch/temp/covers/3.jpeg"
        }
      ]
    };
  }

  GetPeriodOfDay = () => {
    let h = this.state.d.getHours();
    if (h < 12) {
      return "morning";
    } else if (h < 19) {
      return "day";
    } else return "evening";
  };

  addBook = book => {
    this.setState({
      demoBooks: [...this.state.demoBooks, book]
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          {" "}
          <header className="App-header" style={this.context.theme}>
            <Navbar></Navbar>
            <h1>Welcome to Beeblio!</h1>
            <p>
              The date is currently : {this.state.d.toLocaleDateString()} ,{" "}
              {this.state.d.toLocaleTimeString()}
              <br></br>
              Good {this.GetPeriodOfDay()} !
            </p>
            <br></br>
            <Link to="/new">Add a new book</Link>
            <Route
              path="/new"
              render={() => <BookForm addBookProps={this.addBook} />}
            />
            <BookList books={this.state.demoBooks} />
            <Route
              path="/book/:index"
              render={routeParams => (
                <Book
                  values={this.state.demoBooks[routeParams.match.params.index]}
                />
              )}
            />
            <Link to="/about">About</Link>
            <Route path="/about" component={About} />
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

Navbar.contextType = ThemeContext;
App.contextType = ThemeContext;
