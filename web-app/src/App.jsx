import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Architecture from './pages/Architecture';
import Contracts from './pages/Contracts';
import Documentation from './pages/Documentation';
import Status from './pages/Status';
import Roadmap from './pages/roadmap/Roadmap';
import Month1 from './pages/roadmap/Month1';
import Month2 from './pages/roadmap/Month2';
import Month3 from './pages/roadmap/Month3';
import Month4 from './pages/roadmap/Month4';
import Terminal from './pages/Terminal';
import Guide from './pages/Guide';
import Demand from './pages/Demand';
import System from './pages/architecture/System';
import Competition from './pages/Competition';
import FiveWs from './pages/fiveWs/FiveWs';
import Who from './pages/fiveWs/Who';
import What from './pages/fiveWs/What';
import Why from './pages/fiveWs/Why';
import When from './pages/fiveWs/When';
import Where from './pages/fiveWs/Where';
import How from './pages/fiveWs/How';
import Integrations from './pages/Integrations';

function App() {
    return (
        <ErrorBoundary>
            <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>


            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <main className="container mx-auto px-4 py-8 pt-24">
                    <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/architecture" element={<Architecture />} />
                            <Route path="/architecture/system" element={<System />} />
                            <Route path="/contracts" element={<Contracts />} />
                            <Route path="/documentation" element={<Documentation />} />
                            <Route path="/status" element={<Status />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/roadmap/month1" element={<Month1 />} />
                            <Route path="/roadmap/month2" element={<Month2 />} />
                            <Route path="/roadmap/month3" element={<Month3 />} />
                            <Route path="/roadmap/month4" element={<Month4 />} />
                            <Route path="/terminal" element={<Terminal />} />
                            <Route path="/guide" element={<Guide />} />
                            <Route path="/demand" element={<Demand />} />
              <Route path="/competition" element={<Competition />} />
              <Route path="/5ws" element={<FiveWs />} />
              <Route path="/who" element={<Who />} />
              <Route path="/what" element={<What />} />
              <Route path="/why" element={<Why />} />
              <Route path="/when" element={<When />} />
              <Route path="/where" element={<Where />} />
              <Route path="/how" element={<How />} />
              <Route path="/integrations" element={<Integrations />} />
                    </Routes>
                </main>
            </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
