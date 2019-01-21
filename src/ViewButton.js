import React, { Component } from 'react';
import './ViewButton.css';

function ViewButtons({view, viewButtonClick, hasArticles}) {
    return (
        hasArticles &&
        <div className="viewButtons">
            <ListButton changeView={viewButtonClick} clicked={Boolean(view === 'list')} />
            <CardButton changeView={viewButtonClick} clicked={Boolean(view === 'card')} />
        </div>
    );
}

function ListButton({changeView, clicked}) {
    return (
        <button className={`${clicked? "clicked": ''} listButton`} onClick={ev => changeView(ev.target.className)}>
            list
        </button>
    );
}

function CardButton({changeView, clicked}) {
    return (
        <button className={`${clicked? "clicked": ''} cardButton`} onClick={ev => changeView(ev.target.className)}>
            card
        </button>
    );
}

export default ViewButtons;
