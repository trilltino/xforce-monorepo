import { Link } from 'react-router-dom';

const docLinks = [
    { href: '/xfterminal/docs/index.html', title: 'Overview', desc: 'Main documentation index' },
    { href: '/xfterminal/docs/tech-stack.html', title: 'Tech Stack', desc: 'Technology stack details' },
    { href: '/xfterminal/docs/terminal.html', title: 'Terminal', desc: 'Terminal architecture' },
    { href: '/xfterminal/docs/data-flows.html', title: 'Data Flows', desc: 'Data flow diagrams' },
    { href: '/xfterminal/docs/integrations.html', title: 'Integrations', desc: 'Integration architecture' },
    { href: '/xfterminal/docs/news-service.html', title: 'News Service', desc: 'News service architecture' },
    { href: '/xfterminal/docs/contracts.html', title: 'Contracts', desc: 'Contract specifications' },
];

export default function Architecture() {
    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 font-heading text-gray-900 dark:text-white">Architecture Documentation</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-sans">
                    Technical architecture and system design for XFTerminal.
                </p>
                <a
                    href="/xfterminal/docs/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                    Open Architecture Documentation →
                </a>
            </div>
        </div>
    );
}
