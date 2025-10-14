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
      photo: "/assets/surfshack.png",
      previewImage: "/assets/surfshack.png"
    },
    {
      title: "Black Rock Social Club",
      subtitle: "Full-Stack Web Experience",
      status: "completed",
      category: "Full-Stack",
      description:
        "A fully custom full-stack website built for a private social club. Optimized for SEO and designed for performance, the site features a client-editable event calendar powered by Sanity CMS and seamless Google Sheets integration to capture contact and membership form submissions for the team.",
      link: "https://www.blackrocksocial.com/",
      technologies: [
        { name: "Next.js", icon: "RiNextjsFill" },
        { name: "Tailwind", icon: "RiTailwindCssFill" },
        { name: "Vercel", icon: "IoLogoVercel" },
        { name: "Sanity", icon: "SiSanity" },
        { name: "Google Sheets API", icon: "SiGoogle" }
      ],
      functions: [
        "Full-stack architecture with dynamic content via Sanity.io",
        "Client-editable calendar and menu management",
        "Automated Google Sheets integration for lead tracking",
        "Search engine optimization and responsive design",
        "Deployed and hosted on Vercel for high performance"
      ],
      photo: "/assets/blackrock.jpg",
      previewImage: "/assets/blackrock.jpg"
    },
    
  
    {
      title: "Glazier Children's Museum",
      previewImage: "/assets/image.png",
      photo: "/assets/image.png",
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
      ],
      
    },
  
    
  
    {
      title: "Annie Rome Client Site",
      subtitle: "Interactive personal site built with React and Tailwind",
      category: "Personal",
      status: "completed",
      photo: "/assets/logo_circle.png",
      previewImage: "/assets/logo_circle.png",
      link: "https://www.annierome.dev/",
      github: "https://github.com/annierome1/portfolio1",
      description:
        "A custom-built portfolio showcasing my full-stack projects, design philosophy, and brand identity. Built with React and styled using Tailwind CSS, the site features smooth animations, interactive project displays, and a refined user experience optimized for performance and SEO.",
      technologies: [
        { name: "React", icon: "FaReact" },
        { name: "Tailwind CSS", icon: "RiTailwindCssFill" },
        { name: "Vercel", icon: "IoLogoVercel" }
      ],
      functions: [
        "Dynamic, scroll-based navigation between About, Projects, and Contact sections",
        "Animated transitions and responsive layout across all devices",
        "Showcase of live client builds and personal projects",
        "Custom styling and branding consistent with Annie Rome’s identity",
        "Deployed with Vercel for speed, scalability, and SEO optimization"
      ]
    },
    
  
    {
      title: "ChatBot",
      subtitle: "Context-aware AI chatbot with Pinecone, OpenAI, and AWS automation",
      category: "Personal",
      status: "completed",
      photo: "/assets/chat.png",
      previewImage: "/assets/chat.png",
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
        photo: "/assets/masda_logo_color_wt.png",
        previewImage: "/assets/masda_logo_color_wt.png"
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
      photo:
        "/assets/escape.jpg",
      previewImage: "/assets/escape.jpg",
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
      embedUrl: "/assets/utampaapp.mov",
      previewImage: "/assets/spartan.png",
    },
    {
      title: "A Way Home",
      subtitle: "VR experience teaching UN child rights through storytelling",
      status: "completed",
      category: "3D Development",
      description: "An immersive VR game teaching UN child rights via narrative-driven gameplay.",
      link: "https://www.suzanneensmann.com/purpose2day-a-way-home.html",
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
  Tools: [
    { name: "Git"},
    { name: "Docker"},
    { name: "AWS"},
    { name: "Azure"},
    { name: "Figma"},

  ]
  
};

