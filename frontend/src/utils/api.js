import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const uploadResumes = (files) => {
  const form = new FormData();
  files.forEach(f => form.append('resumes', f));
  return API.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const matchCandidates = (candidates, requiredSkills, jobDescription, minExperience) =>
  API.post('/match', { candidates, required_skills: requiredSkills, job_description: jobDescription, min_experience: minExperience });

export const parseJD = (text) =>
  API.post('/parse-jd', { text });

export const healthCheck = () => API.get('/health');

export const getSampleCandidates = () => API.get('/samples');
