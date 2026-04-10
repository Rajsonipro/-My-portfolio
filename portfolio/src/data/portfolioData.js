/** Portfolio Knowledge Base for AI Assistant */
const portfolioData = {
  personal: {
    name: 'Raj Soni',
    role: 'Full Stack Developer & AI Enthusiast',
    bio: 'Hey! I\'m Raj Soni, a Computer Engineering student at Madhuben & Bhanubhai Patel Institute of Technology (MBIT, CVM University). I\'m passionate about building end-to-end software — from polished React UIs to cloud deployments and hardware prototypes. Currently exploring AI/ML and IoT systems. I love writing clean, performant code and crafting great user experiences.',
    email: 'rajsoni02082006@gmail.com',
    location: 'New Vallabh Vidyanagar, Gujarat, India',
    availability: 'Available for internships and projects.'
  },
  skills: [
    { name: 'React / Next.js', level: 85 },
    { name: 'Python / ML', level: 75 },
    { name: 'DSA', level: 60 },
    { name: 'C / C++', level: 78 },
    { name: 'IoT / Embedded', level: 72 }
  ],
  techStack: ['React', 'Python', 'JavaScript', 'Git', 'Arduino'],
  projects: [
    {
      title: 'Bridge Health Monitoring IoT System',
      description: 'Real-time structural health monitoring using NodeMCU ESP8266, MPU6050, FSR sensors — streams to ThingSpeak.',
      tags: ['IoT', 'ESP8266', 'ThingSpeak', 'C++', 'MQTT']
    },
    {
      title: 'Smart Car Health Monitoring System',
      description: 'IoT system monitoring vehicle parameters like engine temp, gas levels — cloud data for predictive maintenance.',
      tags: ['ESP32', 'IoT', 'ThingSpeak', 'Sensors']
    },
    {
      title: 'AI-Based Interview Simulator',
      description: 'Intelligent interview prep platform using AI for dynamic questions, feedback, performance analysis.',
      tags: ['AI', 'LLM', 'React', 'OpenAI API']
    },
    {
      title: 'Health & Fitness App',
      description: 'Fitness tracking app for activities, calories, workouts with personalized health insights.',
      tags: ['React', 'Firebase', 'UI/UX', 'HealthTech']
    }
  ],
  education: [
    {
      degree: 'B.Tech Computer Engineering',
      institution: 'MBIT (CVM University)',
      period: '2023-2027',
      cgpa: '8.5+',
      status: 'Ongoing'
    },
    {
      degree: 'HSC Science (PCM + CS)',
      institution: 'GSEB - D.N High School, Anand',
      period: '2021-2023',
      percentage: '70%'
    },
    {
      degree: 'SSC',
      institution: 'GSEB - D.N High School, Anand',
      period: '2019-2021',
      percentage: '93%'
    }
  ],
  experience: [
    {
      title: 'ISTE Event Team Member',
      org: 'ISTE Student Chapter · MBIT',
      period: '2026',
      desc: 'Contributed to planning technical/non-technical events, coordination, promotions.'
    },
    {
      title: 'Web Development Intern',
      org: 'CodeAlpha',
      period: '2026',
      desc: 'Built responsive web apps, enhanced front-end performance.'
    }
  ],
  social: {
    github: 'https://github.com/Rajsonipro',
    linkedin: 'https://www.linkedin.com/in/raj-soni-0208s/',
    instagram: 'https://www.instagram.com/raj__208'
  },
  stats: {
    projects: '10+',
    yearsCoding: '2+',
    certifications: '5+'
  }
};

export default portfolioData;

