import React, { Component } from 'react';
import './App.css';
import { debounce } from 'lodash';
import Navigation from './Navigation.js';
import Articles from './Articles.js';
import ViewButtons from './ViewButton.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceOptions: [],
      articles: [],
      sources: [],
      q: '',
      from: '',
      to: '',
      view: 'list',
      loading: false,
    };

    this.page = 0;
    this.searching = false;
    this.debouncedGettingInput = debounce(this.debouncedGettingInput.bind(this), 300);
    this.debouncedScroll = debounce(this.debouncedScroll.bind(this), 300);
    this.getKeyword = this.getKeyword.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.debouncedGettingInput = this.debouncedGettingInput.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getSources = this.getSources.bind(this);
    this.debouncedScroll = this.debouncedScroll.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  async componentDidMount() {
    const sourceResponse = await fetch('https://newsapi.org/v2/sources?apiKey=05f484c7a0f54357ae8795760dc7d2b1');
    const sourceData = await sourceResponse.json();
    const sourceOptions = sourceData.sources;

    this.searching = true;
    this.setState({
      sourceOptions
    });

    window.addEventListener('scroll', this.debouncedScroll.bind(this));
  }

  async getArticles(buttonClicked) {
    this.searching = true;

    if (buttonClicked) {
      this.page = 1;
    } else {
      this.page = this.page + 1;
    }

    const apiRequestUrl = `https://newsapi.org/v2/everything?pageSize=30&page=${this.page}&sortBy=popularity&apiKey=05f484c7a0f54357ae8795760dc7d2b1`
    const query = Object.keys(this.state)
      .filter(key => ['q', 'from', 'to', 'sources', 'page'].includes(key))
      .map(key =>
        key === 'sources' ? (key + '=' + this.state.sources.join(',')) : (key + '=' + this.state[key])
      )
      .join('&');

    try {
      this.setState({loading: true});
      const articlesResponse = await fetch(`${apiRequestUrl}&${query}`);
      const articlesData = await articlesResponse.json();
      let articles;

      if (buttonClicked) {
        articles = articlesData.articles;
      } else {
        articles = [...this.state.articles, ...articlesData.articles];
      }

      this.setState({ loading: false });

      if (!articles) {
        alert('검색 범위를 다시 설정해주세요 :)')
      } else if (!articles.length) {
        alert('검색결과가 없습니다.')
      } else {
        this.setState({ articles });
      }
    } catch (err) {
      alert('검색 범위를 다시 설정해주세요 :)');
    }

    this.searching = false;
  }

  getKeyword(keyword) {
    this.setState({
      q : keyword
    });
  }

  debouncedGettingInput(keyword) {
    this.getKeyword(keyword);
  }

  getDate(date) {
    let from;
    let to;

    if (date.includes('to')) {
      to = date.slice(3);
      this.setState({to});
    } else {
      from = date.slice(5);
      this.setState({from});
    }
  }

  getSources(checkedSources) {
    this.setState((prevState) => {
      const checkedSourceIndex = prevState.sources.indexOf(checkedSources.getAttribute('data-id'));
      const checkedSourceCopy = prevState.sources.slice();

      if (checkedSourceIndex === -1) {
        if (prevState.sources.length >= 20) {
          alert('신문사는 최대 20개까지만 선택 가능합니다 :)');
          checkedSources.checked = false;
          return;
        }
        return {sources: [...this.state.sources, checkedSources.getAttribute('data-id')]};
      } else {
        checkedSourceCopy.splice(checkedSourceIndex, 1);
        return {sources: checkedSourceCopy};
      }
    });
  }

  debouncedScroll() {
    if (!this.searching) {
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight) && this.state.articles.length) {
        this.getArticles();
      }
    }
  }

  changeView(className) {
    if (className.includes('list')) {
      this.setState({view: 'list'});
    } else {
      this.setState({view: 'card'});
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loading && <Loading />}
        <Navigation
          sourceOptions={this.state.sourceOptions}
          keywordInput={this.debouncedGettingInput}
          dateSet={this.getDate}
          checkboxClick={this.getSources}
          onSearch={this.getArticles}
        />
        <ViewButtons
          viewButtonClick={this.changeView}
          view={this.state.view}
          hasArticles={Boolean(this.state.articles.length)}
        />
        <Articles
          hasArticles={Boolean(this.state.articles.length)}
          articles={this.state.articles}
          view={this.state.view}
        />
      </div>
    );
  }
}

function Loading() {
  return (
    <div className="loadingPage">
      <div className="loader" />
    </div>
  );
}

export default App;
