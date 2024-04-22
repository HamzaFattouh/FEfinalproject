import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import './Cart.css';
import { toast } from 'react-toastify';

export default function cart() {
    const [loader, setLoader] = useState(true);
    const [productCart, setProductCart] = useState([]);

    const getCart = async () => {
        const Token = localStorage.getItem('userToken');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
            headers: { Authorization: `Tariq__${Token}` }
        });
        console.log(data.products)
        setProductCart(data.products);
        setLoader(false);
    }

    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
    }, [productCart])

    const removeFromCart = async (productId) => {
        const Token = localStorage.getItem('userToken');
        setLoader(true);
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
            productId
        }, {
            headers: { Authorization: `Tariq__${Token}` }
        });
        getCart();
    }

    const clearCart = async () => {
        const Token = localStorage.getItem('userToken');
        setLoader(true);
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, null, {
            headers: { Authorization: `Tariq__${Token}` }
        });
        getCart();
    }

    const addQuantity = async (productId) => {
        const Token = localStorage.getItem('userToken');
        setLoader(true);
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {
            productId
        }, {
            headers: { Authorization: `Tariq__${Token}` }
        })

        getCart();

    }

    const subQuantity = async (productId) => {
        const Token = localStorage.getItem('userToken');
        setLoader(true);
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {
            productId
        }, {
            headers: { Authorization: `Tariq__${Token}` }
        })
        getCart();

    }

    return (
        <div className='cartPage'>
            <h1>Cart</h1>
            {loader ? <Loader /> :
                <div className='productCart'>
                    {productCart.map(productCart =>
                        <div className='product' key={productCart._id}>
                            <div className='leftside'>
                                <img src={productCart.details.mainImage.secure_url} alt='Product Image' />
                                <div className='details'>
                                    <h3>{productCart.details.name}</h3>
                                    <div className='price'>
                                        {(productCart.details.discount != 0) && <p className='firstprice'>{productCart.details.price} ILS</p>}
                                        <p className='finalprice'>{productCart.details.finalPrice} ILS</p>
                                    </div>

                                </div>
                            </div>
                            <div className='rightSide'>
                                <div className='quantity'>
                                    <button className='subQuantity' onClick={() => subQuantity(productCart.productId)}>-</button>
                                    <p>{productCart.quantity}</p>
                                    <button className='addQuantity' onClick={() => addQuantity(productCart.productId)}>+</button>
                                </div>

                            </div>
                            <FontAwesomeIcon onClick={() => removeFromCart(productCart.productId)} className='delete' icon={faXmark} />
                        </div>
                    )}
                    <div className='clearcart' >
                        <button onClick={clearCart}>Clear All</button>
                    </div>
                </div>

            }
        </div>
    )
}
