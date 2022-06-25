import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPostsStart} from "../../redux/post/post.actions";
import {selectSelectedPosts, selectSortType, selectIsPostLoaded} from "../../redux/post/post.selectors";
import SortDropdown from "../../components/sort-dropdrown/sort-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import WithSpinner from "../../components/withSpinner/with-spinner.component";
import PostOverview from "../../components/post-overview/post-overview.component";
import {PostsContainer} from "./all-posts.styles";

const PostOverviewWithSpinner = WithSpinner(PostOverview);




const AllPosts = () =>{

    const dispatch = useDispatch();
    useEffect(() => {dispatch(fetchPostsStart())},
        [dispatch]);
    const posts = useSelector(selectSelectedPosts);
    const currentUser = useSelector(selectCurrentUser);
    const isPostLoaded = useSelector(selectIsPostLoaded);
    const sortType = useSelector(selectSortType);


    return (
    <PostsContainer>
        <SortDropdown/>
        <PostOverviewWithSpinner isLoading={!isPostLoaded} posts={posts} sortType={sortType}
                                 currentUser={currentUser}/>
    </PostsContainer>
    )
}

export default AllPosts;