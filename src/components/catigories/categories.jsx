import { useEffect, useState } from 'react'
import axios from 'axios';
import './categories.css'
import { NavLink } from 'react-router-dom';
import Loader from '../loader/Loader';

export default function categories() {

  const [categories, setCatigories] = useState([]);
  const [loader, setLoader] = useState(true);

  const getCatigories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=10`);
    setCatigories(data.categories);
    setLoader(false);
  };
  useEffect(() => {
    getCatigories();
  }, [])


  return (

    <div className='catigoriespage'>
      <h2>Categories</h2>
      {loader ? <Loader /> :
        <div className='categoriesdiv'>
          {categories.map(category =>
            <NavLink to={`/Products/${category._id}`} key={category._id} >
              <div className='catigory'>
                <img src={category.image.secure_url} />
              </div>
            </NavLink>

          )}
        </div>}
    </div>
  )
}
