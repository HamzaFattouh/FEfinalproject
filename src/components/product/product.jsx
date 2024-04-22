import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Loader from '../loader/Loader';
import './Product.css'

export default function product() {
    const { id } = useParams('id');
    const [product, setProduct] = useState([]);
    const [loader, setLoader] = useState(true);

    const getProduct = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(data.product);
        setLoader(false);
    }
    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
    }, [product]);

    const handleAddToCart = async () => {

        const Token = localStorage.getItem('userToken');
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
            productId: product._id
        }, {
            headers: { Authorization: `Tariq__${Token}` }
        });
    }

    return (
        <div className='productPage'>
            {loader ? <Loader /> :

                <div className='Container'>
                    <h2>{product.name}</h2>
                    <div className='productContainer'>
                        <div className='leftside'>
                            <img src={product.mainImage.secure_url} alt='product image' />
                        </div>
                        <div className='rightside'>
                            <p className='description'>{product.description}</p>
                            <div>
                                <p className='finalPrice'>Price: {product.finalPrice} ILS</p>
                                <button onClick={handleAddToCart}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
