import React from "react";
import { Link } from 'react-router-dom';
import Title from "../../components/Title/Title";
import { useCart } from "../../hooks/useCart";
import classes from './cartPage.module.css';


export default function CartPage() {
    const { cart } = useCart();

    return (
        <>

            <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

            {cart && cart.items.length > 0 &&
                <div className={classes.container}>
                    <ul className={classes.list}>

                        {cart.items.map(item => (
                            <li key={item.article.id}>
                                <div>
                                    <img src={`/articles/${item.article.imageUrl}`}
                                        alt={item.article.name} />
                                </div>
                                <div>
                                    <Link to={`/article/${item.article.id}`}>{item.article.name}</Link>
                                </div>



                            </li>

                        ))}


                    </ul>


                </div>
            }

        </>
    );

}