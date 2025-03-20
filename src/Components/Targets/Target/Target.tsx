import React from 'react'
//@ts-ignore
import style from '../Targets.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TargetProps } from '../../../Types/Types';



const Target: React.FC<TargetProps> = ({
    target, 
    updatedTarget,
    deleteTarget,
    handleEditFormShow,
    handleSelectTarget
}) => {

    const showEditForm = () => {
        handleSelectTarget(target);
        handleEditFormShow();
    };
    return (
        <div key={target.id} className={style.target}>
            <div className={style.targetBlock}>
                <div className={target.completed ? style.targetTitleComplited : style.targetTitle}>
                    {target.target}
                </div>
            </div>

            <div className={style.reactionBlog}>
                    <div className={style.textHint}>
                        <FontAwesomeIcon
                            className={style.editIcon}
                            icon={faPenToSquare}
                            onClick={() => showEditForm()}
                        />
                        <span className={style.editTooltip}>Редактировать</span>
                    </div>

                    <div className={style.textHint}>
                        <FontAwesomeIcon
                            className={style.deleteIcon}
                            icon={faTrash}
                            onClick={() => deleteTarget({ id: target.id })}
                        />
                        <span className={style.editTooltip}>Удалить</span>
                    </div>

                    <div className={style.textHint}>
                        <FontAwesomeIcon
                            className={style.deleteIcon}
                            icon={target.completed ? faCheckCircle : faCircle}
                            onClick={(() => updatedTarget({ ...target, completed: !target.completed }))}
                        />
                        <span className={style.editTooltip}>{target.completed ? 'Выполнено' : 'Отметить как выполено'}</span>
                    </div>

                </div>
        </div>
    )
}

export default Target