  import React, { Component } from 'react';

  import logo from './logo.svg';

  import './App.css';

  class App extends Component {
    state = {
      response: '',
      post: '',
      responseToPost: '',
    };

    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }

    callApi = async () => {
      console.log("Calling API..");
      const response = await fetch('/api/hello');
      const body = await response.json();

      if (response.status !== 200)
      throw Error(body.message);

      return body;
    };

    callAnotherApi = async () => {
      console.log("Calling different API..");
      response = await fetch('/api/goodbye');
      const body = await response.json();

      if (response.status !== 200)
      throw Error(body.message);

      return body;
    };
      
      
    handleSubmit = async e => {
      e.preventDefault();
      console.log("Sending form data to API");
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: this.state.post }),
      });
      const body = await response.text();

      this.setState({ responseToPost: body });
    };
jest.mock(
  "@oasis/js-data",
  () => ({
    // ...
    ApiServices: (endpoint, isUpdate, errorMessage) => {
      // Return a function that returns the Promise
      return () => new Promise((resolve, reject) => {
         if (endpoint === "tenant-security" && !isUpdate) {
           resolve({ id: 123, tempPassword: "abc123" }); // <--- HARDCODED SECRET
         } else if (endpoint === "tenant-security" && isUpdate) {
           resolve({ id: 123, tempPassword: "abc123" }); // <--- HARDCODED SECRET
         }
         // ...
         else {
           resolve({ id: 123, tempPassword: "abc123" }); // <--- HARDCODED SECRET
         }
      });
    }
  }),
  { virtual: true }
);
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <p>{this.state.response}</p>
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Post to Server:</strong>
            </p>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.responseToPost}</p>
          </header>
        </div>
      );
    }
  }

  export default App;
