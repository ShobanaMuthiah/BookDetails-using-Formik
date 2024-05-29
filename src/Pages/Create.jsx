// src/Pages/Create.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from '../App';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const Create = () => {
  const [userData, setUserData] = useContext(mycontext);
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    author: '',
    publication_year: '',
    genre: [],
    description: '',
    cover_image: '',
    isbn: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    publication_year: Yup.number().required('Required').integer('Must be an integer').positive('Must be a positive number'),
    genre: Yup.array().of(Yup.string().required('Required')),
    description: Yup.string().required('Required'),
    cover_image: Yup.string().url('Invalid URL').required('Required'),
    isbn: Yup.string().required('Required').length(13, 'ISBN must be 13 characters')
  });

  const handleSave = (values) => {
    const newBook = {
      ...values,
      id: userData.length ?userData.length + 1 : 1
    };
    setUserData([...userData, newBook]);
    navigate('/product');
  };

  return (
    <div>
      <h2>Create Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label className='col-12 col-sm-2 m-2'>Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="span" className="err" />
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Author</label>
              <Field type="text" name="author" />
              <ErrorMessage name="author" component="span" className="err" />
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>ISBN</label>
              <Field type="text" name="isbn" />
              <ErrorMessage name="isbn" component="span" className="err" />
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Publication Year</label>
              <Field type="text" name="publication_year" />
              <ErrorMessage name="publication_year" component="span" className="err" />
            </div>
            <div className='row row-cols-1 row-cols-sm-2'>
              <label className='col-12 col-sm-2 m-2'>Genre</label>
              <FieldArray name="genre">
                {({ insert, remove, push }) => (
                  <div className='col'>
                    {values.genre.length > 0 &&
                      values.genre.map((genre, index) => (
                        <div key={index}>
                          <Field name={`genre.${index}`} />
                          <button
                            type="button"
                            className='btn btn-light p-1 remove'
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
              <ErrorMessage name={`genre.${index}`} component="span" className="err" />

                        </div>
                      ))}
                    <button
                      type="button" className='btn bg-body-primary'
                      onClick={() => push('')}
                    >
                      Add Genre
                    </button>
                  </div>
                )}
              </FieldArray>
            </div><br />
            <div>
              <label className='col-12 col-sm-2 m-2'>Description</label>
              <Field as="textarea" className='w-25' name="description" />
              <ErrorMessage name="description" component="span" className="err" />
            </div>
            <div>
              <label className='col-12 col-sm-2 m-2'>Cover Image URL</label>
              <Field type="text" name="cover_image" />
              <ErrorMessage name="cover_image" component="span" className="err" />
            </div>
           
            <button type="submit" className='m-2 btn btn-danger' disabled={isSubmitting}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
