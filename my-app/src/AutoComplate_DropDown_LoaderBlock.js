import React, { Component } from 'react';

class AutoComplate_DropDown_LoaderBlock extends Component{
    componentDidMount(){
        setTimeout(this.props.onLoadingBlock,1000,false);
    }
    render(){
        return(
            <p className="search_list_loader"><i className="fa fa-circle-o-notch fa-spin"></i>  Загрузка</p>
        )
    }
}

export default AutoComplate_DropDown_LoaderBlock
