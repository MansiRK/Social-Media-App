import { Col, Row , Form , Input , Button} from 'antd'
import React , {useState} from 'react'
import { useDispatch } from 'react-redux'
import Default from '../components/Default'
import { addPost } from '../redux/actions/postAction'
const {TextArea} = Input
function Addpost() {
    const[image , setimage] = useState('')
   const dispatch = useDispatch()
    function handleFileInput(e){
        const file = e.target.files[0]
        const reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend=()=>{              
               setimage(reader.result)
        }
    }
    function addpost(values){
          values.image = image
          dispatch(addPost(values))    
    }
    return (
       <Default>
                <Row justify='center'>
                    <Col lg={12}>
                        <Form className='bs1 p-3 mt-5' layout='vertical' onFinish={addpost}>
                            <h3>Add new post</h3>
                            <Form.Item name='description' label='Description' rules={[{required: true}]}>
                                  <TextArea/>
                            </Form.Item>
                            <Form.Item name='image' label='Image' rules={[{required: true}]}>
                                  <Input type='file' onChange={handleFileInput}/>
                            </Form.Item>
                            {image !== '' && (<img src={image} height='200' width='200'/>)}
                            <br />
                            <div className="text-left mt-3">
                            <Button type="primary" htmlType='submit'>Post</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
       </Default>
    )
}

export default Addpost