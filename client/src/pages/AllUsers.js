import React, {useEffect, useState} from "react";
import { Button, Col, Row, Input } from 'antd';
import moment from "moment"; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Default from "../components/Default";
import { followUser, getAllUsers } from "../redux/actions/userActions";
const {TextArea} = Input


function AllUsers() {
    const { users } = useSelector(state => state.usersReducer)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const {followLoading} = useSelector(state=>state.alertsReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllUsers())

    }, [followLoading])
    return (
        <Default>
            <div>
                <Row justify={'cente'}>
                    <Col lg={20} className='d-flex'>
                        <Input style={{width:'70%'}}/>
                    </Col>
                </Row>
                <Row justify='center' gutter={16} className="mt-5">
                    {users.map(user => {
                        return <>
                        {currentUser._id !== user._id && (
                            <Col lg={5} xs={24} className="text-left">
                            <div className='bs1 p-2 '>
                                {user.profilePicUrl == "" ? (
                                    <p className="profilepic2 d-flex align-items-center">
                                        {user.username[0]}
                                    </p>
                                ) : (
                                    <img src={user.profilePicUrl} />
                                )}
                                <Link>{user.username}</Link>
                                <p>{moment(user.createdAt).format('MMM DD yyyy')}</p>
                                <Button onclick={()=>{dispatch(followUser({currentUserId : currentUser._id, receiverUserId : user._id}))}}>Follow</Button>
                            </div>
                        </Col>
                        )}
                        </>
                    })}
                </Row>
            </div>
        </Default>
    )
}
export default AllUsers;