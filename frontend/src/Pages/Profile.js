import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { updateProfile, getProfile, clearValues } from '../Slice/profileSlice'
import { useSelector, useDispatch } from 'react-redux';
import "../Styles/profile.css"

export const Profile = () => {

  const { user } = useSelector((store) => store.auth);
  const { profile } = useSelector((store) => store.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

    useEffect(() => {
    dispatch(getProfile(user.id));
  }, [dispatch, user.id]);

  const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  userImage: '',
  shopName: '',
  shopLogo: '',
  shopTax: 0,
  shopAddress: '',
  shopReceiptMessage: '',
  shopPhoneNumber: ''
});


useEffect(() => {
  setFormData({
    username: profile.username,
    email: profile.email,
    password: profile.password,
    userImage: profile.userImage,
    shopName: profile.shopName,
    shopLogo: profile.shopLogo,
    shopTax: profile.shopTax,
    shopAddress: profile.shopAddress,
    shopReceiptMessage: profile.shopReceiptMessage,
    shopPhoneNumber: profile.shopPhoneNumber
  });
}, [profile]);


console.log("formdata",formData)
  const convertToBase64 = (e, fieldName) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFormData({
        ...formData,
        [fieldName]: reader.result
      });
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        userId: user.id,
        profile: formData
      })
    )
      .then(() => {
        dispatch(clearValues());
        toast.success('Profile updated successfully!');
        navigate('/dashboard');
      })
      .catch(() => {
        toast.error('Failed to update profile. Please try again later.');
      });
  };

  return (

    <Container className="formcontainer profile">
      
      <Row className="Addform" >
        <h3>Update Profile</h3>
        <Form className="register-form" onSubmit={handleSubmit}>
          <Row>
          <Form.Group className="mb-3 imgHere" as={Col} controlId="formBasicEmail">
            <span>
            <Form.Label>User Profile</Form.Label>
            <Form.Control
              type="file"
              placeholder="Update Image"
              name="userImage"
              accept="image/*"
              onChange={(e) => convertToBase64(e, 'userImage')}
             // Attach ref to the file input field
            /></span>
            <span>
             {formData.userImage && (
                <img src={formData.userImage} alt="User Image" className="smallimage" />
            )}</span>
          </Form.Group>
           
          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Change User Name"
              name="username"
              value={formData.username}
              onChange={onChange}
            />
          </Form.Group>
            </Row>
            <Row>
          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className='myinput'
              type="password"
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={onChange} />
          </Form.Group>
            </Row>
            <Row>
          <Form.Group className="mb-3 imgHere"as={Col} controlId="formBasicEmail">
            <span>
            <Form.Label>Shop Logo</Form.Label>
            <Form.Control
              type="file"
              placeholder="Add your Shop Logo"
              name="shopLogo"
              accept="image/*"
              onChange={(e) => convertToBase64(e, 'shopLogo')}
             // Attach ref to the file input field
            /></span>
            <span>
             {formData.shopLogo && (
                <img src={formData.shopLogo} alt="Shop Logo" className="smallimage" />
            )}   </span>   
          </Form.Group>
         
          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>Shop Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add your Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={onChange}
            />
          </Form.Group>
            
          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>Tax Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Set up Tax % for your Shop "
              name="shopTax"
              value={formData.shopTax}
              onChange={onChange}
            />
          </Form.Group>
            </Row>
            <Row>
          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>Shop Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add your Shop Address "
              name="shopAddress"
              value={formData.shopAddress}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>Receipt Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add your a message for Receipt "
              name="shopReceiptMessage"
              value={formData.shopReceiptMessage}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formBasicEmail">
            <Form.Label>Shop Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add your Shop Phone Number "
              name="shopPhoneNumber"
              value={formData.shopPhoneNumber}
              onChange={onChange}
            />
          </Form.Group>

            </Row>
          <Row>
            <Button variant="primary" className="btntype2" type="submit">Update Profile</Button>
            <Button variant="primary" className="btntype1" onClick={() => navigate('/dashboard')}>Cancel</Button>
          </Row>
        </Form>
      </Row>

    </Container>

  );

}
