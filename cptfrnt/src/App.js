import './App.css';
import "./stylesheets/prep.css"
import LoginPage from './routes/LoginPage';
import StudentPage from './routes/StudentPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './routes/AdminPage';
import FacultyPage from './routes/FacultyPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<LoginPage />} />
          <Route path='Student' element={<StudentPage />} />
          <Route path='Admin' element={<AdminPage />}/>
          <Route path='Faculty' element={<FacultyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
