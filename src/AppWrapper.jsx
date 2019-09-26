import React, { Component } from "react";
import App from "./App";

export const ThemeContext = React.createContext();
//// this ThemeContext can go anywhere, inn another file even. Thats prolly the best way to put it.
//// To use, import it to the wrapper of context (bigger level of component needed))
//// In wrapper pass values. These values can then be accessed by any child of the wrapper.
//// For children: import the ThemeContext, set Children.contextType = ThemeContext at end of code;
//// Then access the context object with this.context

const themes = {
  light: {
    background: "#fefefe",
    foreground: "#333333",
    bookBackground: "#efefef",
    color: "black"
  },
  dark: {
    background: "#282c34",
    foreground: "white",
    bookBackground: "transparent",
    color: "white"
  }
};

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: themes.dark };
  }
  toggleTheme = () => {
    this.setState(state => ({
      theme: this.state.theme === themes.dark ? themes.light : themes.dark
    }));
  };
  render() {
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, setTheme: this.toggleTheme }}
      >
        <App />
      </ThemeContext.Provider>
    );
  }
}

export default AppWrapper;
