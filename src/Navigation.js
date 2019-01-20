import React, { Component } from 'react';
import './Navigation.css';

const Navigation = ({keywordInput, dateSet, checkboxClick, onSearch, sourceOptions}) => {
    return (
        <div className="navigation">
            <div className="navigationContext">
                <Title />
                <KeywordSearch keywordInput={keywordInput} />
                <DateInput dateSet={dateSet} />
                <SourceFilter checkboxClick={checkboxClick} sourceOptions={sourceOptions} />
                <SearchSubmit onSearch={onSearch} />
            </div>
        </div>
    )
}

const Title = (keyword) => {
    return (
        <React.Fragment>
            <div className="webTitle"> Vanilla News </div>
            <div className="line"></div>
            <div className="subtitle"> Explore channels, topics, and stories in News  </div>
        </ React.Fragment>
    )
}

const KeywordSearch = ({keywordInput}) => {
    return (
        <input type="text" className="keywordSearch" onChange={ev => keywordInput(ev.target.value)} />
    );
}

const DateInput = ({dateSet}) => {
    return (
        <div className="dateFilter">
        {/* <div className="sourceOptionsButton" onClick={this.handleClick.bind(this)}> news options ∨ </div>
        <div className="sourceOptions" style={{display: this.state.optionsVisible ? 'block' : 'none' }}>
            {this.props.sourceOptions.length? this.renderSourceOptions() : 'Loading' }
        </div> */}
            <label htmlFor="startDate">from</label>
            <input id="startDate" type="date"  placeholder="from" onChange={ev => dateSet(`from ${ev.target.value}`)}></input>
            <label htmlFor="endDate">to</label>
            <input id="endDate" type="date" onChange={ev => dateSet(`to ${ev.target.value}`)}></input>
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
                <div className="sourceOptionsButton" onClick={this.handleClick.bind(this)}>News Channel ∨ </div>
                <div className="sourceOptions" style={{display: this.state.optionsVisible ? 'block' : 'none' }}>
                    {this.props.sourceOptions.length? this.renderSourceOptions() : 'Loading' }
                </div>
            </div>
        );
    }
}

const SearchSubmit = ({onSearch}) => {
    return (
        <button className="search" onClick={onSearch.bind(null, true)}>Search</button>
    );
}

export default Navigation;
