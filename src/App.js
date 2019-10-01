import React, { Component, useState, useContext, useEffect } from "react";
import "./App.css";
import { tsConstructorType } from "@babel/types";
import Book from "./Book";
import BookForm from "./BookForm";
import BookList from "./BookList";
import { ThemeContext, themes } from "./AppWrapper";
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

export function App(props) {
  let themeContext = useContext(ThemeContext);
  let [bookState, setBookState] = useState([]);
  let [dayState, setDayState] = useState(new Date());

  let addBook = async book => {
    let createBookResponse = await fetch(process.env.REACT_APP_BOOKS_URL, {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-Type": "application/json" }
    });
    setBookState([...bookState, await createBookResponse.json()]);
  };

  let handleLike = async bookID => {
    console.log(bookID);
    let updatedBooks = [...bookState];
    let bookIndex = updatedBooks.findIndex(book => book.id === bookID);
    let bookToUpdate = updatedBooks[bookIndex];
    console.log(updatedBooks);
    console.log(bookToUpdate);
    let likeStatus = bookToUpdate.liked ? "like" : "unlike";
    let toggleBookResponse = await fetch(
      `${process.env.REACT_APP_BOOKS_URL}/${likeStatus}/${bookID}`,
      {
        method: "POST"
      }
    );

    if (toggleBookResponse.ok) {
      bookToUpdate.liked = !bookToUpdate.liked;
      setBookState(updatedBooks);
    }
  };

  let getPeriodOfDay = () => {
    let h = dayState.getHours();
    if (h < 12) {
      return "morning";
    } else if (h < 19) {
      return "day";
    } else return "evening";
  };

  //old code no hooks
  {
    // GetPeriodOfDay = () => {
    //   let h = this.state.d.getHours();
    //   if (h < 12) {
    //     return "morning";
    //   } else if (h < 19) {
    //     return "day";
    //   } else return "evening";
    // };
    // addBook = book => {setBookState(...bookState, demoBooks:...)}
    // addBook = book => {
    //   this.setState({
    //     demoBooks: [...this.state.demoBooks, book]
    //   });
    // };
    // addBook = book => {
    //   // Append to books array and reset newBook object in state
    //   this.setState(prevState => ({
    //     // Copy current books array and add new element
    //     books: [...prevState.demoBooks, book]
    //   }));
    // };
    // using the prevState when modifying the class'state based on the previous
    // state is the better practice, because sometimes React batches state updates
    //(setState is asynchronous), so this.state might not ave the correct value
    // we want to use. Use prevState to get the exact previous state of the class
  }
  // end of old codes

  useEffect(() => {
    // console.log(themeContext);
    let booksURL = process.env.REACT_APP_BOOKS_URL;
    async function fetchBooks() {
      let bookResult = await fetch(booksURL);
      setBookState(await bookResult.json());
    }
    fetchBooks();
    console.log(themeContext.theme);
  });

  return (
    <BrowserRouter>
      <div>
        {" "}
        <header className="App-header">
          <Navbar></Navbar>
          <h1>Welcome to Beeblio!</h1>
          <p>
            The date is currently : {dayState.toLocaleDateString()} ,{" "}
            {dayState.toLocaleTimeString()}
            <br></br>
            Good {getPeriodOfDay()} !
          </p>
          <br></br>
          <Link to="/new">Add a new book</Link>
          <Route
            path="/new"
            render={() => <BookForm addBookProps={addBook} />}
          />
          <BookList books={bookState} />
          {bookState.length > 0 && (
            <Route
              path="/book/:index"
              render={routeParams => (
                <Book
                  values={bookState[routeParams.match.params.index]}
                  toggleLike={handleLike}
                />
              )}
            />
          )}
          <Link to="/about">About</Link>
          <Route path="/about" component={About} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

Navbar.contextType = ThemeContext;
