import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Welcome from './pages/Welcome/Welcome';
// import PublicHome from './pages/Public/Home';
import PublicAuth from './pages/Public/Auth';
// import CreateGrievance from './pages/Public/CreateGrievance';
// import GrievanceDetail from './pages/Public/GrievanceDetail';
// import MunicipalHome from './pages/Municipal/Home';
import MunicipalAuth from './pages/Municipal/Auth';
// import MunicipalGrievanceDetail from './pages/Municipal/GrievanceDetail';

export default function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>

        <Route path="/" element={<Welcome />} />

        {/* <Route path="/public" element={<PublicHome />} /> */}
        <Route path="/public/auth" element={<PublicAuth />} />
        {/* <Route path="/public/create-grievance" element={<CreateGrievance />} /> */}
        {/* <Route path="/public/grievance/:id" element={<GrievanceDetail />} /> */}

        {/* <Route path="/municipal" element={<MunicipalHome />} /> */}
        <Route path="/municipal/auth" element={<MunicipalAuth />} />
        {/* <Route path="/municipal/grievance/:id" element={<MunicipalGrievanceDetail />} /> */}
      </Routes>
    </Router>
  );
}