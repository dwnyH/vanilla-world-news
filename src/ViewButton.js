import React, { Component } from 'react';
import './ViewButton.css';

const ViewButtons = ({changeView}) => {
    return (
        <React.Fragment>
            <ListButton changeView={changeView}/>
            <CardButton changeView={changeView}/>
        </React.Fragment>
    )
}

const ListButton = ({changeView}) => {
    return <button className="listButton" onClick={ev => changeView(ev.target.className)}>list</button>
}

const CardButton = ({changeView}) => {
    return <button className="cardButton" onClick={ev => changeView(ev.target.className)}>card</button>
}

export default ViewButtons;