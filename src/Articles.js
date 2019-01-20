import React, { Component } from 'react';
import './Articles.css';

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = { modalOpen : false, modalArticle : ''};
    }

    showModal(title) {
        debugger;
        let clickedArticle;
        console.log(this.props.articles);
        console.log('title', title);
        this.props.articles.forEach((article) => {
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
            this.props.hasArticles &&
            <div className="articles">
                {this.props.view === 'list' ? <ListView articles={this.props.articles} titleClicked={this.showModal.bind(this)} /> : <CardView articles={this.props.articles} titleClicked={this.showModal.bind(this)} />}
                {this.state.modalOpen && <Modal article={this.state.modalArticle} closeButtonClicked = {this.closeModal.bind(this)} />}
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
                {articles.urlToImage? 
                    <img className="listImg" src={articles.urlToImage} alt="" />
                    : <img className="listImg" src="https://images.unsplash.com/photo-1532687675593-2c2e705c5a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />
                }
                {/* <img className="listImg" src={articles.urlToImage} alt="" /> */}
                <div className="title" onClick={(ev) => {titleClicked(ev.target.innerHTML)}}>{articles.title}</div>
                <div className="author">{articles.author}</div>
                <div className="pubDate">{articles.publishedAt}</div>
                <div className="publisher">{articles.source.name}</div>
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
                {articles.urlToImage?
                    <img src={articles.urlToImage} alt="" />
                    : <img src="https://images.unsplash.com/photo-1532687675593-2c2e705c5a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />
                }
                <div className="cardText">
                    <div className="title"  onClick={(ev) => {titleClicked(ev.target.innerHTML)}}>{articles.title}</div>
                    <div className="author">{articles.author}</div>
                </div>
            </div>
        );
    });

    return (
        <div className="articleCard">
            {articleList}
        </div>
    )
}

const Modal = ({article, closeButtonClicked}) => {
    return (
        <React.Fragment>
            <ModalDetails article={article} close={closeButtonClicked}/>
        </React.Fragment>
    )
}

const ModalDetails = ({article, close}) => {
    debugger;
    console.log(article);
    return (
        <div className="articleModal" onClick={close}>
            <div className="modalBox">
                {article.urlToImage?
                    <img src={article.urlToImage} alt="" />
                    : <img src="https://images.unsplash.com/photo-1532687675593-2c2e705c5a9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="" />
                }
                <div className="contents">
                    <div className="title">{article.title}</div>
                    <div className="author">{article.author}</div>
                    <div className="pubDate">{article.publishedAt}</div>
                    <div className="description">{article.description}</div>
                    <div className="url">{article.url}</div>
                </div>
            </div>
        </div>
    )
}

export default Articles;
