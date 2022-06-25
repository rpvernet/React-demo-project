import {createSelector} from 'reselect';

const selectPosts = state => state.posts;

export const selectSelectedPosts = createSelector(
    [selectPosts],
    posts => posts.posts
);

export const selectSortType = createSelector(
    [selectPosts],
    posts => posts.sortType
);

export const selectIsPostFetching = createSelector(
    [selectPosts],
    posts=> posts.isFetching
);

export const selectIsPostLoaded = createSelector(
    [selectPosts],
    posts => !!posts.posts
);
