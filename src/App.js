import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ResumeList from "./components/resume/index"
import CreateResume from "./components/resume/create-resume"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResumeList />} />        
        <Route path="/create-resume" element={<CreateResume />} />        
        <Route path="/manage-resume" element={<CreateResume />} />        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
