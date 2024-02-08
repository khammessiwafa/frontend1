import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { getById } from '../../services/articleServices';
import classes from './articlePage.module.css';

export default function ArticlePage() {
    const [article, setArticle] = useState({});
    const { id } = useParams();


    useEffect(() => {
        getById(id).then(setArticle);
    }, [id]);
    return (
        <>
            {article && (
                <div className={classes.container}>
                    <img
                        className={classes.image}
                        src={`/articles/${article.imageUrl}`}
                        alt={article.name}
                    />

                    <div className={classes.details}>
                        <div className={classes.header}>
                            <span className={classes.name}>{article.name}</span>
                            <span
                                className={`${classes.favorite} ${article.favorite ? '' : classes.not
                                    }`}
                            >
                                ❤
                            </span>
                        </div>
                        <div className={classes.rating}>
                            <StarRating stars={article.stars} size={25} />
                        </div>



                        <div className={classes.tags}>
                            {article.tags && (
                                <Tags
                                    tags={article.tags.map(tag => ({ name: tag }))}
                                    forArticlePage={true}
                                />
                            )}
                        </div>



                        <div className={classes.price}>
                            <Price price={article.price} />
                        </div>

                        <button>Add To Cart</button>
                    </div>
                </div>
            )}
        </>
    );


}