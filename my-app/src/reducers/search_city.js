import CITYS from './citys';

const fakeAPI = () => {
    let fakeAPIreturn = {}
    const randCh = Math.floor(Math.random() * 10) + 1;
    if (randCh > 7 ) {
        fakeAPIreturn = {
            error : true,
            citys : []
        }
    } else {
        fakeAPIreturn = {
            error : false,
            citys : CITYS
        }
    }
    return fakeAPIreturn
}

const keyUpAndDown = (searchFiveCity) => {
    let x = 0;
    let hover_city = []
    let copy_searchFiveCity = [...searchFiveCity];
    copy_searchFiveCity.map((city,i) => {
        if (city.hover === "hover" && i+1 < copy_searchFiveCity.length){
            city.hover = '';
            x = 1;
        } else if (city.hover === '' && x === 1 ) {
            city.hover = "hover";
            x = 0;
        }
        hover_city.push(city);
    });
    return hover_city
}

const initialState = {
    searchFiveCity:[],
    allSearchCityLength:0,
    saveInputChange:"",
    viewBlock:false,
    loadingBlock:false,
    errorReloadBlock:false,
    errorMassageDownInput:false,
    saveInputId:false
};

export default function search_city(state = initialState, action) {
    let newState = {}
    switch(action.type) {

        case 'LOADING_BLOCK': {
            newState = {
                ...state,
                loadingBlock:action.payload,
            }
            return newState
        }

        case 'FIND_CITYS':{
            if (action.payload.length === 0){ return {...state, viewBlock:false, saveInputChange:'', errorMassageDownInput:false} }

            const fakeAPIreturn = fakeAPI()
            if (fakeAPIreturn.error === true){
                newState = {
                    ...state,
                    searchFiveCity:[],
                    errorReloadBlock:true,
                    viewBlock:true,
                    errorMassageDownInput:false,
                    saveInputChange:action.payload
                }
            } else {
                let search_city = []
                fakeAPIreturn.citys.map((city, i) => {
                    if (city.City.toLowerCase().indexOf(action.payload.toLowerCase()) === -1) {
                      return;
                    }
                    if (search_city.length === 0){
                        search_city.push({...city, "hover":"hover"})
                    }else {
                        search_city.push({...city, "hover":""})
                    }
                });
                newState = {
                    ...state,
                    searchFiveCity:search_city.slice(0, 5),
                    allSearchCityLength:search_city.length,
                    viewBlock:true,
                    errorReloadBlock:false,
                    errorMassageDownInput:false,
                    saveInputChange:action.payload
                }
            }
            return newState
        }

        case 'ON_HOVER_DOWN':{
            let hover_city = keyUpAndDown(state.searchFiveCity)
            newState = {
                ...state,
                searchFiveCity:hover_city
            }
            return newState
        }

        case 'ON_HOVER_UP':{
            let reverse_searchFiveCity = [...state.searchFiveCity].reverse();
            let hover_city = keyUpAndDown(reverse_searchFiveCity).reverse();
            newState = {
                ...state,
                searchFiveCity:hover_city
            }
            return newState
        }

        case 'ON_HOVER_MOUSE':{
            let hover_city = []
            state.searchFiveCity.map((city, i) => {
                if (city.Id === action.payload){
                    hover_city.push({...city, "hover":"hover"})
                } else {
                    hover_city.push({...city, "hover":""})
                }
            })
            newState = {
                ...state,
                searchFiveCity:hover_city
            }
            return newState
        }

        case 'HIDDEN_VIEW_BLOCK':{
            newState = {
                ...state,
                viewBlock:false
            }
            return newState
        }
        // запоминаем ID выбранного элемента
        case 'ON_CLICK_LIST':{
            newState = {
                ...state,
                saveInputId:action.payload
            }
            return newState
        }

        // Поиск совпадений при клике за блоком (запомнить ID)
        case 'SEARCH_MATCH':{
            let value = false
            state.searchFiveCity.map((city) => {
                if (city.City.toLowerCase() === state.saveInputChange.toLowerCase() && !value){
                    value = city.Id
                    newState = {
                        ...state,
                        saveInputId:value
                    }
                }
            })
            if (!value) {
                return state
            } else {
                return newState
            }
        }

        case 'ERROR_MASSAGE_DOWN_INPUT':{
            // Поиск подходящей ошибки
            if ((state.loadingBlock || (state.searchFiveCity.length === 0 && !state.errorReloadBlock)) && state.viewBlock){
                newState = {
                    ...state,
                    errorMassageDownInput:true
                }
                return newState
            }
        }

        default: return state;
    }
}
