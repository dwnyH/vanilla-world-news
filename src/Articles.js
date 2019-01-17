import React, { Component } from 'react';
import './Articles.css';

const Articles = ({articles, view}) => {
    debugger;
    if (view === 'list') {
        return <ListView articles={articles} />
    } else {
        return <CardView articles={articles} />
    }
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectListStyle : true
        }
    }

    render() {
        debugger;
        const articleList = this.props.articles.map((articles, index) => {
            //console.log(articles);
            return (
                <div className="articleListBox" key={index}>
                    <div className="title">{articles.title}</div>
                    <div className="author">{articles.author}</div>
                    <div className="pubDate">{articles.publishedAt}</div>
                    <div className="source">{articles.source.name}</div>
                    {/* <div className="description">{articles.description}</div> */}
                </div>
            );
        });

        return articleList;
    }
}

const CardView = ({articles}) => {

    const articleList = articles.map((articles, index) => {
        return (
            <div className="articleCardBox" key={index}>
                <img src={articles.urlToImage} alt={articles.title} />
                <div className="author">{articles.author}</div>
                <div className="title">{articles.title}</div>
            </div>
        );
    });

    return articleList;

}

export default Articles;