import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { EditTargetFormProps } from "../../../Types/Types";
//@ts-ignore
import style from './EditTargetForm.module.css'



export const EditTargetForm: React.FC<EditTargetFormProps> = ({
  editTargetText,
  handleEditFormHide,
  selectedTarget,
  updatedTargetText
}) => {

  //@ts-ignore
  const [targetBody, setTargetBody] = useState(selectedTarget.target)

  const handleTargetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTargetBody(e.target.value)
  };


  const saveTarget = (e: React.FormEvent) => {
    e.preventDefault()
    const targetEdit = {
      //@ts-ignore
      id: selectedTarget.id,
      target: targetBody,
    }

    editTargetText(targetEdit)
    updatedTargetText(targetEdit)
    handleEditFormHide()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleEditFormHide();
      }
    };
    //@ts-ignore
    window.addEventListener('keyup', handleEscape)

    //@ts-ignore
    return () => window.removeEventListener('keyup', handleEscape)
  }, [handleEditFormHide])

  return (
    <>
      <form className={style.editPostForm}
      onSubmit={saveTarget}
      >
        <button className={style.hideBtn} onClick={handleEditFormHide}>
          <CancelIcon />
        </button>
        <h2>Редактирование поста</h2>
        
        <div>
          <textarea
            className={style.editFormInput}
            name="postDescription"
            placeholder="Текст поста"
            value={targetBody}
            onChange={handleTargetChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button
            // className="blackBtn"
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
      <div onClick={handleEditFormHide} className={style.overlay}></div>
    </>
  );
}