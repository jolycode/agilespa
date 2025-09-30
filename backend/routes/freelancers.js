import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      const [freelancers] = await pool.query(`
        SELECT DISTINCT f.*
        FROM freelancers f
        ORDER BY f.rating DESC
      `);

      const freelancersWithSkills = await Promise.all(
        freelancers.map(async (freelancer) => {
          const [skillRows] = await pool.query(
            'SELECT skill FROM freelancer_skills WHERE freelancer_id = ?',
            [freelancer.id]
          );
          return {
            ...freelancer,
            skills: skillRows.map(row => row.skill)
          };
        })
      );

      return res.json(freelancersWithSkills);
    }

    const placeholders = skills.map(() => '?').join(',');
    const query = `
      SELECT DISTINCT f.*
      FROM freelancers f
      INNER JOIN freelancer_skills fs ON f.id = fs.freelancer_id
      WHERE fs.skill IN (${placeholders})
      ORDER BY f.rating DESC
    `;

    const [freelancers] = await pool.query(query, skills);

    const freelancersWithSkills = await Promise.all(
      freelancers.map(async (freelancer) => {
        const [skillRows] = await pool.query(
          'SELECT skill FROM freelancer_skills WHERE freelancer_id = ?',
          [freelancer.id]
        );
        return {
          ...freelancer,
          skills: skillRows.map(row => row.skill)
        };
      })
    );

    res.json(freelancersWithSkills);
  } catch (error) {
    console.error('Error searching freelancers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/skills', async (req, res) => {
  try {
    const [skills] = await pool.query(`
      SELECT DISTINCT skill 
      FROM freelancer_skills 
      ORDER BY skill
    `);
    
    const skillList = skills.map(row => row.skill);
    res.json(skillList);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [freelancers] = await pool.query(
      'SELECT * FROM freelancers WHERE id = ?',
      [id]
    );

    if (freelancers.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const freelancer = freelancers[0];

    const [skillRows] = await pool.query(
      'SELECT skill FROM freelancer_skills WHERE freelancer_id = ?',
      [id]
    );

    const freelancerWithSkills = {
      ...freelancer,
      skills: skillRows.map(row => row.skill)
    };

    res.json(freelancerWithSkills);
  } catch (error) {
    console.error('Error fetching freelancer profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;  
