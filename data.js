// Edit this file to customize your RPG resume content
export const data = {
  name: "Chris Arruda",
  level: 7,
  className: "Information Systems",
  hp: 100,
  mp: 20,
  bio: "IS student breaking into backend and data work. Comfortable with Python and SQL. Building projects that automate boring tasks and show real value.",
  contact: {
    email: "0christianarruda@gmail.com",
    href: "mailto:0christianarruda@gmail.com?subject=Project%20inquiry%20from%20your%20site&body=Hi%20Chris,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20potential%20project.%0D%0A%0D%0AProject%20Details:%0D%0A-%20Timeline:%0D%0A-%20Budget:%0D%0A-%20Description:%0D%0A%0D%0ALooking%20forward%20to%20hearing%20from%20you!"
  },
  stats: [
    { label: "Python", value: 70 },
    { label: "SQL", value: 45 },
    { label: "Git", value: 45 },
    { label: "JavaScript", value: 35 },
    { label: "Problem Solving", value: 80 },
    { label: "Communication", value: 85 }
  ],
  inventory: ["Python", "SQL", "Pandas", "VS Code", "Git", "Excel", "Discord.py"],
  quests: [
    {
      title: "Discord Bot: Team Schedules",
      difficulty: "B",
      summary: "Users register favorite teams. Bot posts upcoming games with server scoped JSON storage.",
      skills: ["Python", "APIs", "JSON", "Discord"],
      link: "#"
    },
    {
      title: "Record Filter Helper",
      difficulty: "A",
      summary: "Improved workflow for filtering county records and summarizing results for reporting.",
      skills: ["Python", "Data Cleaning", "Automation"],
      link: "#"
    },
    {
      title: "RPG Resume Website",
      difficulty: "B",
      summary: "This interactive portfolio built with vanilla HTML CSS JS using data driven config.",
      skills: ["HTML", "CSS", "JS"],
      link: "#"
    }
  ],
  guilds: [
    { name: "InfoCheck Solutions", role: "In House Researcher", dates: "2025", location: "Burbank, CA" },
    { name: "UPS", role: "Supervisor", dates: "2023 - 2024", location: "Los Angeles, CA" },
    { name: "Walmart", role: "Digital Academy Trainer", dates: "2019 - 2022", location: "Los Angeles, CA" }
   
  ],
  skillTree: [
    { name: "Backend Basics", value: 60 },
    { name: "Data Wrangling", value: 75 },
    { name: "Frontend UI", value: 35 },
    { name: "Automation", value: 70 }
  ],
  badges: [
    { name: "Automation Enjoyer" },
    { name: "Team Player" },
    { name: "Fast Learner" },
    { name: "Bug Squisher" }
  ],
  resumePdf: "ChristianArrudaResume.pdf"
};

// Debug: Log important data on load
console.log('Loaded data:', {
  contactEmail: data.contact.email,
  resumePdf: data.resumePdf,
  hasValidEmail: !!data.contact?.email,
  hasValidResume: !!data.resumePdf
});
