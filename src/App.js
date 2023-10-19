import './App.scss';
import { Login, Events, Gallery, 
          Training, About, Home, 
          EventDetail, Contact,
          TermsConditions,
          PrivacyPolicy, FAQS, Room, 
          Food, DineIn, UserApproval, 
          AdminEvent, 
          RoomDetail,
          Help,
          Accessibility,
          Sitemap} from './pages';
import Facilities from './pages/Facilities';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-image-lightbox/style.css';
import UserQueries from './pages/UserQueries';

function App() {
  // const env_path = process.env.REACT_APP_ENV;
  // console.log('env_path', env_path);
  if ((window.location.href.includes("/admin/room") || 
      window.location.href.includes("/admin/event") || 
      window.location.href.includes("/admin/food") || 
      window.location.href.includes("/admin/dine_in")
    ) && !sessionStorage.getItem('acces_token')) 
  {
    window.location.href = "/admin/login";
  } else if (window.location.href.includes("/login") && sessionStorage.getItem('acces_token')) {
    window.location.href = "/admin/room";
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventDetail" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/training" element={<Training />} />
          <Route path="/about_us" element={<About />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact_us" element={<Contact />} />
          <Route path="/terms_and_conditions" element={<TermsConditions />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/accessiblity" element={<Accessibility />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/faqs" element={<FAQS />} />
          <Route path="/admin/room" element={<Room />} />
          <Route path="/admin/roomDetail" element={<RoomDetail />} />
          <Route path="/admin/event" element={<AdminEvent />} />
          <Route path="/admin/food" element={<Food />} />
          <Route path="/admin/dine_in" element={<DineIn />} />
          <Route path="/admin/user_approval" element={<UserApproval />} />
          <Route path="/admin/query" element={<UserQueries />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
