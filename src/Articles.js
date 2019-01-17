import React, { Component } from 'react';
import './Articles.css';

const Articles = ({articles}) => {
    debugger;
    return <ListView articles={articles} />
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectListStyle : true
        }
    }

    render() {
        console.log(this.props.articles)
        const articleList = this.props.articles.map((articles) => {
            return (
                <div className="articleListBox" key={articles.title}>
                    <div className="title">{articles.title}</div>
                    <div className="author">{articles.author}</div>
                    <div className="pubDate">{articles.publishedAt}</div>
                    <div className="source">{articles.source.name}</div>
                </div>
            );
        });

        return articleList;
    }
}

// class ListViewDetails extends Component {
//     render() {
//         <div className="articleListBox" key={articles.title}>
//             <div className="title">{articles.title}</div>
//             <div className="author">{articles.author}</div>
//             <div className="pubDate">{articles.publishedAt}</div>
//             <div className="source">{articles.source.name}</div>
//         </div>
//     }
// }

{/* // class Modal extends Component {

// } */}

// class ModalDetails extends Component {

// }

export default Articles;