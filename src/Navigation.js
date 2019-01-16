import React, { Component } from 'react';
import './Navigation.css';

const Navigation = ({onKeyPress, onChange, sources}) => {
    return (
        <React.Fragment>
        <KeywordSearch onKeyPress={onKeyPress}/>
        <DateInput onChange={onChange}/>
        <SourceFilter sources={sources} />
        </React.Fragment>
    )
}

const KeywordSearch = ({onKeyPress}) => {
    return (
        <div className="keyword">
            <input type="text" id="one" onKeyPress={ev => onKeyPress(ev.target.value)} />
        </div>
    );
}

const DateInput = ({onChange}) => {

    return (
        <div className="dateFilter">
            <input id="startDate" type="date" onChange={ev => onChange(ev.target.value)}></input>
            <input id="endDate" type="date" onChange={ev => onChange(ev.target.value)}></input>
        </div>
    );

}

class SourceFilter extends Component {

    constructor(props) {
        super(props);
        this.state = { optionsVisible : false };
    }

    handleClick() {
        this.setState({
            optionsVisible: !this.state.optionsVisible,
        });
    }

    renderSources() {
        const newsSourceList = this.props.sources.map((news) => {
            return (
                <div className="sourceCheck" key={news.id}>
                    <input type="checkbox" name={news.name}></input>
                    <div className="source">{news.name}</div>
                </div>
            );
        })
        return newsSourceList;
    }

    render() {
        return (
            <div className="sourceFilter">
                <div className="sourceOptionsButton" onClick={this.handleClick.bind(this)}>news options ∨</div>
                <div className="sourceOptions" style={{display: this.state.optionsVisible ? 'block' : 'none' }}>
                    {this.props.sources.length? this.renderSources() : 'Loading' }
                </div>
            </div>
        );
    }
}

export default Navigation;
