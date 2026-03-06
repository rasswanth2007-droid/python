import React, { useState } from 'react';

const COMMON_SKILLS = [
  // Programming Languages
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'C', 'R', 'Go', 'Golang', 'Rust', 'Kotlin', 'Swift', 'PHP', 'Ruby', 'Scala', 'MATLAB', 'Perl', 'Bash', 'Shell', 'Groovy', 'Objective-C', 'VB.NET', 'Lua', 'Haskell', 'Elixir', 'Clojure', 'Erlang',
  
  // Web Development
  'React', 'React.js', 'Angular', 'Vue', 'Vue.js', 'Svelte', 'Ember', 'Backbone', 'Node.js', 'NodeJS', 'Next.js', 'NextJS', 'Nuxt', 'Gatsby', 'NestJS', 'Nest.js', 'Django', 'Flask', 'FastAPI', 'Spring', 'Spring Boot', 'Express', 'ASP.NET', 'ASP .NET', 'HTML', 'CSS', 'SCSS', 'SASS', 'LESS', 'Bootstrap', 'Tailwind', 'Material UI', 'jQuery', 'Webpack', 'Vite', 'Babel', 'Gulp', 'Grunt', 'Parcel', 'Rollup',
  
  // REST & API
  'REST', 'RESTful', 'GraphQL', 'gRPC', 'SOAP', 'WebSocket', 'JSON', 'XML', 'YAML', 'Postman', 'Swagger', 'OpenAPI', 'API Design',
  
  // Data Science & ML
  'Machine Learning', 'ML', 'Deep Learning', 'Artificial Intelligence', 'AI', 'Natural Language Processing', 'NLP', 'Computer Vision', 'CV', 'Image Processing', 'Data Mining', 'Big Data', 'Data Wrangling', 'Feature Engineering', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-Learn', 'Sklearn', 'XGBoost', 'LightGBM', 'Gradient Boosting', 'Random Forest', 'Neural Networks', 'CNN', 'RNN', 'LSTM', 'Transformers', 'Hugging Face', 'BERT', 'GPT',
  
  // Data & Databases
  'SQL', 'MySQL', 'PostgreSQL', 'SQLite', 'Oracle', 'MSSQL', 'MongoDB', 'Cassandra', 'Redis', 'Elasticsearch', 'DynamoDB', 'Firebase', 'Cosmos DB', 'Neo4j', 'Graph Databases', 'Data Warehousing', 'Data Lakes', 'ETL',
  
  // Data Analysis & BI
  'Data Analysis', 'Data Science', 'Data Engineering', 'Analytics', 'Business Intelligence', 'BI', 'Tableau', 'Power BI', 'Looker', 'QlikView', 'Excel', 'Spreadsheets', 'VLOOKUP', 'Pivot Tables', 'Statistics', 'Statistical Analysis', 'Probability', 'Hypothesis Testing', 'A/B Testing', 'Experimental Design',
  
  // Big Data & Distributed Systems
  'Spark', 'Hadoop', 'Hive', 'Pig', 'MapReduce', 'Kafka', 'RabbitMQ', 'Airflow', 'Luigi', 'Beam', 'Flink', 'Presto', 'Impala', 'Distributed Computing', 'Stream Processing',
  
  // Cloud & DevOps
  'AWS', 'Amazon Web Services', 'Azure', 'Microsoft Azure', 'GCP', 'Google Cloud', 'Cloud Computing', 'Docker', 'Containers', 'Kubernetes', 'K8s', 'OpenShift', 'Podman', 'Container Orchestration', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Travis CI', 'CircleCI', 'Bamboo', 'TeamCity', 'CI/CD', 'Continuous Integration', 'Continuous Deployment', 'DevOps', 'MLOps', 'GitOps', 'Terraform', 'CloudFormation', 'Ansible', 'Puppet', 'Chef', 'Infrastructure as Code', 'IaC', 'Linux', 'Unix', 'Windows Server', 'macOS', 'System Administration', 'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Version Control', 'Nginx', 'Apache', 'IIS', 'Web Servers', 'Load Balancing', 'Reverse Proxy', 'SSL', 'TLS', 'HTTPS', 'Security', 'Encryption', 'Firewall', 'VPN', 'Network Security',
  
  // Mobile Development
  'iOS', 'iPhone', 'Android', 'Mobile App', 'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Swift', 'Kotlin', 'Java Android', 'App Development',
  
  // Testing & QA
  'Testing', 'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'E2E', 'QA', 'Quality Assurance', 'JUnit', 'PyTest', 'TestNG', 'Mocha', 'Jest', 'Jasmine', 'RSpec', 'Cucumber', 'Selenium', 'Jira', 'Bug Tracking', 'Test Automation', 'Manual Testing', 'Exploratory Testing', 'Performance Testing', 'Load Testing', 'Stress Testing', 'Security Testing',
  
  // Software Architecture & Design
  'Microservices', 'Monolithic', 'Serverless', 'Lambda', 'Architecture', 'Design Patterns', 'MVC', 'MVVM', 'SOLID Principles', 'Clean Code', 'Refactoring', 'CQRS', 'Event Sourcing', 'API Gateway', 'Service Mesh', 'Istio', 'Consul', 'OAuth', 'JWT', 'Auth0',
  
  // Soft Skills & Management
  'Communication', 'Leadership', 'Teamwork', 'Team Collaboration', 'Problem Solving', 'Critical Thinking', 'Analytical Thinking', 'Project Management', 'Agile', 'Scrum', 'Sprint Planning', 'Kanban', 'Waterfall', 'Time Management', 'Mentoring', 'Training', 'Documentation', 'Presentation', 'Attention to Detail', 'Adaptability', 'Creativity', 'Innovation', 'Customer Service', 'Stakeholder Management',
  
  // Business & Domain Knowledge
  'SaaS', 'Finance', 'FinTech', 'Banking', 'E-commerce', 'Healthcare', 'Retail', 'Logistics', 'Manufacturing', 'Supply Chain', 'ERP', 'CRM', 'Business Analysis', 'Requirements Gathering', 'Domain Knowledge', 'Industry Expertise', 'Business Process', 'Workflow',
  
  // Other Technologies
  'Blockchain', 'Crypto', 'Web3', 'Solidity', 'Smart Contracts', 'Ethereum', 'Bitcoin', 'IoT', 'Internet of Things', 'Embedded Systems', 'Firmware', 'Microcontroller', 'AR', 'Augmented Reality', 'VR', 'Virtual Reality', '3D', 'Graphics', 'Rendering', 'Game Development', 'Unity', 'Unreal Engine', 'Godot', 'DirectX', 'OpenGL', 'Vulkan', 'SEO', 'Web Optimization', 'Performance Optimization', 'Caching', 'CDN', 'Accessibility', 'A11y', 'WCAG', 'UX', 'UI', 'User Experience', 'Interaction Design', 'Figma', 'Adobe XD', 'Sketch', 'Design Tools', 'Wireframing', 'Prototyping', 'Mockups', 'CMS', 'WordPress', 'Drupal', 'Joomla', 'Wix', 'Shopify',
  
  // Additional Modern Tech
  'Cypress', 'Playwright', 'Puppeteer', 'Vitest', 'Testing Library', 'Enzyme', 'Slack API', 'Discord API', 'Telegram', 'Twilio', 'Stripe', 'PayPal', 'Square', 'OAuth', 'SAML', 'Okta', '2FA', 'MFA', 'Quantum Computing', 'Qiskit', 'Cirq', 'Amazon Braket', 'Metaverse', 'NFT', 'DeFi', 'DApp', 'Decentralized', 'Robotics', 'Drone', 'Automation',
];

