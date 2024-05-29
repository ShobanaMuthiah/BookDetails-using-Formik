// src/Pages/Products.js
import React, { useContext } from 'react';
import { mycontext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const [userData, setUserData] = useContext(mycontext);
  const navig=useNavigate()
  const handleDelete = (id) => {
    const updatedData = userData.filter(item => item.id !== id);
    setUserData(updatedData);
  };

  const handleEdit=(id)=>{
    navig(`/edit/${id}`)
  }

  return (
    <div>
      <h2>Books List</h2>
      <div className="table-responsive">
      <table className="table table-danger align-top">
        <thead>
          <tr className='text-center'>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Cover Image</th>
            <th>ISBN</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(book => (
            <tr key={book.id}>
              <th className='text-center p-2'>{book.id}</th>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td className='text-center'>{book.publication_year}</td>
              <td>{book.genre.join(', ')}</td>
              <td>{book.description}</td>
              <td className='text-center'><img src={book.cover_image} alt={book.title} width="50" /></td>
              <td>{book.isbn}</td>
              <td>
                <button className='btn btn-warning ' onClick={() => handleEdit(book.id)}>Edit</button>
              </td>
              <td>
                <button className='btn btn-danger ' onClick={() => handleDelete(book.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-success m-4'onClick={()=>{navig('/create')}}>create</button>
      </div>
    </div>
  );
};

export default Products;
