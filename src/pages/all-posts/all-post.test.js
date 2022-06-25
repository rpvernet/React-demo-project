import React from 'react';
import { Provider} from "react-redux";
import { combineReducers, createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store' //ES6 modules


import AllPosts from './all-posts.component';

/*describe('All posts', () =>{
    it('render All posts', () =>{
        const props = {
            useDispatch:jest.fn(),
            isLoading:false,
            currentUser:{
                id:'12324',
                displayName:'tasty test'
            },
            sortType:'newestFirst',
            posts:{
                id:'222',
                postTitle:"let's test"
            }
        }

        const wrapper = mount(<Provider store={props}>
            <AllPosts {...props}/>
        </Provider>)
        expect(wrapper).toMatchSnapshot();
        })
    })*/



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
     let store;
     let wrapper;
     let mockFetchPostsStart;

     beforeEach(() => {
         const mockPostReducer = (
             state = {
                 posts:{isFetching: true
                 }
             }, action) => state;

        const mockUserReducer = (
            state = {
                user:{
                    currentUser:{
                        id:'1232',
                        displayName:'Tasty testy'
                    }
            }
            }, action)=> state;




         const mockState = {
             posts: {
                 isFetching: true
             },
             user:{
               currentUser:{
                   id:'1232',
                   displayName:'Tasty testy'
               }
             }
         };

         mockFetchPostsStart = jest.fn();

         store = combineReducers({mockUserReducer, mockPostReducer})




         const mockProps = {
             fetchPostsStart: mockFetchPostsStart
         };

         wrapper =shallow(
             <Provider store={store}>
                 <AllPosts {...mockProps}/>
             </Provider>
           );
     })


     it('should render AllPosts component', () => {
         expect(wrapper).toMatchSnapshot();
     });

});
