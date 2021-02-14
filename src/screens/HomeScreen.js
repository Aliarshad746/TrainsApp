import React, { useState, useEffect } from 'react';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import ListTrains from '../components/ListTrains';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [stations, setStations] = useState([]);
  const [station1, setStation1] = useState('');
  const [station2, setStation2] = useState('');
  const [trains, setTrains] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    fetch('https://api.irail.be./stations/?format=json&lang=en')
      .then((response) => response.json())
      .then((data) => {
        const stations = data.station.map((station) => ({
          name: station.name,
          id: station.id,
        }));
        setStations(stations);
      });
  }, []);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  const getTrains = async () => {
    await fetch(
      `https://api.irail.be./connections/?from=${station1}&to=${station2}&format=json&lang=en`
    )
      .then((response) => response.json())
      .then((data) => {
        const trains = data.connection.map((connection, index) => ({
          name: connection.arrival.vehicleinfo.name,
          id: `${index}_${connection.arrival.vehicleinfo.shortname}`,
          departureTime: timeConverter(connection.departure.time),
          arrivalTime: timeConverter(connection.arrival.time),
        }));
        setTrains(trains);
        console.log(trains);
      });
  };

  return (
    <Container className="shadow-lg p-3 mb-5 bg-white rounded">
      <div className="d-md-flex align-items-center justify-content-between mb-3">
        <h1>Search Trains</h1>
        <Link to="/bookings" className="btn btn-danger">
          Go to Bookings{' '}
          {cartItems.length > 0 && (
            <span class="badge badge-pill badge-success">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
      <Form>
        <Form.Group>
          <Form.Label>From Station:</Form.Label>
          <Form.Control
            as="select"
            className="mr-sm-2"
            id="inlineFormCustomSelect"
            custom
            onChange={(e) => setStation1(e.target.value)}
          >
            <option value="0" disabled>
              Choose...
            </option>
            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>To Station:</Form.Label>
          <Form.Control
            as="select"
            className="mr-sm-2"
            id="inlineFormCustomSelect"
            custom
            onChange={(e) => setStation2(e.target.value)}
          >
            <option value="0" disabled>
              Choose...
            </option>
            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="btn btn-dark" onClick={getTrains}>
          Search Trains
        </Button>
      </Form>
      {trains.length > 0 && (
        <div className="mt-3">
          <div className="mt-1">
            <h4 className="text-success">
              Number Of Trains Found : {trains.length}
            </h4>
          </div>
          {trains.map((train, index) => (
            <ListGroup>
              <ListTrains train={train} key={index} />
              <br></br>
            </ListGroup>
          ))}
        </div>
      )}
    </Container>
  );
};

export default HomeScreen;
