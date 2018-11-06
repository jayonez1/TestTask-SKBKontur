import React, { Component } from 'react';

class Search_city extends Component {
    shouldComponentUpdate(nextProps) {
        return (this.props.hover !== nextProps.hover)
    }
    render(){
        const {hover, mouseHover, city_name, onClickCity} = this.props;
        return(
            <p
                className={hover}
                onMouseMove={mouseHover}
                onClick={onClickCity}
            >{city_name} </p>
        )
    }
}

export default Search_city
