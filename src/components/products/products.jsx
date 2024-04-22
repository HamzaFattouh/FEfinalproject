import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import './Products.css';

export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 3;

  const getProducts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    setProducts(data.products);
    setLoader(false);
  };

  const getCatigoryProducts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
    setProducts(data.products);
    setLoader(false);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (id == 1) {
      getProducts();
    } else {
      getCatigoryProducts();
    }
  }, [id]);

  useEffect(() => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const currentProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    setTotalPages(totalPages);
    setCurrentProducts(currentProducts);
  }, [products, currentPage, searchTerm]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);

  const addToCart = async (productId) => {
    const Token = localStorage.getItem('userToken');
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
      productId
    }, {
      headers: { Authorization: `Tariq__${Token}` }
    });
    console.log(data);
  };

  return (
    <div className='productsPage'>
      <h1>Products</h1>
      <div className='searchdiv'>
        <input type='text' placeholder='Search' value={searchTerm} onChange={handleSearch} />
      </div>
      {loader ? <Loader /> :
        <div className='products'>
          {currentProducts.map(product =>
            <div className='productdiv' key={product._id}>
              <Link to={`/Product/${product._id}`}>
                <div className='product'>
                  <img src={product.mainImage.secure_url} alt={product.name} />
                  <p>{product.name}</p>
                </div>
              </Link>
              <button onClick={() => addToCart(product._id)}>Add To Cart</button>
            </div>
          )}
        </div>
      }
      <div className="pagination">
        <button className='prevbutton' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <p>{currentPage}/{totalPages}</p>
        <button className='nextbutton' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
