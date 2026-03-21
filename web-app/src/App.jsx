import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Architecture from './pages/Architecture';
import ArchitectureOverview from './pages/architecture/Overview';
import BackendDetails from './pages/architecture/Backend';
import ContractsDetails from './pages/architecture/Contracts';
import CryptoDetails from './pages/architecture/Crypto';
import SystemOverview from './pages/architecture/System';
import Contracts from './pages/Contracts';
import Documentation from './pages/Documentation';
import Status from './pages/Status';
import Integrations from './pages/Integrations';
import Demo from './pages/Demo';
import Demand from './pages/Demand';
import Roadmap from './pages/roadmap/Roadmap';
import Month1 from './pages/roadmap/Month1';
import Month2 from './pages/roadmap/Month2';
import Month3 from './pages/roadmap/Month3';
import Month4 from './pages/roadmap/Month4';
import Overview5Ws from './pages/fiveWs/Overview';
import Who from './pages/fiveWs/Who';
import What from './pages/fiveWs/What';
import When from './pages/fiveWs/When';
import Where from './pages/fiveWs/Where';
import Why from './pages/fiveWs/Why';
import How from './pages/fiveWs/How';

function App() {
    console.log('App rendering, basename: /xfterminal');
    console.log('Current path:', window.location.pathname);
    return (
        <ErrorBoundary>
            <Router basename="/xfterminal">
            <div className="min-h-screen bg-black text-white transition-colors duration-300">
                <Navbar />
                <main className="container mx-auto px-4 py-8 pt-24">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/architecture" element={<Architecture />} />
                            <Route path="/architecture/overview" element={<ArchitectureOverview />} />
                            <Route path="/architecture/backend" element={<BackendDetails />} />
                            <Route path="/architecture/contracts" element={<ContractsDetails />} />
                            <Route path="/architecture/crypto" element={<CryptoDetails />} />
                            <Route path="/architecture/system" element={<SystemOverview />} />
                            <Route path="/contracts" element={<Contracts />} />
                            <Route path="/documentation" element={<Documentation />} />
                            <Route path="/status" element={<Status />} />
                            <Route path="/integrations" element={<Integrations />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/demand" element={<Demand />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/roadmap/month1" element={<Month1 />} />
                            <Route path="/roadmap/month2" element={<Month2 />} />
                            <Route path="/roadmap/month3" element={<Month3 />} />
                            <Route path="/roadmap/month4" element={<Month4 />} />
                            <Route path="/5ws" element={<Overview5Ws />} />
                            <Route path="/who" element={<Who />} />
                            <Route path="/what" element={<What />} />
                            <Route path="/when" element={<When />} />
                            <Route path="/where" element={<Where />} />
                            <Route path="/why" element={<Why />} />
                            <Route path="/how" element={<How />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
