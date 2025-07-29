export const projects = [
    {
      title: "935 Surf Shack",
      subtitle: "Client-editable restaurant site built with Next.js and Sanity",
      status: "completed",
      category: "Full-Stack",
      github: "https://github.com/annierome1/935SurfShack",
      description: "A restaurant website built for a client with a Sanity CMS for easy content updates.",
      link: "https://www.935surfshack.com/", 
      technologies: [
        { name: "Next.js", icon: "RiNextjsFill" },
        { name: "Tailwind", icon: "RiTailwindCssFill" },
        { name: "Vercel", icon: "IoLogoVercel" },
        { name: "Sanity", icon: "SiSanity" } 
      ],
      functions: [
        "Client-friendly CMS integration via Sanity.io",
        "Mobile-first responsive design",
        "Editable event calendar and menus",
        "Live site deployment via Vercel"
      ],
      photo: "/images/surfshack.png"
    },
  
    {
      title: "Glazier Children's Museum",
      subtitle: "Client-focused educational web app built with Django",
      status: "completed",
      category: "Full-Stack",
      github: "https://github.com/annierome1/FINAL_PROJECT",
      description: "A client-based educational web app created for Glazier Children’s Museum.",
      link: "https://anniecrome1.pythonanywhere.com/",
      technologies: [
        { name: "Django", icon: "SiDjango" },
        { name: "MySQL", icon: "SiMysql" }
      ],
      functions: [
        "Dynamic content management",
        "Client-based feature customization",
        "User-friendly admin panel",
        "Educational resource delivery"
      ]
    },
  
    
  
    {
      title: "Portfolio",
      subtitle: "Developer portfolio built with React and Tailwind",
      category: "Personal",
      status: "completed",
      github: "https://github.com/annierome1/portfolio1",
      description: "A personal website to showcase my projects, skills, and development work.",
      technologies: [
        { name: "React", icon: "FaReact" },
        { name: "Tailwind", icon: "RiTailwindCssFill" },
        { name: "Vercel", icon: "IoLogoVercel" }
      ],
      functions: [
        "Interactive project showcase",
        "Responsive UI design",
        "Tech stack highlights",
        "GitHub integration"
      ]
    },
  
    {
      title: "ChatBot",
      subtitle: "Context-aware AI chatbot with Pinecone, OpenAI, and AWS automation",
      category: "Personal",
      status: "completed",
      github: "https://github.com/annierome1/ChatBotAnnie",
      description: "An intelligent personal chatbot using OpenAI and Pinecone, with an AWS Lambda + API Gateway setup that automatically syncs updated project and skill data from this portfolio.",
      technologies: [
        { name: "Python", icon: "SiPython" },
        { name: "FastAPI", icon: "SiFastapi" },
        { name: "OpenAI", icon: "AiOutlineOpenAI" },
        { name: "Pinecone", icon: "public/pinecone-icon-seeklogo.svg" },
        { name: "AWS Lambda", icon: "" },
        { name: "API Gateway", icon: "" }
      ],
      functions: [
        "Semantic search and vector retrieval with Pinecone",
        "Dynamic natural language responses via OpenAI",
        "Custom chatbot trained on personal and project data",
        "Automated updates triggered by GitHub using AWS Lambda and API Gateway"
      ]
    },    
    
    {
      title: "Masda Gym",
      subtitle: "Website for Masda Gym Liverpool",
      status: "completed",
      category: "Full-Stack",
      github: "https://github.com/annierome1/masdaliverpool",
      description: "A full-stack website built for Masda Gym in Liverpool to showcase fighters, upcoming fight nights, and gym-related content. Includes CMS integration for client editing.",
      link: "https://www.masdaliverpool.com/", 
      technologies: [
        { name: "Next.js", icon: "RiNextjsFill" },
        { name: "CSS", icon: "FaCss3Alt" },
        { name: "Vercel", icon: "IoLogoVercel" },
        { name: "Sanity", icon: "SiSanity" }

      ],
      functions: [
          "Showcases fighters with bios, stats, and image galleries",
          "Highlights upcoming fight nights and past event recaps",
          "Dedicated section for the Fighter Foundation and its mission",
          "Live deployment and automatic updates using Vercel"
        ],
        photo: "/images/masda_logo_color_wt.png"
    },
    {
      title: "ResuBuild",
      subtitle: "Resume builder with AI-powered cover letter generation",
      status: "completed",
      category: "Full-Stack",
      github: "https://github.com/annierome1/ResuBuild",
      description: "Create resumes in real-time and generate tailored cover letters using OpenAI.",
      link: "http://www.resubuild.com/",
      technologies: [
        { name: "React", icon: "FaReact" },
        { name: "OpenAI API", icon: "AiOutlineOpenAI" },
        { name: "Node.js", icon: "FaNodeJs" },
        { name: "MongoDB", icon: "SiMongodb" }
      ],
      functions: [
        "Real-time resume editing",
        "Custom cover letter generation",
        "User authentication",
        "Progress saving"
      ]
    },
    
    {
      title: "Escape Room: NP Edition",
      subtitle: "Puzzle-based educational game teaching NP-completeness",
      status: "completed",
      category: "Educational Game",
      github: "https://github.com/annierome1/EscapeRoom",
      description: "A gamified educational tool that introduces NP-completeness through an escape room built on Hamiltonian path puzzles.",
      link: "https://annierome1.github.io/EscapeRoom/", 
      technologies: [
        { name: "JavaScript", icon: "IoLogoJavascript" },
        { name: "HTML", icon: "FaHtml5" },
        { name: "CSS", icon: "FaCss3Alt" }
      ],
      images: [
        "/images/escape-room/photo1.png",
        "/images/escape-room/photo2.png",
        
      ],
      functions: [
        "Hamiltonian path puzzle generation",
        "Collectible-based escape room gameplay",
        "Educational feedback via OpenAI storytelling",
        "Visualization of exponential time complexity growth"
      ]
    },
    {
      title: "University of Tampa App",
      subtitle: "Campus companion app for students and guests",
      status: "completed",
      category: "Mobile App",
      description: "An iOS app that provides real-time access to campus resources, parking garage availability, school calendar events, interactive map, and more—all in a single intuitive interface.",
      link: "https://testflight.apple.com/join/ESBV6uwy", // update 
      technologies: [
        { name: "Swift", icon: "FaSwift" },
        { name: "AWS", icon: "FaAws" },
      ],
      functions: [
        "Student and guest login with personalized home view",
        "Real-time parking garage availability",
        "Integration of multiple APIs including TicketMaster and Google Places",
        "Interactive, geolocated campus map integrated throughout the app",
        
      ],
      embedUrl: "/videos/utampaapp.mov"
    },
    {
      title: "A Way Home",
      subtitle: "VR experience teaching UN child rights through storytelling",
      status: "completed",
      category: "3D Development",
      description: "An immersive VR game teaching UN child rights via narrative-driven gameplay.",
      link: "https://leadercop.weebly.com/meet-the-vr-g4c-team.html",
      video: "https://use.vg/kkdnVf",
      technologies: [
        { name: "Unity", icon: "FaUnity" },
        { name: "VR MetaQuest", icon: "FaMeta" }
      ],
      functions: [
        "Immersive room-based storytelling",
        "Narrative learning integration",
        "VR player interaction",
        "UN Convention-based dialogue"
      ]
    },
    
    

  

  {
    id: 1,
    title: "SciFiLi",
    description: "A program that utilizes binary trees, linked lists, and priority queues to create a book library based on books read from a text file",
    category: "School",
    github: "https://github.com/annierome1/SciFILi",
    technologies: [
      {name: "Python", icon: "SiPython"}
    ]
  },
 

  

  {
    id: 2,
    title: "AI Game Player",
    description: "For my AI/ML class, I was tasked with developing an AI player for the game Prudh. The professor provided us with a GameEngine, Main, and GameRules, and our objective was to create an intelligent agent that would later compete against other students' AI players. I chose to implement both a MiniMax player and an optimized Monte Carlo player.",
    category: "School",
    github: "https://github.com/annierome1/AI_Game_Players",
    technologies: [
      {name: "Python", icon: "SiPython"}
    ]
  },
  {
    id: 3,
    title: "Advanced Data Structures",
    description:"A combination of data structres and algorithms",
    category: "School",
    github: "https://github.com/annierome1/DataStructures",
    technologies: [
      {name: "Java", icon: "FaJava"}
    ]
  },


];



export const skills = {
  Languages: [
    { name: "JavaScript"},
    { name: "Python"},
    { name: "Java"},
    { name: "Swift"},
    { name: "C++"},
  
  ],
  Frontend: [
    { name: "React"},
    { name: "HTML"},
    { name: "CSS"},
    { name: "Tailwind"},
    { name: "Angular"},
    { name: "NextJS"}
    
  ],
  Backend: [
    { name: "Node.js"},
    { name: "MySQL"},
    { name: "Django"},
    { name: "PostgreSQL"},
    { name: "MongoDB"},
    { name: "Postman"},
    { name: "Pinecone"},
    { name: "FastAPI"}
  ],
  
};

