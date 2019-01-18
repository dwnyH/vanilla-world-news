import React, { Component } from 'react';
import './Articles.css';

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = { modalOpen : false, modalArticle : ''};
    }

    showModal(title) {
        let clickedArticle;
        console.log(this.props.articles);
        console.log('title', title);
        this.props.articles.map((article) => {
            if (article.title === title) {
                clickedArticle = article;
            }
        })
        this.setState({modalOpen : true, modalArticle : clickedArticle});
    }

    closeModal() {
        this.setState({modalOpen: false});
    }

    render() {
        return (
            <div className="articles">
                {this.props.view === 'list' ? <ListView articles={this.props.articles} titleClicked={this.showModal.bind(this)} /> : <CardView articles={this.props.articles} titleClicked={this.showModal.bind(this)} />}
                {this.state.modalOpen? <Modal article={this.state.modalArticle} closeButtonClicked = {this.closeModal.bind(this)} /> : null }
            </div>
        )
    }
}

const ListView = ({articles, titleClicked}) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectListStyle : true
    //     }
    // }

    // render() {
    const articleList = articles.map((articles, index) => {
        return (
            <div className="articleListBox" key={index}>
                <div className="title" onClick={(ev) => {titleClicked(ev.target.innerHTML)}}>{articles.title}</div>
                <div className="author">{articles.author}</div>
                <div className="pubDate">{articles.publishedAt}</div>
                <div className="source">{articles.source.name}</div>
                {/* <div className="description">{articles.description}</div> */}
            </div>
        );
    });

    return articleList;
    // }
}

const CardView = ({articles, titleClicked}) => {
//handleClick
    const articleList = articles.map((articles, index) => {
        return (
            <div className="articleCardBox" key={index}>
                <img src={articles.urlToImage} alt={articles.title} />
                <div className="author">{articles.author}</div>
                <div className="title"  onClick={(ev) => {titleClicked(ev.target.innerHTML)}}>{articles.title}</div>
            </div>
        );
    });

    return articleList;

}

const Modal = ({article, closeButtonClicked}) => {
    return (
        <React.Fragment>
            <button className="close" onClick={closeButtonClicked}> x </button>
            <ModalDetails article={article} />
        </React.Fragment>
    )
}

const ModalDetails = ({article}) => {
    console.log(article);
    return (
        <div className="articleModal">
            <img src={article.urlToImage} alt={article.title} />
            <div className="author">{article.author}</div>
            <div className="title">{article.title}</div>
            <div className="pubDate">{article.publishedAt}</div>
            <div className="description">{article.description}</div>
            <div className="url">{article.url}</div>
        </div>
    )
}

export default Articles;