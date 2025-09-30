import { useState, useEffect } from 'react';

interface FloatingTag {
  skill: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

const techSkills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript',
  'Vue.js', 'Angular', 'Docker', 'AWS', 'MongoDB',
  'PostgreSQL', 'GraphQL', 'Next.js', 'Tailwind', 'Go',
  'Kubernetes', 'Redis', 'Django', 'Flutter', 'Swift'
];

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [tags, setTags] = useState<FloatingTag[]>([]);

  useEffect(() => {
    const initialTags = techSkills.map((skill) => ({
      skill,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 0.25 + 0.9,
    }));
    setTags(initialTags);

    const interval = setInterval(() => {
      setTags((prevTags) =>
        prevTags.map((tag) => {
          let newX = tag.x + tag.dx;
          let newY = tag.y + tag.dy;
          let newDx = tag.dx;
          let newDy = tag.dy;

          if (newX <= 2 || newX >= 98) {
            newDx = -tag.dx;
            newX = newX <= 2 ? 2 : 98;
          }
          if (newY <= 2 || newY >= 98) {
            newDy = -tag.dy;
            newY = newY <= 2 ? 2 : 98;
          }

          return { ...tag, x: newX, y: newY, dx: newDx, dy: newDy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (onNavigate) {
      onNavigate('search');
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="absolute px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-600 border border-gray-100 transition-all duration-75"
            style={{
              left: `${tag.x}%`,
              top: `${tag.y}%`,
              transform: `translate(-50%, -50%) scale(${tag.size})`,
            }}
          >
            {tag.skill}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
              Welcome
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover talented developers and connect with professionals.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
            >
            
              <span>Go to Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

