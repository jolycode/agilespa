import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Mail, Phone, User } from 'lucide-react';
import { Freelancer, getFreelancerProfile } from '../services/api';

interface ProfilePageProps {
  freelancerId?: string;
}

export default function ProfilePage({ freelancerId: propFreelancerId }: ProfilePageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const freelancerId = propFreelancerId || id || '';
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError(null);

      try {
        const profile = await getFreelancerProfile(freelancerId);
        setFreelancer(profile);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [freelancerId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !freelancer) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? 'Error loading profile' : 'Profile not found'}
          </h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            onClick={() => navigate('/search')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/search')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Search</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
          <div className="flex flex-col items-center mb-8">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-48 h-48 rounded-xl object-cover shadow-lg mb-6"
            />

            <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">{freelancer.name}</h1>

            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-lg">{freelancer.age} years old</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{freelancer.city}</span>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">Stack</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{freelancer.about}</p>
          </div>

          <div className="mb-8 flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-6 h-6 ${
                  index < Math.floor(freelancer.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xl font-semibold text-gray-900 ml-2">
              {freelancer.rating} / 5.0
            </span>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>{freelancer.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>{freelancer.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}