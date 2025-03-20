import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
//@ts-ignore
import style from '../Posts.module.css'
import { useGetProfileQuery } from '../../../../../reduxToolkit/profile/slice.ts';
//@ts-ignore
import userProfile from '../../../../../img/avaUsers.png'
import { PostPropsType } from '../../../../../Types/Types.ts';


const Post: React.FC<PostPropsType> = ({
    userId,
    post,
    updatedPost,
    likeCount,
    deletePost,
    handleEditFormShow,
    handleSelectPost
}) => {
    const { data: profile } = useGetProfileQuery(userId)


    const showEditForm = () => {
        handleSelectPost();
        handleEditFormShow();
    };


    return (
        <div>
            <div className={style.postContent}>
                <div className={style.infoUser}>
                    <div>
                        <img
                            src={+userId && (profile?.photos.large || userProfile) || (profile?.photos.large || userProfile)}
                            className={style.avatarHeader}
                            alt="avatarProfile">
                        </img>
                    </div>
                    <div className={style.nameUser}>
                        <span>{profile?.fullName}</span>
                    </div>
                </div>

                <div className={style.titlePost}>
                    <label htmlFor={post.id.toString()}>{post.title}</label>
                </div>
                <div>
                    <label htmlFor={post.id.toString()} className={style.descriptionPost}>{post.description}</label>
                </div>
            </div>

            <div className={style.postControl}>
                <div className={style.likeButton}>
                    <FavoriteIcon
                        style={post.liked ? { fill: 'red' } : { fill: '#808080' }}
                        id={post.id.toString()}
                        onClick={(() => updatedPost({ ...post, liked: !post.liked }))}
                    />
                    {post.liked === false
                        ? likeCount === 0
                        : likeCount + 1
                    }
                </div>
                <div>
                    <div className={style.editPost}>
                        <EditIcon className={style.editBtn}
                            onClick={() => showEditForm()}
                            id={post.id.toString()}
                            style={{ fill: '#3B2D41' }} />
                        <span className={style.editTooltip}>Редактировать</span>
                    </div>
                    <div className={style.deletePost}>
                        <DeleteForeverIcon
                            className={style.deleteBtn}
                            onClick={() => deletePost({ id: post.id })}
                            style={{ fill: '#3B2D41' }}
                        />
                        <span className={style.deleteTooltip}>Удалить</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post