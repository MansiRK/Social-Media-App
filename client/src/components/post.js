import React, { useEffect} from "react";
import { Link } from 'react-router-dom'
import './post.css'
import {
  HeartFilled,
  CommentOutlined
} from '@ant-design/icons';
import { getAllPosts, likeorunlikepost } from "../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";

function Post({ post , postInProfilePage}) {
  const dispatch = useDispatch()
  const presentuser = JSON.parse(localStorage.getItem('user'))
  const alreadyliked = post.likes.find(obj=>obj.user.toString()==presentuser._id)
  const{loading}= useSelector(state=>state.alertsReducer)
  useEffect(()=> {

    dispatch(getAllPosts())
  }, [loading])
  
  return (
    <div className="bs1 p-2 mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {post.user.profilePicUrl == "" ? (
            <span className="profilepic1 d-flex align-items-center">
              {post.user.username[0]}
            </span>
          ) : (
            <img src={post.user.profilePicUrl} height='35' width='35' style={{borderRadius:'50%'}}/>
          )}
          <Link className="ml-2">{post.user.username}</Link>
        </div>

      </div>

      <img src={post.image} style={{height: postInProfilePage==true && '200px'}} className="postimage w-100"/>

      <p className="mt1 mb-1 text-left">{post.description}</p>
      <div className="d-flex align-items-cente">
      <div className="d-flex align-items-center mr-3">
          <HeartFilled 
          style={{color:alreadyliked ? 'red':''}}
          onClick={()=>{dispatch(likeorunlikepost({postid:post._id}))}}/>
          <p>{post.likes.length}</p>
        </div>

        <div className="d-flex align-items-center">
          <CommentOutlined/>
          <p>{post.comments.length}</p>
        </div>

        </div>
   
      
    </div>
  );
}

export default Post;