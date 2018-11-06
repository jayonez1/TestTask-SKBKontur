import React from 'react';
import { connect } from 'react-redux';

import AutoComplete_SearchList from "./AutoComplete_SearchList"
import AutoComplate_DropDown_LoaderBlock from "./AutoComplate_DropDown_LoaderBlock"
import AutoComplate_DropDown_ErrorBlock from "./AutoComplate_DropDown_ErrorBlock"

const AutoComplate_DropDown = ({searchInputRef, search_city, findCitys, onLoadingBlock}) => {
    return(
        <div className="search_list">
            {
                (search_city.loadingBlock) ? <AutoComplate_DropDown_LoaderBlock onLoadingBlock={onLoadingBlock} /> :
                    (search_city.errorReloadBlock) ? <AutoComplate_DropDown_ErrorBlock findCitys={() => findCitys()} /> :
                        (search_city.searchFiveCity.length > 0) ? <AutoComplete_SearchList searchInputRef={searchInputRef} /> :
                            <div className="search_list_nodata">Не найдено</div>
            }
        </div>
    )
}

export default connect(
    state => ({
        search_city:state.AutoComplate_reducers
    }),
    dispatch => ({
        onLoadingBlock: (payload) => {
            dispatch({ type: 'LOADING_BLOCK', payload:payload });
        }
    })
)(AutoComplate_DropDown);
