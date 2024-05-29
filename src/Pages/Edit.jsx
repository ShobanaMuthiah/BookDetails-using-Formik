// src/Pages/Edit.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mycontext } from '../App';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Edit = () => {
  const [userData, setUserData] = useContext(mycontext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    publication_year: '',
    genre: '',
    description: '',
    cover_image: '',
    isbn: ''
  });

  useEffect(() => {
    const bookToEdit = userData.find(item => item.id === parseInt(id));
    if (bookToEdit) {
      setInitialValues({
        ...bookToEdit,
        genre: bookToEdit.genre.join(', ')
      });
    }
  }, [id, userData]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    publication_year: Yup.number().required('Required').integer('Must be an integer').positive('Must be a positive number'),
    genre: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    cover_image: Yup.string().url('Invalid URL').required('Required'),
    isbn: Yup.string().required('Required').length(13, 'ISBN must be 13 characters')
  });

  const handleSave = (values) => {
    const updatedBook = {
      ...values,
      genre: values.genre.split(',').map(g => g.trim())
    };

    const updatedData = userData.map(item => 
      item.id === updatedBook.id ? updatedBook : item
    );
    setUserData(updatedData);
    navigate('/product');
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label className='col-12 col-sm-2 m-2'>Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className='err' />
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Author</label>
              <Field type="text" name="author" />
              <ErrorMessage name="author" component="div" className='err' />
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Publication Year</label>
              <Field type="text" name="publication_year" />
              <ErrorMessage name="publication_year" component="div" className='err'/>
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Genre</label>
              <Field type="text" name="genre" />
              <ErrorMessage name="genre" component="div" className='err'/>
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Description</label>
              <Field as="textarea" name="description" />
              <ErrorMessage name="description" component="div" className='err'/>
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Cover Image URL</label>
              <Field type="text" name="cover_image" />
              <ErrorMessage name="cover_image" component="div" className='err'/>
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>ISBN</label>
              <Field type="text" name="isbn" />
              <ErrorMessage name="isbn" component="div" className='err'/>
            </div>
            <button type="submit" className='m-2 btn btn-danger' disabled={isSubmitting}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Edit;
