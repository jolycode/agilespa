import { Home, Search } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const links = [
    { name: 'Home', path: 'home', icon: Home },
    { name: 'Search', path: 'search', icon: Search },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Agile Talent Solutions"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Agile Talent Solutions</span>
          </div>

          <div className="flex space-x-8">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === link.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}