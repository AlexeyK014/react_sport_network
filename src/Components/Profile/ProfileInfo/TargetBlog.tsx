import React from 'react'
//@ts-ignore
import style from './ProfileInfo.module.css'
//@ts-ignore
import uncompleted from '../../../img/uncompleted.svg'
//@ts-ignore
import completed from '../../../img/completed.svg'
import { useGetTargetsQuery, useUpdatedTargetMutation } from '../../../reduxToolkit/targets/slice.ts'


const TargetBlog: React.FC = () => {

  const { data: targets } = useGetTargetsQuery();
  const [updatedTarget] = useUpdatedTargetMutation();


  return (
    <div className={style.targetBlog}>
      <div className={style.titlePage}>
        <h2 className={style.mainTitle}>Ближайшие цели</h2>
      </div>

      <div className={style.targets}>
        {targets?.map((target) => (
          <div className={target.completed ? style.targetTitleComplited : style.target} key={target.target}>
            {target.completed
              ? <img
                alt='imgProfile'
                src={completed} className={style.completed}
                onClick={(() => updatedTarget({ ...target, completed: !target.completed }))}
              />
              : <img
                alt='imgProfile'
                src={uncompleted} className={style.uncompleted}
                onClick={(() => updatedTarget({ ...target, completed: !target.completed }))}
              />
            }
            {target.target}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TargetBlog