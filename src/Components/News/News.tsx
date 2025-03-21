import React, { useEffect, useState } from "react";
//@ts-ignore
import style from './News.module.css';
//@ts-ignore
import authorAvatar from '../../img/avaProfile.jpg';
//@ts-ignore
import fonNews from '../../img/fonNews2.jpg';
import { NewsItem } from "../../Types/Types";
import Preloader from "../common/Preloader/Preloader.tsx";
import { useGetNewsQuery } from "../../reduxToolkit/news/slice.ts";


export const News: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const { data } = useGetNewsQuery();
    console.log(data);
    


    return (
        <div className={style.newsBlog}>
            {isLoading ? (
                <Preloader />
            ) : (
                <><div className={style.fonBlog}>
                    <h1>Новости</h1>
                    <img src={fonNews} className={style.fonImg} alt="Фон новостей" />
                </div><div className={style.newsContent}>
                        {data?.articles.map((newData: NewsItem) => (
                            <div className={style.news} key={newData.url}>
                                <div className={style.imgBlock}>
                                    <img src={newData.urlToImage} className={style.imgNews} alt={newData.title} />
                                </div>
                                <div className={style.titleBlog}>
                                    <span className={style.line}></span>
                                    <h1 className={style.newsTitle}>
                                        {newData.title}
                                    </h1>
                                </div>

                                <div className={style.newsDescription}>
                                    {newData.description}
                                </div>

                                <div className={style.authorBlog}>
                                    <img src={authorAvatar} alt="Аватар автора" />
                                    <span className={style.authorName}>
                                        {newData.author || 'автор не указан'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div></>
            )}
        </div>
    )
}