import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from "./MainPage";


function App(props) {

  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="attendees">
            {/* wse need to include props.attendees since we reference it in our AttendeesList.js file*/}
            <Route path="" element={<AttendeesList attendees={props.attendees} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;