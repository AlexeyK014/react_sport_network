import React, { ChangeEvent, useEffect, useState } from "react";
//@ts-ignore
import style from './ProfileStatus.module.css'
import { useGetStatusQuery, useUpdatedStatusMutation } from "../../../../reduxToolkit/profile/slice.ts";
import { ProfileStatusHOOKSType } from "../../../../Types/Types.ts";


const ProfileStatusHOOKS: React.FC<ProfileStatusHOOKSType> = ({ userId, id }) => {


    const { data: statusUser, refetch } = useGetStatusQuery(id ? id : 0, {
        refetchOnMountOrArgChange: true,
    })

    const [updatedStatus] = useUpdatedStatusMutation();

    let [editeMode, setEditeMode] = useState<boolean>(false);
    //@ts-ignore
    let [statusText, setStatusText] = useState<string>(statusUser || '');

    useEffect(() => {
        if (userId !== null && id !== null && +userId === +id) {
        }
    }, [statusUser])

    useEffect(() => {       // происходит после отрисовки всей компаненты
        // Убедимся, что statusUser не null перед установкой значения
        if (statusUser !== null) {
            //@ts-ignore
            setStatusText(statusUser);
        }
    }, [statusUser])


    const activateMode = () => {
        setEditeMode(true)
    }
    const deactiveteEditeMode = async (e: React.FormEvent) => {
        e.preventDefault()
        const statusEdit = {
            status: statusText
        }
        await updatedStatus(statusEdit);
        refetch();
        setEditeMode(false);

    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.currentTarget.value)
        console.log(e.target.value);

    }


    return (
        <div className={style.statusBlog}>
            {!editeMode &&
                <div>
                        {userId !== null && id !== null && +userId === +id
                            //@ts-ignore
                            ? (<span onDoubleClick={activateMode} className={style.statusActive}>{statusUser || '--'}</span>
                            //@ts-ignore
                            ) : (<span>{statusUser || '--'}</span>)
                        }
                </div>
            }
            {editeMode &&
                <form onSubmit={deactiveteEditeMode}>
                        <input
                            onChange={onStatusChange}
                            value={statusText}
                            autoFocus={true}
                            onBlur={deactiveteEditeMode}
                            className={style.statusInput} />

                </form>
            }
        </div>
    )
}
export default ProfileStatusHOOKS
