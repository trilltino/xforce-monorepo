import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Proposal from './pages/Proposal';
import Architecture from './pages/Architecture';
import Contracts from './pages/Contracts';
import Documentation from './pages/Documentation';
import Status from './pages/Status';
import Roadmap from './pages/roadmap/Roadmap';
import Month1 from './pages/roadmap/Month1';
import Month2 from './pages/roadmap/Month2';
import Month3 from './pages/roadmap/Month3';
import Month4 from './pages/roadmap/Month4';

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
                            <Route path="/proposal" element={<Proposal />} />
                            <Route path="/architecture" element={<Architecture />} />
                            <Route path="/contracts" element={<Contracts />} />
                            <Route path="/documentation" element={<Documentation />} />
                            <Route path="/status" element={<Status />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/roadmap/month1" element={<Month1 />} />
                            <Route path="/roadmap/month2" element={<Month2 />} />
                            <Route path="/roadmap/month3" element={<Month3 />} />
                            <Route path="/roadmap/month4" element={<Month4 />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
