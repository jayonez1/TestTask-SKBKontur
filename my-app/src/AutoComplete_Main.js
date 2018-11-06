import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplate_DropDown from "./AutoComplate_DropDown"

class AutoComplete_Main extends Component {
    constructor(props) {
        super(props);
        this.findCitys = this.findCitys.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputKeyPress = this.inputKeyPress.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.searchInput = React.createRef();
        this.autoComplete = React.createRef();
    }
    // Вызывается до рендера
    componentWillMount() {
      document.addEventListener('click', this.handleClickOutside, false);
    }
    // Вызывается после удаления компонента из DOM
    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, false);
    }
    //Клик вне AutoComplete = скрытие списка
    handleClickOutside(e) {
        if (this.autoComplete.current.contains(e.target)) {
            return
        } else {
            this.props.searchMatch();
            this.props.errorMassageDownInput();
            this.props.hidenViewBlock();
        }
    }
    //Поиск
    findCitys() {
        this.props.onLoadingBlock(true);
        this.props.onFindCitys(this.searchInput.current.value);
        this.searchInput.current.focus();
    }
    //Выделение внутри импута при получении фокуса
    inputFocus() {
        if (this.searchInput.current.value.length > 0){
            this.searchInput.current.select();
        }
    }
    //Нажатия кнопок при активном инпуте
    inputKeyPress(e) {
        //Нажатие ESC скрывает выпадающий список
        if (this.props.search_city.viewBlock) {
            if (e.keyCode === 27){
                this.props.hidenViewBlock()
            }
        }
        //Нажатия вверх и вниз, если в списке > 1 значения, если нет лоадера или ошибки
        if (this.props.search_city.searchFiveCity.length > 1 && !this.props.search_city.errorReloadBlock && !this.props.search_city.loadingBlock){
            switch(e.keyCode) {
                //клавиша вниз
                case 40: {
                    e.preventDefault();
                    this.props.onHoverDown();
                    break;
                }
                //клавиша вверх
                case 38: {
                    e.preventDefault();
                    this.props.onHoverUp();
                    break;
                }
            }
        }
        //Нажатия enter, если выпадающий список открыт и нет лоадера
        if (this.props.search_city.viewBlock && !this.props.search_city.loadingBlock){
            if (e.keyCode === 13) {
                if (this.props.search_city.errorReloadBlock) { //Если ошибка, перезагрузить список
                    this.findCitys();
                } else if (this.props.search_city.searchFiveCity.length > 0) { //Если в списке есть значения, выбрать подсвеченый
                    this.props.search_city.searchFiveCity.map((city) => {
                        if (city.hover === "hover"){
                            this.searchInput.current.value = city.City;
                            this.props.onClickList(city.Id);
                            this.props.hidenViewBlock();
                        }
                    })
                }
            }
        }
    }
    render(){
        const {search_city} = this.props
        const {searchInput, findCitys, inputFocus, inputKeyPress} = this
        return(
            <div id="autoComplete" className="autoComplete" ref={this.autoComplete}>
              <div>
                  <input
                      id="input_search"
                      type="text"
                      className={(search_city.errorMassageDownInput) ? "search_input_red": "search_input"}
                      placeholder="Начните вводить название"
                      ref={this.searchInput}
                      onChange={findCitys}
                      onKeyDown={inputKeyPress}
                      onFocus={inputFocus}
                  />
              </div>
              { (!search_city.viewBlock) ? null : <AutoComplate_DropDown findCitys={findCitys} searchInputRef = {searchInput} /> }
              { (search_city.errorMassageDownInput) ? <p className="error_massage_down_input">Выбирите значение из списка</p> : null }
            </div>
          );
    }
}

export default connect(
    state => ({
        search_city:state.AutoComplate_reducers
    }),
    dispatch => ({
        onLoadingBlock: (payload) => {
            dispatch({ type: 'LOADING_BLOCK', payload:payload });
        },
        onFindCitys: (name) => {
            dispatch({ type: 'FIND_CITYS', payload: name});
        },
        onHoverDown:() =>{
            dispatch({ type: 'ON_HOVER_DOWN'});
        },
        onHoverUp:() =>{
            dispatch({ type: 'ON_HOVER_UP'});
        },
        hidenViewBlock:() =>{
            dispatch({ type: 'HIDDEN_VIEW_BLOCK'});
        },
        onClickList:(id) =>{
            dispatch({ type: 'ON_CLICK_LIST', payload: id});
        },
        errorMassageDownInput:() =>{
            dispatch({ type: 'ERROR_MASSAGE_DOWN_INPUT'});
        },
        searchMatch:() =>{
            dispatch({ type: 'SEARCH_MATCH'});
        },
    })
)(AutoComplete_Main);
