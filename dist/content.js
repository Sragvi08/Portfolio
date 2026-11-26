export const profile = {
  name: 'Sragvi Shetty',
  intro: 'Cybersecurity M.S. student at NJIT, exploring blue team operations, threat detection, and secure systems.',
  bio: 'I build practical security tools and document what I learn along the way. I’m drawn to how systems behave under pressure, from what a packet capture can tell me to how a developer can act on a security finding.',
  interests: ['Blue team / SOC operations', 'Threat detection', 'Network analysis', 'Application security', 'Cloud misconfigurations', 'Secure systems programming'],
  timeline: [
    ['Summer 2026', 'Early College Preparatory Program · Teaching Assistant', 'Supported NJIT’s summer program for pre-college students.'],
    ['June 2026', 'SpacetimeDB Launchpad Hackathon', 'Built BloodBets with a team during NYC Tech Week and placed in the top 10.'],
    ['Graduate studies', 'New Jersey Institute of Technology · M.S. in Cybersecurity', 'Graduate coursework includes cryptography, network security, and information systems auditing.'],
    ['Campus involvement', 'G-WiCS Vice President and Campus Ambassador', 'Help connect students with technical events and employer opportunities through G-WiCS. Represent NJIT’s University Advancement Office as a Campus Ambassador.'],
  ],
  contact: [
    ['GitHub', 'https://github.com/Sragvi08'],
    ['LinkedIn', 'https://www.linkedin.com/in/sragvi-shetty-143143229/'],
    ['Email', 'mailto:sragvishetty21@gmail.com'],
  ],
  resume: null,
};

