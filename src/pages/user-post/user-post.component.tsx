import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPostsStart} from "../../redux/post/post.actions";
import {selectSelectedPosts, selectSortType, selectIsPostLoaded} from "../../redux/post/post.selectors";
import SortDropdown from "../../components/sort-dropdrown/sort-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import WithSpinner from "../../components/withSpinner/with-spinner.component";
import PostOverview from "../../components/post-overview/post-overview.component";
import {PostsContainer} from "./user-post.styles";

const PostOverviewWithSpinner = WithSpinner(PostOverview);




const UserPosts = () =>{

    const dispatch = useDispatch();
    useEffect(() => {dispatch(fetchUserPostsStart())},
        [dispatch]);

    const isPostLoaded = useSelector(selectIsPostLoaded);
    const currentUser = useSelector(selectCurrentUser);
    const sortType = useSelector(selectSortType);
    const posts = useSelector(selectSelectedPosts);

    return (
    <PostsContainer>
        <SortDropdown/>
        <PostOverviewWithSpinner isLoading={!isPostLoaded} posts={posts} sortType={sortType}
                                 currentUser={currentUser}/>
    </PostsContainer>
    )
}

export default UserPosts;