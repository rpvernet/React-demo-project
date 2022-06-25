import React from 'react';
import { mount } from 'enzyme';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import UserPosts from './user-post.component';

export const createMockStore = ({ state, reducers }) => {
    const store = createStore(combineReducers(reducers), state);
    return {
        ...store,
        persistor: {
            persist: () => null
        }
    };
};

describe ('UserPosts', () => {
    let wrapper;
    let mockFetchUserPostsStart;
    let store;

    beforeEach(() => {
        const mockReducer = (
            state = {
                isFetching: true
            },
            action
        ) => state;

        const mockState = {
            posts: {
                isFetching: true
            },
            user: {
                currentUser: {
                    id: '123',
                    displayName: 'TastyTesty'
                }
            }


        };

    mockFetchUserPostsStart = jest.fn()

        store = createMockStore({
            state: mockState,
            reducers: { posts: mockReducer }
        });

        const mockMatch = {
            path: ''
        };

        const mockProps = {
            match: mockMatch,
            mockFetchUserPostsStart: mockFetchUserPostsStart,
            user: {
                currentUser: {
                    id: '123',
                    displayName: 'TastyTesty'
                }
            }
        };

        wrapper = mount(

                <Provider store={store}>
                    <UserPosts {...mockProps} />
                </Provider>

        );
    });

    it('should render UserPosts component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render UserPosts component', () => {
        expect(mockFetchUserPostsStart).toHaveBeenCalled();
    });

});

