import React from 'react'
import style from './target.module.css'

const completedGoals = [
    {id: 1, target: "Тренировка на растяжку", completed: true},
    {id: 1, target: "Кросс 5км", completed: true},
    {id: 1, target: "Востановление массаж", completed: true},
]
const processGoals = [
    {id: 1, target: "Подготовка к марафону", completed: false},
    {id: 1, target: "Прочитать книку", completed: false},
]
const futureGoals = [
    {id: 1, target: "Марафон", completed: false},
    {id: 1, target: "100кг жим лёжа", completed: false},
]

const TargetTest = () => {
  return (
    <div className={style.targetPage}>
        <div className={style.completedBlog}>
            <p>Выполненые задачи</p>

            <div>
                {completedGoals.map((goal) => (
                    <div>{goal.target}</div>
                ))}
            </div>
        </div>
        <div className={style.process}>
            <p>В Процессе</p>

            <div>
                {processGoals.map((process) => (
                    <div>{process.target}</div>
                ))}
            </div>
        </div>
        <div className={style.future}>
            <p>Будущие цели</p>

            <div>
                {futureGoals.map((future) => (
                    <div>{future.target}</div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TargetTest