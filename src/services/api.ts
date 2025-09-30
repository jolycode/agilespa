export interface Freelancer {
  id: string;
  name: string;
  city: string;
  age: number;
  skills: string[];
  about: string;
  rating: number;
  avatar: string;
  email: string;
  phone: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function searchFreelancersBySkills(skills: string[]): Promise<Freelancer[]> {
  try {
    const response = await fetch(`${API_URL}/freelancers/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    });

    if (!response.ok) {
      throw new Error('Failed to search freelancers');
    }

    const data = await response.json();

    return data.map((freelancer: any) => ({
      ...freelancer,
      id: String(freelancer.id),
    }));
  } catch (error) {
    console.error('Error searching freelancers:', error);
    throw error;
  }
}

export async function getFreelancerProfile(id: string): Promise<Freelancer | null> {
  try {
    const response = await fetch(`${API_URL}/freelancers/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch freelancer profile');
    }

    const data = await response.json();

    return {
      ...data,
      id: String(data.id),
    };
  } catch (error) {
    console.error('Error fetching freelancer profile:', error);
    throw error;
  }
}
export async function getPopularSkills(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/freelancers/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [
      'React',
      'TypeScript',
      'UI/UX Design',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'Python',
      'Django',
      'Machine Learning',
      'Vue.js',
      'Nuxt',
      'TailwindCSS',
      'React Native',
      'iOS',
      'Android',
      'GraphQL',
      'Apollo',
      'AWS'
    ];
  }
}