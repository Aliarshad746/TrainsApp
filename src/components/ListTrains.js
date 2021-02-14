import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { addToCart } from '../trainActions/trainAction';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';

const ListTrains = ({ train }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(0);

  useEffect(() => {
    if (click > 0) {
      dispatch(addToCart(train));
    }
  }, [click, dispatch, train]);

  const booking = () => {
    setClick(1);
  };
  return (
    <ListGroup.Item>
      <Row className="align-items-center">
        <Col md={3}>
          <WatchLaterOutlinedIcon /> {train.departureTime}{' '}
        </Col>
        <Col md={1}>
          <ArrowRightAltIcon></ArrowRightAltIcon>{' '}
        </Col>
        <Col md={3}>
          <WatchLaterOutlinedIcon /> {train.arrivalTime}
        </Col>
        <Col md={3}>
          <TrainOutlinedIcon /> {train.name}
        </Col>

        <Col md={2}>
          <Button onClick={booking}>Book</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default ListTrains;
