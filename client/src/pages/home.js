import React from 'react';
import Default from '../components/Default';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import Post from '../components/post';

function Home() {
  // Use the correct state name from your rootReducer
  // eslint-disable-next-line no-unused-vars
  const {users} = useSelector(state => state.usersReducer)
  const {posts} = useSelector(state => state.postsReducer)

  return (
    <Default>
      <Row justify='center'>
        <Col lg={12} xs={24}>
        {posts.map(post=>{
          return <Post post={post}/>
        })}
        </Col>
      </Row>
    </Default>
  )
}

export default Home;