const s = {
  container: { },
  pills: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  pill: (active) => ({
    padding: '5px 12px',
    borderRadius: 20,
    border: `1px solid ${active ? '#2563eb' : '#d1d5db'}`,
    background: active ? '#2563eb' : '#fff',
    color: active ? '#fff' : '#374151',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  addRow: { display: 'flex', gap: 6, marginTop: 8 },
  input: {
    flex: 1,
    padding: '7px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 13,
    outline: 'none',
  },
  addBtn: {
    padding: '7px 16px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
  },
  selected: {
    marginTop: 12,
    padding: '10px 14px',
    background: '#eff6ff',
    borderRadius: 6,
    fontSize: 12,
    color: '#1d4ed8',
  },
};

export default function SkillSelector({ selected, setSelected }) {
  const [custom, setCustom] = useState('');

  const toggle = (skill) => {
    setSelected(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addCustom = () => {
    const s = custom.trim();
    if (s && !selected.includes(s)) {
      setSelected(prev => [...prev, s]);
    }
    setCustom('');
  };

  return (
    <div style={s.container}>
      <div style={s.pills}>
        {COMMON_SKILLS.map(skill => (
          <button key={skill} style={s.pill(selected.includes(skill))} onClick={() => toggle(skill)}>
            {skill}
          </button>
        ))}
      </div>
      <div style={s.addRow}>
        <input
          style={s.input}
          placeholder="Add custom skill..."
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCustom()}
        />
        <button style={s.addBtn} onClick={addCustom}>+ Add</button>
      </div>
      {selected.length > 0 && (
        <div style={s.selected}>
          <strong>Required ({selected.length}):</strong> {selected.join(', ')}
        </div>
      )}
    </div>
  );
}
