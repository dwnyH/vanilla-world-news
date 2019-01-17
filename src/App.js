import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation.js';
import Articles from './Articles.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceOptions: [],
      articles: [],
      sources: [],
      q: '',
      from: '',
      to: ''
    };
  }

  async componentDidMount() {
    const sourceResponse = await fetch('https://newsapi.org/v2/sources?apiKey=05f484c7a0f54357ae8795760dc7d2b1');
    const sourceData = await sourceResponse.json();
    const sourceOptions = sourceData.sources;

    this.setState({
      sourceOptions,
      loading: true
    })
  }

  async getArticles(peace) {
    //https://newsapi.org/v2/everything?pageSize=30&sortBy=relevancy&apiKey=05f484c7a0f54357ae8795760dc7d2b1&from=2019-01-13&q=%22peace%22
    //console.log(this.state);
    debugger;

    const apiRequestUrl = 'https://newsapi.org/v2/everything?pageSize=30&sortBy=relevancy&apiKey=05f484c7a0f54357ae8795760dc7d2b1'
    const query = Object.keys(this.state)
                .filter(key => ['q','from','to', 'sources'].includes(key))
                .map(key =>
                  key === 'sources' ? (key + '=' + this.state.sources.join(',')) : (key + '=' + this.state[key])
                )
                .join('&');

    // const fromDate = {{this.state.fromDate ? this.state.fromDate : ''}};
    const articlesResponse = await fetch(`${apiRequestUrl}&${query}`);
    const articlesData = await articlesResponse.json();
    const articles = articlesData.articles;

    this.setState({
      articles
    })
  }

  getKeyword(keyword) {
    console.log(keyword);

    this.setState({
      keyword
    })
  }

  getDate(date) {
    console.log(date);
    let from;
    let to;

    if (date.includes('to')) {
      to = date.slice(3);
      this.setState({ to });
    } else {
      from = date.slice(5);
      this.setState({ from });
    }
  }

  getSources(checkedSources) {
    debugger;
    this.setState({
      sources : [...this.state.sources, checkedSources]
    })
  }

  render() {

    return (
      <div className="App">
        <div className="navigation">
          <Navigation
            sourceOptions={this.state.sourceOptions}
            keywordInput={this.getKeyword.bind(this)}
            dateSet={this.getDate.bind(this)}
            checkboxClick={this.getSources.bind(this)}
            onSearch={this.getArticles.bind(this)}
          />
        </div>

        <div className="articles">
          <Articles articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default App;
