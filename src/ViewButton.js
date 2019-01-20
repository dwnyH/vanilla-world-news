import React, { Component } from 'react';
import './ViewButton.css';

const ViewButtons = ({view, changeView, hasArticles}) => {

    return (
        hasArticles &&
        <div className="viewButtons">
            <ListButton changeView={changeView} clicked={Boolean(view === 'list')} />
            <CardButton changeView={changeView} clicked={Boolean(view === 'card')} />
        </div>
    )
}

const ListButton = ({changeView, clicked}) => {
    return (
        <button className={`${clicked? "clicked": ''} listButton`} onClick={ev => changeView(ev.target.className)}>list</button>
    )
}

const CardButton = ({changeView, clicked}) => {
    return (
        <button className={`${clicked? "clicked": ''} cardButton`} onClick={ev => changeView(ev.target.className)}>card</button>
    )
}

export default ViewButtons;