export const projects = [
  {
    id: 'ai-security-scanner', title: 'AI Security Scanner', category: 'Cybersecurity', art: 'scanner', status: 'Completed', caseId: 'SEC-001',
    summary: 'A Python CLI that flags risky code patterns and explains potential vulnerabilities.',
    tools: ['Python', 'Gemini API', 'Regex', 'CLI'],
    objective: 'Give developers actionable feedback on risky Python source patterns, including hardcoded secrets, unsafe SQL construction, and weak cryptography.',
    architecture: ['Python source', 'Local pattern checks', 'AI-assisted explanation', 'CLI report'],
    contributions: 'Built the CLI workflow, implemented pattern checks, integrated AI-assisted explanations, and formatted findings.',
    challenges: 'Suspicious patterns and genuine security issues can look similar. Explanations need to communicate confidence and support manual validation.',
    result: 'The tool produces readable triage findings. Next steps include clearer severity, confidence, and remediation guidance.',
    xp: 'Treat automated findings as triage signals. Validate them and describe concrete remediation.',
    screenshots: [{src:'/assets/scanner-findings.webp',alt:'Scanner output explaining a hardcoded-credential finding and showing how to read values from environment variables.'}],
    links: [['GitHub', 'https://github.com/Sragvi08/AI-Security-Scanner']],
  },
  {
    id: 'ssh-smb-misconfiguration', title: 'SSH Key Exposure + SMB Misconfiguration', category: 'Cybersecurity', art: 'network', status: 'Completed', caseId: 'LAB-002',
    summary: 'An authorized lab on credential exposure and overly permissive file sharing.',
    tools: ['Linux', 'SMB', 'SSH', 'Wireshark'],
    objective: 'Investigate how weak file permissions and exposed credentials compound risk in a controlled lab.',
    architecture: ['SMB service', 'Share permissions review', 'Credential exposure assessment', 'Defensive controls'],
    contributions: 'Reviewed share permissions and network visibility, mapped the exposure, and documented controls for authentication and file shares.',
    challenges: 'Separate service exposure from access-control failures and turn observations into concrete mitigations.',
    result: 'Identified opportunities to tighten share access, audit for sensitive material, review authentication logs, and rotate exposed keys.',
    xp: 'Audit accessible shares, enforce least privilege, monitor authentication, and revoke exposed keys.',
    screenshots: [{src:'/assets/lab-service-listeners.webp',alt:'Authorized lab terminal showing local service listeners on TCP ports 139 and 445. The prompt is cropped out.'}],
    links: [['GitHub', 'https://github.com/Sragvi08/SSH-Key-Exposure-and-SMB-Misconfiguration-Lab/']],
  },
  {
    id: 'secure-concurrent-tcp-server', title: 'Secure Concurrent TCP Server', category: 'Systems', art: 'server', status: 'Completed', caseId: 'SYS-003',
    summary: 'A multithreaded TCP server in C with input validation and secure logging.',
    tools: ['C', 'pthreads', 'Linux', 'Netcat', 'Valgrind'],
    objective: 'Practice concurrent network programming while handling untrusted input and errors safely.',
    architecture: ['TCP listener', 'Concurrent clients', 'Request validation', 'Processing and logging'],
    contributions: 'Built the server, supported simultaneous client connections, added input checks, and tested with command-line clients and debugging tools.',
    challenges: 'Careful buffer handling and concurrency are essential when multiple clients can submit malformed input.',
    result: 'A working concurrent service that validates requests and demonstrates safe failure paths.',
    xp: 'Check length, type, and format early. Keep logs useful while avoiding sensitive data.',
    links: [['GitHub', 'https://github.com/Sragvi08/My-file-server']],
  },
  {
    id: 'notes-on-becoming', title: 'Notes on Becoming', category: 'Web', art: 'book', status: 'Built',
    summary: 'A journal designed to feel like opening a physical notebook.',
    tools: ['JavaScript', 'CSS', 'Vercel', 'Passkeys', 'JSON export'],
    objective: 'Create a personal growth journal with dated pages, section dividers, and a readable one-page view on phones.',
    architecture: ['Spiral notebook interface', 'Passkey sign-in', 'Private notebook storage', 'JSON and Markdown exports'],
    contributions: 'Designed the paper-journal interaction, one-page mobile reading, and navigation through past dates. Added individual journals with passkey sign-in and export controls.',
    challenges: 'Keep the feel of a physical book while making dates easy to find and separating different readers’ entries.',
    result: 'A live journal featuring Daily Log, Tech Log, Habit Log, and Reflections, with JSON archive and Markdown note exports.',
    xp: 'Design the navigation around the way people recall entries, especially by date.',
    links: [['GitHub','https://github.com/Sragvi08/notes-on-becoming'],['Live journal','https://notes-on-becoming.vercel.app/']],
  },
  {
    id: 'bloodbets', title: 'BloodBets', category: 'Web', art: 'arena', status: 'Hackathon build',
    summary: 'A real-time tournament simulator with 50 AI gladiators and a live arena.',
    tools: ['SpacetimeDB', 'React', 'TypeScript', 'Groq', 'Llama 3.1'],
    objective: 'Build a real-time simulation in which viewers follow matches and can sponsor or place in-game bets on fighters.',
    architecture: ['React client', 'Generated bindings and WebSockets', 'SpacetimeDB state and reducers', 'AI orchestration'],
    contributions: 'Worked on the frontend, reducers, generated client bindings, AI orchestration, live updates, and debugging.',
    challenges: 'Keep the interface synchronized with the tournament while integrating AI-driven actions within a 36-hour event.',
    result: 'Top 10 among 40+ teams at the SpacetimeDB Launchpad Hackathon during NYC Tech Week.',
    xp: 'Keep the tournament state authoritative and make transitions easy to follow in the client.',
  },
  {
    id: 'smart-mcq-solver', title: 'Smart MCQ Solver', category: 'AI / ML', art: 'robot', status: 'Competition project',
    summary: 'A ranked-answer prediction pipeline for a Kaggle multiple-choice challenge.',
    tools: ['Python', 'PyTorch', 'scikit-learn', 'MiniLM', 'Weights & Biases'],
    objective: 'Rank the three most likely answers to each question and compare them using MAP@3.',
    architecture: ['Question–option pairs', 'Sparse, scratch, and pretrained models', 'Option scoring', 'Top-three ranking'],
    contributions: 'Built a TF-IDF/logistic regression model, a neural model from scratch, and a MiniLM embedding pipeline. Compared validation runs and submitted ensembles.',
    challenges: 'Compare models on the same split and distinguish validation performance from leaderboard generalization.',
    result: 'The stronger of two recorded ensemble submissions scored 0.75103 MAP@3 on the Kaggle leaderboard.',
    xp: 'Report validation and leaderboard scores separately and give simpler baselines a fair comparison.',
  },
];

