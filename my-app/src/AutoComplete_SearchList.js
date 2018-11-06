import React from 'react';
import { connect } from 'react-redux';
import AutoComplete_SearchElem from "./AutoComplete_SearchElem"

const AutoComplete_SearchList = ({searchInputRef, search_city, onHoverMouse, onClickList, hidenViewBlock}) => {
    const onClickCity = (id) => {
        search_city.searchFiveCity.map((city) => {
            if (city.Id === id) {
                searchInputRef.current.value = city.City;
            }
        })
        onClickList(id);
        hidenViewBlock();
    }
    return(
        <div>
            <div className="search_list_filter">
                {
                    search_city.searchFiveCity.map((city, index) =>
                        <AutoComplete_SearchElem
                            key={index}
                            hover={city.hover}
                            mouseHover={() => onHoverMouse(city.Id)}
                            city_name={city.City}
                            onClickCity={() =>onClickCity(city.Id)}
                        />
                    )
                }
            </div>
            {
                (search_city.allSearchCityLength > 5)?
                    <div className="search_list_allcity">
                        <p>Показано {search_city.searchFiveCity.length} из {search_city.allSearchCityLength} найденых городов.</p>
                        <p>Уточните запрос, чтобы увидеть остальные</p>
                    </div> : null
            }
        </div>
    )
}

export default connect(
    state => ({
        search_city:state.AutoComplate_reducers
    }),
    dispatch => ({
        onHoverMouse:(id) =>{
            dispatch({ type: 'ON_HOVER_MOUSE', payload: id});
        },
        hidenViewBlock:() =>{
            dispatch({ type: 'HIDDEN_VIEW_BLOCK'});
        },
        onClickList:(id) =>{
            dispatch({ type: 'ON_CLICK_LIST', payload: id});
        }
    })
)(AutoComplete_SearchList);
