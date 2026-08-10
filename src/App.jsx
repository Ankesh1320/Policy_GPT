import { BrowserRouter } from 'react-router-dom';
import VolunteerSidebar from './components/volunteer/VolunteerSidebar';
import VolunteerDashboardMain from './components/volunteer/VolunteerDashboardMain';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="volunteer-layout app-container">
        <VolunteerSidebar />
        <VolunteerDashboardMain />
      </div>
    </BrowserRouter>
  );
}

export default App;
