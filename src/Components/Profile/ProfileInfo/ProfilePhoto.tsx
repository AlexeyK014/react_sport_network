import React, { useEffect, useState } from 'react'
//@ts-ignore
import style from './ProfileInfo.module.css'
//@ts-ignore
import userProfile from '../../../img/avaUsers.png'
import { useGetProfileQuery, useSavePhotoMutation } from '../../../reduxToolkit/profile/slice.ts'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'
import { useSetAuthQuery } from '../../../reduxToolkit/auth/slice.ts'


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProfilePhoto: React.FC = () => {

    let { id } = useParams<{ id: string }>();
    const [skipProfile, setSkipProfile] = useState<boolean>(true)

    // Преобразуем id в число, только если оно определено и является корректным числом
    const parsedId = id ? +id : null;

    //@ts-ignore
    const { userId } = useSetAuthQuery('authUser', {
        // skip: skipAuth,
        selectFromResult: ({ data }) => ({
            userId: data?.userId,
            loginUser: data?.loginUser,
            resultCode: data?.resultCode
        })
    })

    //@ts-ignore
    const { data: profile, refetch } = useGetProfileQuery(parsedId, {
        refetchOnMountOrArgChange: true,
        skip: skipProfile
    })
    const [savePhoto, { isLoading: waiteUpdatePhoto }] = useSavePhotoMutation()

    const handleAvaChange = async (e) => {
        await savePhoto(e.target.files[0]);
        refetch()
    }

    useEffect(() => {
        if (parsedId !== null) {
            setSkipProfile(false)
        } else if (!id) {
            setSkipProfile(true)
        }
    }, [parsedId, profile])

    return (
        <div>
            <div className={waiteUpdatePhoto ? style.updatePhoto : style.avatar}>
                <div>
                    {waiteUpdatePhoto && <Spin indicator={antIcon} className={style.spinPhoto} />}
                    <img src={profile?.photos.large || userProfile} alt="profileFoto" className={style.mainPhoto} />
                </div>
            </div>

            <div className={style.changePhoto}>
                {parsedId !== null &&
                    <div>
                        <input
                            onChange={handleAvaChange}
                            name="file"
                            type="file"
                            id="input__file"
                            className={style.input__file}
                            multiple
                        />

                        <div className={style.changeAvatarBlog}>
                            {userId !== undefined && parsedId === userId &&
                                <label htmlFor="input__file" className={style.inputFileButton}>
                                    <div className={style.inputFileButtonText}>
                                        <p>Поменять аватар</p>
                                    </div>
                                </label>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default ProfilePhoto