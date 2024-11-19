import React, { useEffect, useState } from "react";
import axios from "axios";
//@ts-ignore
import style from './News.module.css'
//@ts-ignore
import authorAvatar from '../../img/avaProfile.jpg'
//@ts-ignore
import fonNews from '../../img/fonNews2.jpg'
import { NewDataType } from "../../Types/Types";


const News: React.FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [newsData, setNewsData] = useState<NewDataType[]>([]);

    

    async function getNewsData() {
        //Set loading boolean to true so that we know to show loading text
        setLoading(true);

        //Make news api call using axios
        const resp = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=9302c67949d945ecb3270ebee2bf7557&category=sport");
        
        setNewsData(resp.data.articles);

        //Set loading boolean to false so that we know to show news articles
        setLoading(false);

    }

    useEffect(() => {
        getNewsData();
    }, []);


    return (
        <div className={style.newsBlog}>
            <div className={style.fonBlog}>
                <h1>Новости</h1>
                <img src={fonNews} className={style.fonImg}/>
            </div>
            <div className={style.newsContent}>
                {newsData.map((newData: NewDataType) => (
                    <div className={style.news}>
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
                            <img src={authorAvatar} />
                            <span className={style.authorName}>
                                {newData.author || 'автор не указан'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default News;