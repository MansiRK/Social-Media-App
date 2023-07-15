import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import '../styles/register.css'


const Register = () => {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = {
        firstname: '', lastname:'', username: '', email: '', password: '', cf_password: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { firstname, lastname, username, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])


    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className='section'>
            <div className="register_page_container">
                <div className="register_page">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-uppercase text-center mb-4">2MR Media</h3>

                        <div className="register-group">
                            <label htmlFor="firstname">First Name</label>
                            <div className="pass">
                                <input type={typePass ? "text" : firstname}
                                    className="register-control" id="firstname" name="firstname"
                                    onChange={handleChangeInput} value={firstname}
                                    style={{ background: `${alert.firstname ? '#fd2d6a14' : ''}` }} />

                                <small className="register-text register-danger">
                                    {alert.firstname ? alert.firstname : ''}
                                </small>
                            </div>
                        </div>

                        <div className="register-group">
                            <label htmlFor="lastname">Last Name</label>
                            <div className="pass">
                                <input type={typePass ? "text" : username}
                                    className="register-control" id="lastname" name="lastname"
                                    onChange={handleChangeInput} value={lastname.toLowerCase().replace(/ /g, '')}
                                    style={{ background: `${alert.lastname ? '#fd2d6a14' : ''}` }} />

                                <small className="register-text register-danger">
                                    {alert.lastname ? alert.lastname : ''}
                                </small>
                            </div>
                        </div>

                        <div className="register-group">
                            <label htmlFor="username">User Name</label>
                            <div className="pass">
                                <input type={typePass ? "text" : username}
                                    className="register-control" id="username" name="username"
                                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                                    style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }} />

                                <small className="register-text register-danger">
                                    {alert.username ? alert.username : ''}
                                </small>
                            </div>
                        </div>

                        <div className="register-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <div className="pass">
                            <input type={typePass ? "text": "email"}
                            className="register-control" id="exampleInputEmail1" 
                                onChange={handleChangeInput} value={email} name="email"
                                style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }} />

                            <small className="register-text register-danger">
                                {alert.email ? alert.email : ''}
                            </small>
                        </div>
                        </div>

                        <div className="register-group">
                            <label htmlFor="exampleInputPassword1">Password</label>

                            <div className="pass">

                                <input type={typePass ? "text" : "password"}
                                    className="register-control" id="exampleInputPassword1"
                                    onChange={handleChangeInput} value={password} name="password"
                                    style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }} />

                                <small onClick={() => setTypePass(!typePass)}>
                                    {typePass ? 'Hide' : 'Show'}
                                </small>
                            </div>

                            <small className="register-text register-danger">
                                {alert.password ? alert.password : ''}
                            </small>
                        </div>

                        <div className="register-group">
                            <label htmlFor="cf_password">Confirm Password</label>

                            <div className="pass">

                                <input type={typeCfPass ? "text" : "password"}
                                    className="register-control" id="cf_password"
                                    onChange={handleChangeInput} value={cf_password} name="cf_password"
                                    style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }} />

                                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                                    {typeCfPass ? 'Hide' : 'Show'}
                                </small>
                            </div>

                            <small className="register-text register-danger">
                                {alert.cf_password ? alert.cf_password : ''}
                            </small>
                        </div>

                        <div className="row justify-content-between mx-0 mb-1">
                            <label htmlFor="male">
                                Male: <input type="radio" id="male" name="gender"
                                    value="male" defaultChecked onChange={handleChangeInput} />
                            </label>

                            <label htmlFor="female">
                                Female: <input type="radio" id="female" name="gender"
                                    value="female" onChange={handleChangeInput} />
                            </label>

                            <label htmlFor="other">
                                Other: <input type="radio" id="other" name="gender"
                                    value="other" onChange={handleChangeInput} />
                            </label>
                        </div>

                        <button type="submit" className="btn btn-dark w-100">
                            Register
                        </button>

                        <p className="my-2">
                            Already have an account? <Link to="/" style={{ color: "crimson" }}>Login Now</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Register
