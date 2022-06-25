import React, {ChangeEvent} from 'react';

import {useDispatch} from "react-redux";
import {changeSort} from "../../redux/post/post.actions";

import {SortSelect, SortContainer} from "./sort-dropdown.styles";

const SortDropdown = () => {

    const dispatch = useDispatch();
    const changeSortHandler = (sortType:string) => dispatch(changeSort(sortType))
    const handleChange = (event : ChangeEvent<HTMLSelectElement>) => changeSortHandler(event.target.value)


          return (
            <SortContainer>
                <SortSelect onChange={handleChange}>
                    <option value='newestFirst'>Most recent</option>
                    <option value='oldestFirst'>Oldest first</option>
                </SortSelect>
            </SortContainer>
        );
}

export default SortDropdown;

