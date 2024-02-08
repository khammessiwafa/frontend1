import React from "react";
import classes from './thumbnails.module.css'
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';
import { Link } from "react-router-dom";
export default function Thumbnails({ articles }) {


    return (
        <ul className={classes.list}>
            {articles.map(article => (
                <li key={article.id}>
                    <Link to={(`/article/${article.id}`)}>
                        <img
                            className={classes.image}
                            src={`/articles/${article.imageUrl}`}
                            alt={article.name}
                        />

                        <div className={classes.content}>
                            <div className={classes.name}>{article.name}</div>
                            <span
                                className={`${classes.favorite} ${article.favorite ? '' : classes.not
                                    }`}
                            >
                                ❤
                            </span>
                            <div className={classes.stars}>
                                <StarRating stars={article.stars} />
                            </div>
                            <div className={classes.price}>
                                <Price price={article.price} />
                            </div>

                        </div>

                    </Link>

                </li>
            )

            )}

        </ul>
    );

}