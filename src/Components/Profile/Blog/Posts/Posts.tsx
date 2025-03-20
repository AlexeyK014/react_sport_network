import React, { useState } from 'react'
import { useDeletePostMutation, useGetPostsQuery, useUpdatePostMutation } from '../../../../reduxToolkit/blog/slice.ts'
//@ts-ignore
import style from './Posts.module.css'
import { EditPostForm } from '../EditPostForm/EditPostForm.tsx';
import Post from './Post/Post.tsx';
import { BlogPropsType, PostType } from '../../../../Types/Types.ts';

const Posts: React.FC<BlogPropsType> = ({ userId }) => {
    const [likeCount, setLikeCount] = useState<number>(0)
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState({});

    const { data, isLoading } = useGetPostsQuery()
    const [updatedPost] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()
    

    const handleSelectPost = (post: PostType) => {
        setSelectedPost(post);
    };

    const handleEditFormShow = () => {
        setShowEditForm(true);
    };

    const handleEditFormHide = () => {
        setShowEditForm(false);
    };
    

    return (
        <div>
            {isLoading
                ? <p>Loading....</p>
                //@ts-ignore
                : (data.map((post: PostType) => {
                    return (
                        <div key={post.id} className={style.post}>

                            {showEditForm &&
                                <EditPostForm
                                    selectedPost={selectedPost}
                                    handleEditFormHide={handleEditFormHide}
                                />
                            }
                            <Post 
                                userId={userId}
                                post={post}
                                updatedPost={updatedPost}
                                deletePost={deletePost}
                                likeCount={likeCount}
                                handleEditFormShow={handleEditFormShow}
                                handleSelectPost={() => handleSelectPost(post)}
                            />
                        </div>
                    )

                })
                )
            }
        </div>
    )
}

export default Posts