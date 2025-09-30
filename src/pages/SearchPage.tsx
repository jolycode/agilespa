import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  MapPin, Star, X, User } from 'lucide-react';
import { getPopularSkills, Freelancer, searchFreelancersBySkills } from '../services/api';

export default function SearchPage() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredFreelancers, setFilteredFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popularSkills, setPopularSkills] = useState<string[]>([]);

  useEffect(() => {
    async function loadSkills() {
      try {
        const skills = await getPopularSkills();
        setPopularSkills(skills);
      } catch (err) {
        console.error('Failed to load skills:', err);
      }
    }
    loadSkills();
  }, []);

  const availableSkills = popularSkills.filter(
    (skill) => !selectedSkills.includes(skill) && skill.toLowerCase().includes(inputValue.toLowerCase())
  );
  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchFreelancersBySkills(selectedSkills);
      setFilteredFreelancers(results);
    } catch (err) {
      setError('Failed to search freelancers. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Search profiles</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Skills
          </label>

          <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 bg-gray-50 rounded-lg">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type a skill (e.g., React, Python, Design)..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />

            {showSuggestions && inputValue && availableSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-gray-700"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Search</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Found <span className="font-semibold text-gray-900">{filteredFreelancers.length}</span> profiles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreelancers.map((freelancer) => (
                <button
                  key={freelancer.id}
                  onClick={() => navigate(`/profile/${freelancer.id}`)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 p-6 text-left transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {freelancer.name}
                      </h3>
                      <div className="flex items-center space-x-3 text-gray-600 text-sm mt-1">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{freelancer.city}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{freelancer.age} years</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(freelancer.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {freelancer.rating}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {freelancer.about}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {filteredFreelancers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No Profile found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try different skills or clear your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}