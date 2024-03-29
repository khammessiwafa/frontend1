import React from "react";
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from "../../components/Title/Title";
import { useCart } from "../../hooks/useCart";
import classes from './cartPage.module.css';


export default function CartPage() {
    const { cart, removeFromCart, changeQuantity } = useCart();

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
                                <div>
                                    <select value={item.quantity} onChange={e => changeQuantity(item, Number(e.target.value))}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>

                                    </select>
                                </div>
                                <div>
                                    <Price price={item.price} />
                                </div>
                                <div>
                                    <button className={classes.remove_button}
                                        onClick={() => removeFromCart(item.article.id)}>
                                        Remove
                                    </button>
                                </div>



                            </li>

                        ))}


                    </ul>
                    <div className={classes.checkout}>
                        <div>
                            <div className={classes.articles_count}>{cart.totalCount}</div>
                            <div className={classes.total_price}>
                                <Price price={cart.totalPrice} />
                            </div>

                        </div>

                        <Link to="/checkout">Proceed To Checkout</Link>

                    </div>


                </div>
            }

        </>
    );

}