import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Mot de passe différents...')
        } else {
            dispatch(register(name, email, password))
        }
    }
    
    return <FormContainer>
        <h1>Inscription</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Nom</Form.Label>
                <Form.Control type='name' placeholder='Comment doit-on vous appeler' value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Adresse mail</Form.Label>
                <Form.Control type='email' placeholder='Entrez votre adresse mail' value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type='password' placeholder='Entrez votre mot de passe' value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirmation mot de passe</Form.Label>
                <Form.Control type='password' placeholder='Confirmez le mot de passe' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Inscription
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Déjà un compte ?</Col> <a href={redirect ? `/login?redirect=${redirect}`
            : '/login'}>Se connecter</a>
        </Row>
    </FormContainer>
}

export default RegisterScreen;
