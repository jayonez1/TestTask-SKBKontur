import React from 'react';

const AutoComplate_DropDown_ErrorBlock = ({findCitys}) => {
    return(
        <div className="search_list_error">
            <p className="search_list_error-text">Что-то пошло не так. Проверьте соединение с интернетом и попробуйте ещё раз</p>
            <p className="search_list_error-reload" onClick={findCitys}>Обновить</p>
        </div>
    )
}

export default AutoComplate_DropDown_ErrorBlock
