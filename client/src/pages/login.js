import React from 'react'
import {Row, Col, Form, Input, Button} from 'antd'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import './login.css'
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
function Login() {
    const dispatch = useDispatch()
    function login(values) {
        console.log(values)
        dispatch(userLogin(values))
    }
    return (
        <div>
            <Row justify='center' className='login-1'>
                <Col lg={10} xs={24}>
                    <Form layout='vertical' className='bs1 p-3' onFinish={login}>
                        <h3>Login</h3>
                        <hr />
                        <Form.Item label="firstname" name="firstname" rules={[{ require: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="lastname" name="lastname" rules={[{ require: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="username" name="username" rules={[{ require: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="emailid" name="emailid" rules={[{ require: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="password" name="password" rules={[{ require: true }]}>
                            <Input />
                        </Form.Item>
                        
                       
                        <Button htmlType='Submit'>Login</Button>
                        <Link to ='/register'>Click here if not yet register</Link>
            </Form>
        </Col>
       </Row>
       </div>
    )
}
export default Login