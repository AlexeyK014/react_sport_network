import React, { useState } from 'react'
import { useAddTargetMutation, useDeleteTargetMutation, useGetTargetsQuery, useUpdatedTargetMutation, useUpdatedTargetTextMutation } from '../../reduxToolkit/targets/slice.ts';
//@ts-ignore
import style from './Targets.module.css'
import Preloader from '../common/Preloader/Preloader.tsx';
import Target from './Target/Target.tsx';
import { EditTargetForm } from './EditTargetForm/EditTargetForm.tsx';
import TargetFrom from './TargetFrom.tsx';
import { TargetType } from '../../Types/Types.ts';



const Targets: React.FC = () => {
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [selectedTarget, setSelectedTarget] = useState<TargetType | null>(null);

    const { data: targets } = useGetTargetsQuery()
    const [addTarget] = useAddTargetMutation()
    const [deleteTarget] = useDeleteTargetMutation()
    const [updatedTarget] = useUpdatedTargetMutation()
    const [updatedTargetText] = useUpdatedTargetTextMutation()

    console.log(targets);
    


    const handleSelectTarget = (target: TargetType | null) => {
        setSelectedTarget(target);
    };
    const editTargetText = (updatedTarget: TargetType) => {
        updatedTargetText(updatedTarget)
    };


    const handleEditFormShow = () => {
        setShowEditForm(true);
    };

    const handleEditFormHide = () => {
        setShowEditForm(false);
    };




    return (
        <div className={style.targetPage}>
            <h1>Мои цели</h1>
            <TargetFrom addTarget={addTarget}/>
            {targets
                ? <div>
                    {targets.map((target) => <div>
                        {showEditForm &&
                            <EditTargetForm
                                editTargetText={editTargetText}
                                updatedTargetText={updatedTargetText}
                                selectedTarget={selectedTarget}
                                handleEditFormHide={handleEditFormHide}
                            />
                        }
                        <Target
                            target={target}
                            deleteTarget={deleteTarget}
                            updatedTarget={updatedTarget}
                            handleSelectTarget={() => handleSelectTarget(target)}
                            handleEditFormShow={handleEditFormShow}
                        />
                    </div>)}
                </div>
                : (<Preloader />)
            }
        </div >
    )
}

export default Targets