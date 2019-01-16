import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import Articles from './Articles.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {sources: [], articles:[], loading: false};
  }

  async componentDidMount() {
    const sourceResponse = await fetch('https://newsapi.org/v2/sources?language=en&apiKey=05f484c7a0f54357ae8795760dc7d2b1');
    const sourceData = await sourceResponse.json();
    const sources = sourceData.sources;

    this.setState({
      sources,
      loading: true
    })
  }

  async getArticles(inputValue) {
    const articlesResponse = await fetch(`https://newsapi.org/v2/everything?q=${inputValue}&apiKey=05f484c7a0f54357ae8795760dc7d2b1`);
    const articlesData = await articlesResponse.json();
    const articles = articlesData.articles;

    this.setState({
      articles
    })
  }

  getDate(date) {
    console.log(date);
  }

  render() {

    return (
      <div className="App">
        <div className="navigation">
          <Navigation
            sources={this.state.sources}
            onKeyPress={this.getArticles.bind(this)}
            onChange={this.getDate.bind(this)}
          />
          <Articles articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default App;