export const labs = [
  { id: 'ssh-smb-misconfiguration', title: 'SSH Key Exposure + SMB Misconfiguration', status: 'Completed', art: 'network',
    summary: 'Controlled lab on exposed key material and permissions. Covers defensive findings and mitigations.', project: 'ssh-smb-misconfiguration' },
  { id: 'network-security-monitoring', title: 'Network security monitoring', status: 'Ongoing', art: 'lab',
    summary: 'Coursework using Security Onion, pfSense, Kali, and Ubuntu. Focused on packet visibility and detection-rule validation.' },
  { id: 'ctf-practice', title: 'CTF practice', status: 'Completed', art: 'game',
    summary: 'Placed in the top 10% in college-level CTFs. Individual challenge write-ups are unavailable.' },
  { id: 'cloud-configuration-review', title: 'Cloud configuration review', status: 'Planned', art: 'scanner',
    summary: 'Practice reviewing identity, storage, and network settings for unnecessary exposure.' },
];

export const skills = [
  ['Wireshark', 'Security', 'network', 'Inspect and interpret traffic in authorized network labs.', 'ssh-smb-misconfiguration'],
  ['Linux', 'Security', 'terminal', 'Review permissions and operate test services in controlled systems.', 'ssh-smb-misconfiguration'],
  ['Static analysis', 'Security', 'scanner', 'Use pattern checks and triage guidance to review Python source.', 'ai-security-scanner'],
  ['Security Onion', 'Security', 'lab', 'Practice writing and validating network detections in coursework.', null, 'network-security-monitoring'],
  ['C and pthreads', 'Development', 'server', 'Build concurrent services and validate network input.', 'secure-concurrent-tcp-server'],
  ['React and TypeScript', 'Development', 'quick', 'Build interfaces that respond to live tournament state.', 'bloodbets'],
  ['SpacetimeDB', 'Development', 'arena', 'Implement game state updates with reducers and generated bindings.', 'bloodbets'],
  ['PyTorch', 'AI / ML', 'robot', 'Train an embedding-based model from scratch for scoring question–option pairs.', 'smart-mcq-solver'],
  ['scikit-learn', 'AI / ML', 'brain', 'Build and compare TF-IDF and logistic regression ranking baselines.', 'smart-mcq-solver'],
  ['Azure fundamentals', 'Cloud', 'certificate', 'Earned the Microsoft Certified: Azure Fundamentals credential.'],
];

export const honors = [
  ['Arena Finalist', 'Top 10 · SpacetimeDB Launchpad Hackathon', 'June 2026', 'BloodBets placed in the top 10 among 40+ teams during NYC Tech Week.', 'cup', 'bloodbets'],
  ['Community Builder', 'Second Runner-Up · Financial Empowerment Hackathon', 'Hackathon', 'FinBot and community tools placed second runner-up among about 50 teams.', 'hall'],
  ['Signal Hunter', 'Top 10% · College-level CTFs', 'Competition', 'Reached the top 10% in college-level capture-the-flag competitions.', 'medal'],
  ['Cloud Initiate', 'Microsoft Certified: Azure Fundamentals', 'AZ-900', 'Earned Microsoft’s Azure Fundamentals certification.', 'certificate'],
];

export const thoughts = [
  ['cryptography.exe', 'Running', 72],
  ['portfolio_redesign.exe', 'High priority', 91],
  ['security_research.exe', 'Running', 61],
  ['next_side_quest.exe', 'Initializing', 32],
  ['sleep_schedule.exe', 'Not responding', 6],
  ['curiosity.exe', 'Permanent', 100],
];

export const stars = [
  ['Wonder', 'Open the Player Profile'],
  ['Creation', 'Open a project case file'],
  ['Discovery', 'Read a Field Notes article'],
  ['Courage', 'Open a completed or ongoing lab'],
  ['Growth', 'Inspect an Inventory item'],
  ['Connection', 'View a Hall of Fame achievement'],
  ['Magic', 'Interact with Lil Mochi'],
];

export const wishes = [
  'May the next error message mention the actual cause.',
  'A good question can be its own little discovery.',
  'May your packet capture start before the interesting part.',
  'Somewhere, a clean Git history is wishing for you, too.',
  'Another orbit begins. One small experiment is plenty.',
];
