import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export  const teamdata= [
  {
    name: "Alex Johnson",
    position: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech innovation and business strategy.",
    image: "/images/team/alex.jpg",
    socials: [
      { name: "Twitter", url: "#", icon: FaTwitter },
      { name: "LinkedIn", url: "#", icon: FaLinkedin }
    ]
  },
  {
    name: "Sarah Chen",
    position: "CTO",
    bio: "Engineering expert specializing in real-time communication systems.",
    image: "/images/team/sarah.jpg",
    socials: [
      { name: "Twitter", url: "#", icon: FaTwitter },
      { name: "GitHub", url: "#", icon: FaGithub }
    ]
  },
  {
    name: "Jamal Williams",
    position: "Lead Designer",
    bio: "Creates intuitive user experiences that delight our customers.",
    image: "/images/team/jamal.jpg",
    socials: [
      { name: "Twitter", url: "#", icon: FaTwitter },
      { name: "Dribbble", url: "#", icon: FaGithub } // Replace with actual Dribbble icon if available
    ]
  }
];