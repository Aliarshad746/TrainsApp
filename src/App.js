import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';

function App() {
  return (
    <Router>
      <main className="py-3">
        <Route path="/bookings" component={BookingScreen} exact />
        <Route path="/" component={HomeScreen} exact />
      </main>
    </Router>
  );
}

export default App;
