export const projects = [
  {
    id: "CASE ID: SEC-001",
    slug: "ai-security-scanner",
    title: "AI Security Scanner",
    description:
      "Static analysis tool that scans source code for security issues using ML + pattern matching.",
    category: "Secure Development",
    status: "Completed",
    tools: "Python, Gemini API, Regex, CLI",
    type: "Security Tool",
    severity: "Medium",
    repoUrl: "https://github.com/Sragvi08/AI-Security-Scanner",
    overview:
      "AI Security Scanner is a command-line security tool that scans Python source code for common security issues such as SQL injection, hardcoded secrets, and weak cryptography. The goal was to build a practical developer-facing tool that gives clear, actionable feedback instead of vague warnings.",
    objective:
      "Build a lightweight security scanner that helps developers identify risky Python code patterns and understand why they matter.",
    securityFocus: [
      "Static analysis",
      "Secure coding practices",
      "Application security",
      "Developer security tooling",
    ],
    technicalDetails: [
      "Built a CLI workflow for scanning local Python files.",
      "Used pattern matching to identify suspicious code structures.",
      "Integrated AI-assisted analysis to explain potential vulnerabilities.",
      "Formatted findings into readable security-style output.",
    ],
    findings: [
      "Hardcoded secrets can appear in config files, test files, and quick prototypes.",
      "String-concatenated SQL queries are risky even when the input source is not immediately obvious.",
      "AI-assisted scanning is useful for explanation, but results still need validation to reduce false positives.",
    ],
    defensiveTakeaways: [
      "Use parameterized queries instead of string interpolation.",
      "Store secrets in environment variables or secret managers.",
      "Avoid weak cryptographic algorithms and outdated hashing methods.",
      "Treat automated findings as triage signals, not final proof.",
    ],
  },
  {
    id: "CASE ID: LAB-002",
    slug: "ssh-smb-misconfiguration",
    title: "SSH Key Exposure + SMB Misconfiguration",
    description:
      "Investigated credential exposure via misconfigured services and weak permissions.",
    category: "Threat Investigation",
    status: "Completed",
    tools: "Linux, SMB, SSH, Wireshark",
    type: "Lab Writeup",
    severity: "High",
    repoUrl:
      "https://github.com/Sragvi08/SSH-Key-Exposure-and-SMB-Misconfiguration-Lab/",
    overview:
      "This lab explores how exposed credentials and misconfigured file-sharing services can create an attack path. It focuses on why obscurity is not a strong security control and how defenders can reduce the risk of exposed keys and overly permissive services.",
    objective:
      "Recreate a realistic misconfiguration scenario involving SMB access and exposed SSH material, then document the risk and defensive lessons.",
    securityFocus: [
      "Misconfiguration analysis",
      "Credential exposure",
      "Linux permissions",
      "Network service enumeration",
    ],
    technicalDetails: [
      "Reviewed exposed file shares for sensitive artifacts.",
      "Analyzed how weak file permissions can increase compromise risk.",
      "Mapped the relationship between service exposure and credential misuse.",
      "Documented defensive controls for SSH keys and SMB services.",
    ],
    findings: [
      "Exposed private keys can become a direct path to unauthorized access.",
      "SMB shares should not expose sensitive credentials or internal files.",
      "File permissions and service visibility are critical defensive controls.",
      "Security through obscurity does not prevent discovery during enumeration.",
    ],
    defensiveTakeaways: [
      "Restrict SMB shares to only required users and hosts.",
      "Audit file shares for secrets, keys, backups, and configuration files.",
      "Use strong SSH key permissions and rotate exposed keys immediately.",
      "Monitor authentication logs for suspicious SSH activity.",
    ],
  },
  {
    id: "CASE ID: SYS-003",
    slug: "secure-concurrent-tcp-server",
    title: "Secure Concurrent TCP Server",
    description:
      "Built a multi-threaded TCP server in C with input validation and secure logging.",
    category: "Systems Programming",
    status: "In Progress",
    tools: "C, pthreads, Linux, Netcat, Valgrind",
    type: "Systems Security",
    severity: "Low",
    repoUrl: "https://github.com/Sragvi08/My-file-server",
    overview:
      "This project focuses on low-level network programming and secure input handling. The server accepts client connections, processes requests, and demonstrates the security considerations that come with C-based network services.",
    objective:
      "Build a concurrent TCP server while practicing secure systems programming, defensive input handling, and safe error management.",
    securityFocus: [
      "Network programming",
      "Secure C development",
      "Input validation",
      "Concurrency safety",
    ],
    technicalDetails: [
      "Created a TCP server that accepts multiple client connections.",
      "Used threads or process-based concurrency for simultaneous clients.",
      "Validated incoming input before processing requests.",
      "Tested behavior with command-line clients and debugging tools.",
    ],
    findings: [
      "Network services need strict input validation because clients cannot be trusted.",
      "C programs require careful memory and buffer management.",
      "Concurrent code introduces reliability and security risks if shared state is not controlled.",
      "Logging should capture useful events without leaking sensitive data.",
    ],
    defensiveTakeaways: [
      "Validate input length, type, and format before processing.",
      "Avoid unsafe string functions and unchecked buffers.",
      "Use tools like Valgrind to catch memory issues.",
      "Design server behavior to fail safely on malformed input.",
    ],
  },
];

