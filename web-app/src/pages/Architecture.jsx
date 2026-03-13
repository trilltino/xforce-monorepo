import { Link } from 'react-router-dom';

const docLinks = [
    { href: '/xforcesolutions/docs/index.html', title: 'Overview', desc: 'Main documentation index' },
    { href: '/xforcesolutions/docs/tech-stack.html', title: 'Tech Stack', desc: 'Technology stack details' },
    { href: '/xforcesolutions/docs/terminal.html', title: 'Terminal', desc: 'Terminal architecture' },
    { href: '/xforcesolutions/docs/data-flows.html', title: 'Data Flows', desc: 'Data flow diagrams' },
    { href: '/xforcesolutions/docs/integrations.html', title: 'Integrations', desc: 'Integration architecture' },
    { href: '/xforcesolutions/docs/news-service.html', title: 'News Service', desc: 'News service architecture' },
    { href: '/xforcesolutions/docs/contracts.html', title: 'Contracts', desc: 'Contract specifications' },
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
                    href="/xforcesolutions/docs/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                    Open Architecture Documentation →
                </a>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 mb-6">
                <h2 className="text-2xl font-bold mb-4 font-heading text-gray-900 dark:text-white">Documentation Sections</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {docLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{link.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{link.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
