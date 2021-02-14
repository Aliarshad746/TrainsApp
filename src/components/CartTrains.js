import React from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../trainActions/trainAction';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';

const CartTrains = ({ train }) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div>
      <ListGroup.Item>
        <Row className="align-items-center">
          <Col md={4}>
            <TrainOutlinedIcon /> {train.name}
          </Col>
          <Col md={4}>@id : {train.id}</Col>
          <Col md={4}>
            <Button
              className="btn btn-dark align-items-center"
              onClick={() => removeFromCartHandler(train.id)}
            >
              <i className="far fa-trash-alt"></i> Cancel Booking
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  );
};

export default CartTrains;
