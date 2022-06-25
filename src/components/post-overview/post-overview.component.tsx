import React from 'react';
import Post from "../post/post.component";
import {post as PostType, currentUser} from "../../App"

type PostsProps = {
    posts:[PostType],
    currentUser:currentUser,
    sortType:string
}

const PostOverview = ({posts, currentUser, sortType}:PostsProps) => {

    /**
     * Need to create an array of posts and flat, since sort is mutable.
     * @param posts
     * @returns {FlatArray<*[], 1>[]}
     */
    const renderByOldest = (posts:[PostType]) => [posts]
        .flat()
        .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
        .map((p)=> <Post key={p.postId} post={p} currentUser={currentUser}  />)
    const renderByNewest = (posts:[PostType]) => [posts]
        .flat()
        .sort((a, b) => a.createdAt.seconds + b.createdAt.seconds)
        .map((p) => <Post key={p.postId} post={p} currentUser={currentUser} />)

    if (posts !== null && posts.length) {
        return (
            <div className='post-overview'>
                {
                    sortType === 'newestFirst' ? renderByNewest(posts) : renderByOldest(posts)
                }
            </div>)
    }
    return <div/>
}

export default PostOverview;


