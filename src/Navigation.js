import React, { Component } from 'react';
import './Navigation.css';

const Navigation = ({keywordInput, dateSet, checkboxClick, onSearch, sourceOptions}) => {
    return (
        <div className="navigation">
            <KeywordSearch keywordInput={keywordInput} />
            <DateInput dateSet={dateSet} />
            <SourceFilter checkboxClick={checkboxClick} sourceOptions={sourceOptions} />
            <SearchSubmit onSearch={onSearch} />
        </div>
    )
}

const KeywordSearch = ({keywordInput}) => {
    return (
        <div className="keyword">
            <input type="text" onChange={ev => keywordInput(ev.target.value)} />
        </div>
    );
}

const DateInput = ({dateSet}) => {
    return (
        <div className="dateFilter">
            <input className="startDate" type="date" onChange={ev => dateSet(`from ${ev.target.value}`)}></input>
            <input className="endDate" type="date" onChange={ev => dateSet(`to ${ev.target.value}`)}></input>
        </div>
    );

}

class SourceFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsVisible : false
        };
    }

    handleClick() {
        this.setState({
            optionsVisible: !this.state.optionsVisible,
        });
    }

    renderSourceOptions() {
        // const handleOnchange = (ev) => {
        //     //console.log(ev.target.checked);
        //     this.props.checkboxClick(ev.target);
        // }

        const newsSourceList = this.props.sourceOptions.map((news) => {
            return (
                <div className="sourceCheck" key={news.id}>
                    <input type="checkbox" data-id={news.id} onChange={(ev) => {this.props.checkboxClick(ev.target)}}></input>
                    <div className="source">{news.name}</div>
                </div>
            );
        });

        return newsSourceList;
    }

    render() {
        return (
            <div className="sourceFilter">
                <div className="sourceOptionsButton" onClick={this.handleClick.bind(this)}> news options ∨ </div>
                <div className="sourceOptions" style={{display: this.state.optionsVisible ? 'block' : 'none' }}>
                    {this.props.sourceOptions.length? this.renderSourceOptions() : 'Loading' }
                </div>
            </div>
        );
    }
}

const SearchSubmit = ({onSearch}) => {
    return (
        <button className="search" onClick={onSearch}>Search</button>
    );
}

export default Navigation;
