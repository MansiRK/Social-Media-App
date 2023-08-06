import React from 'react'
import {Row, Col, Form, Input, Button} from 'antd'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
// eslint-disable-next-line no-unused-vars
import './register.css'
import { userRegister } from '../redux/actions/userActions'
function Register() {
    const dispatch = useDispatch()
    function register(values) {
        console.log(values)
        delete values.cpassword
        dispatch(userRegister(values))
    }
    return (
        <div>
            <Row justify='center' className='register-1'>
                <Col lg={10} xs={24}>
                    <Form layout='vertical' className='bs1 p-3' onFinish={register}>
                        <h3>Register</h3>
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
                        <Form.Item label="confirm password" name="cpassword" rules={[{ require: true }]}>
                            <Input />
                        </Form.Item>
                        <Button htmlType='Submit'>Register</Button>
                        <Link to ='/login'>Click here if already register</Link>
            </Form>
        </Col>
       </Row>
       </div>
    )
}
export default Register