export const blogPosts = [
  {
    slug: "why-im-building-a-portfolio",
    date: "DRAFT",
    title: "Why I’m Building a Portfolio",
    tag: "Reflection",
    summary:
      "A short introduction to why I’m documenting my projects, learning in public, and building toward cybersecurity and tech roles.",
    content: `
      I started this portfolio because I wanted a place that shows more than a resume can. A resume lists skills and projects, but a portfolio can show how I think, what I’m learning, and how I approach problems.

      As a cybersecurity Master's student, I’m interested in blue team work, secure systems, and practical security tooling. But I’m also curious about software engineering, systems, databases, cloud, and the way real products are built.

      This blog is where I’ll document that process. Some posts may be security-related, while others may be notes from debugging, building, reading, or experimenting with new tools.
    `,
  },
  {
    slug: "notes-on-ai-security-scanner",
    date: "JUNE 7, 2026",
    title: "Notes from Building an AI Security Scanner",
    tag: "Project Notes",
    summary:
      "Early notes on designing a Python CLI tool that scans code for insecure patterns and explains potential security issues.",
    content: `
      While building the AI Security Scanner, I wanted to understand how developer security tools identify risky code patterns and present them in a useful way.

      The project made me think about the difference between finding something suspicious and proving that it is actually exploitable. That distinction matters because security tools can create noise if their results are not clear.

      One thing I want to improve next is the way the scanner explains severity, confidence, and remediation steps.
    `,
  },
  {
    slug: "arp-was-too-trusting",
    date: "JUN 2026",
    title: "ARP Was Too Trusting",
    tag: "Networking",
    summary:
      "A first-principles explanation of ARP, why it was designed around trust, and how those assumptions lead naturally to ARP poisoning.",
    content: `
  Most people learn ARP as one of those networking protocols you are just supposed to memorize.

  ARP maps IP addresses to MAC addresses.
  ARP uses broadcasts.
  ARP has requests and replies.
  ARP can be spoofed.

  Cool. Great. Another acronym.

  But I think ARP becomes a lot more interesting when you stop treating it like a fact to memorize and start treating it like a design argument.

  Because ARP poisoning is not some magical hacker trick that appears out of nowhere. If you walk through the assumptions ARP was built on, the attack almost reveals itself.

  So let’s build ARP from first principles.

  No security yet. No attacks yet. Just the original problem.

  ## The Problem ARP Was Trying to Solve

  Imagine a simple local network.

  You have a few devices connected together: laptops, servers, maybe a router. Each device has an IP address, like:

  192.168.1.5
  192.168.1.10
  192.168.1.1

  But Ethernet does not actually deliver frames using IP addresses.

  Ethernet uses MAC addresses.

  So now we have a very practical problem:

  I want to send an IP packet to 192.168.1.10, but Ethernet needs a MAC address.

  That is the entire reason ARP exists.

  ARP answers one question:

  “Who has this IP address, and what MAC address should I use to reach them?”

  That’s it.

  Not encryption.
  Not identity verification.
  Not trust management.
  Just address resolution.

  And honestly, for the original environment ARP was designed for, that made sense.

  ## ARP Came From a More Trusting World

  ARP was designed in the early 1980s, when networks looked very different from the ones we use today.

  Local networks were usually smaller. They were often physically contained inside one organization, one lab, one office, or one building. The threat model was not “what if someone malicious joins the Wi-Fi at a coffee shop?” It was closer to “how do we get these machines to talk to each other efficiently?”

  That context matters.

  ARP was not designed around hostile insiders, rogue devices, or random people joining a shared wireless network. It was designed around speed, simplicity, and low overhead.

  Security was not missing because someone forgot to add it.

  Security just was not the main design goal.

  And that one decision explains almost everything that comes later.

  ## How ARP Works Normally

  Let’s say Host A has this IP address:

  192.168.1.5

  And Host A wants to send traffic to Host B:

  192.168.1.10

  Host A knows the destination IP address, but it does not know the destination MAC address.

  So Host A sends an ARP request.

  Since it does not know who owns 192.168.1.10, it sends the request as a broadcast. In Ethernet terms, that means the frame goes to:

  FF:FF:FF:FF:FF:FF

  That is the broadcast MAC address.

  In plain English, Host A is basically yelling across the local network:

  Who has 192.168.1.10?
  Tell 192.168.1.5.

  Everyone on the LAN can hear this.

  Most devices ignore it because it is not about them.

  But Host B sees the request and says:

  192.168.1.10 is at AA:BB:CC:DD:EE:FF.

  Host A receives that reply and stores the mapping in its ARP cache:

  192.168.1.10 → AA:BB:CC:DD:EE:FF

  Now Host A can send Ethernet frames to Host B.

  So far, this seems completely reasonable.

  And to be fair, it is reasonable.

  If everyone is honest.

  ## The Hidden Assumption: Everyone Is Honest

  This is where ARP gets interesting.

  ARP does not really verify that the reply is true.

  If a machine says:

  192.168.1.10 is at AA:BB:CC:DD:EE:FF

  ARP generally accepts that information.

  It does not ask:

  “Are you really 192.168.1.10?”
  “Can you prove that?”
  “Did I even ask you?”
  “Has someone else already claimed this IP?”

  It just updates the cache.

  That sounds alarming now, but in the original design context, it was a tradeoff. Verification would have required some kind of authentication system, which would have added complexity. ARP was meant to be lightweight.

  The problem is that this creates a very big assumption:

  ARP assumes that devices on the local network tell the truth.

  That is a cute assumption.

  It is also a dangerous one.

  ## Final Thought

  I used to think of ARP poisoning as just another attack to memorize.

  But now I think it is a really clean example of how security failures often begin as design assumptions.

  ARP was built to solve a practical problem in a practical way:

  Given an IP address, find the MAC address needed for local delivery.

  It did that job well.

  But it trusted the local network too much.

  And once you see that, ARP poisoning stops feeling like a random trick and starts feeling almost inevitable.

  That is why I like studying protocols this way.

  Not as lists of fields.
  Not as diagrams to memorize.
  Not as acronyms floating around in a textbook.

  But as little arguments.

  ARP’s argument was:

  “The local network is friendly, so we can keep this simple.”

  ARP poisoning is what happens when someone replies:

  “What if it isn’t?”
  `,
  },
];

export const focusAreas = [
  {
    title: "Threat detection engineering",
    text: "Building detections, tuning alerts, reducing noise.",
  },
  {
    title: "Cloud misconfigurations",
    text: "Auditing IAM, storage, and network exposures.",
  },
  {
    title: "Network analysis",
    text: "Deeper packet analysis and traffic hunting.",
  },
  {
    title: "SOC workflows",
    text: "Alert triage, enrichment, and incident response.",
  },
];
