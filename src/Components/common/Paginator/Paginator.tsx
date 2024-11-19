import React, { useState } from "react";
//@ts-ignore
import styles from './Paginator.module.css';
import classNames from "classnames";
import { PaginatorPropsType } from "../../../Types/Types";

let Paginator: React.FC<PaginatorPropsType> = ({ totalUsersCount,
        pageSize,
        currentPage,
        onPageChanged,
        portionSize = 10 }) => {

        let pagesCount = Math.ceil(totalUsersCount / pageSize);
        let pages: Array<number> = [];
        for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
        }

        let portionCount = Math.ceil(pagesCount / portionSize);
        let [portionNumber, setPortionNumber] = useState(1)
        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
        let rigthPortionPageNumber = portionNumber * portionSize;


        return <div className={styles.paginator}>
                {portionNumber > 1 &&
                        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</button>}

                {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rigthPortionPageNumber)
                        .map(p => {
                                return <span className={classNames({
                                        [styles.seletedPage]: currentPage === p
                                }, styles.pageNumber)}
                                        key={p}
                                        onClick={(e) => { onPageChanged(p) }} >{p}</span>
                        })}

                {portionCount > portionNumber &&
                        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>next</button>}
        </div>

}

export default Paginator;
