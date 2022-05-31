import { useState } from 'react';
import { Button, FormGroup, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ErrorMessage, Formik, Field, Form } from 'formik';
import  validateCommentForm  from '../../utils/validateCommentForm'
import { useDispatch } from 'react-redux';
import  {addComment}  from './commentsSlice';

const CommentForm = ({ campsiteId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (values) => {
        const comment = {
            campsiteId: parseInt(campsiteId),
            rating: values.rating,
            author: values.author,
            text: values.commentText,
            date: new Date(Date.now()).toISOString()
        };
        console.log(comment);
        dispatch(addComment(comment));
        setModalOpen(false);
    }
    return (
        <>
            <Button outline color='primary'
                onClick={() => setModalOpen(true)}>
                <i className='fa fa-pencil fa-lg' /> Add Comment
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader
                    toggle={() => setModalOpen(false)}>
                    Add Comment
                    <ModalBody>
                        <Formik
                            initialValues={{
                                rating: undefined,
                                author: '',
                                commentText: ''
                            }}
                            onSubmit={handleSubmit}
                            validate={validateCommentForm}
                        >
                            <Form>
                                <FormGroup>
                                    <Label htmlFor='rating'>
                                        Rating
                                        <Field
                                            name='rating'
                                            as='select'
                                            className='form-control'
                                        >
                                            <option>Select...</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Field>
                                        <ErrorMessage name='rating'>
                                       {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='author'>
                                        Your Name
                                        <Field
                                            name='author'
                                            placeholder='Your Name'
                                            className='form-control'
                                        />
                                        <ErrorMessage name='author'>
                                        {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='commentText'>
                                        Comment
                                        <Field
                                            name='commentText'
                                            as='textarea'
                                            rows='12'
                                            className='form-control'
                                        />
                                    </Label>
                                </FormGroup>
                                <Button type='submit' color='primary'>
                                    Submit
                                </Button>
                            </Form>
                        </Formik>
                    </ModalBody>
                </ModalHeader>
            </Modal>
        </>
    )
}

export default CommentForm;