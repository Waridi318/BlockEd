import React, { useState, useEffect } from "react";
import { ArrowRight, Code, Github, ExternalLink, BookOpen, Layout, Terminal, CheckCircle, Star, Clock } from 'lucide-react';

// Custom Shield component since we're not using shadcn
const Shield = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
};

// Define toast interface
interface ToastProps {
  id: string;
  title: string;
  description: string;
}

// Custom toast implementation
const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const toast = ({ title, description }: { title: string; description: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description };
    setToasts((prev) => [...prev, newToast]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };
  
  return { toast, toasts };
};

// Toast container component
interface ToastContainerProps {
  toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg max-w-xs"
        >
          <h4 className="text-white font-medium">{toast.title}</h4>
          <p className="text-gray-300 text-sm">{toast.description}</p>
        </div>
      ))}
    </div>
  );
};

interface CodeExampleProps {
  title: string;
  language: string;
  description: string;
  code: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ title, language, description, code }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      <div className="px-4 py-3 bg-gray-800 flex justify-between items-center">
        <div className="font-mono text-sm text-gray-300">{title} <span className="text-blue-400">{language}</span></div>
        <button className="text-gray-400 hover:text-white">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <pre className="bg-gray-950 p-4 rounded-md overflow-x-auto">
          <code className="text-sm font-mono text-green-400 whitespace-pre-wrap">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link, icon }) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-900 rounded-lg border border-gray-800 p-5 hover:border-blue-500 transition-all duration-300"
    >
      <div className="flex items-start">
        <div className="mr-4 mt-1 p-2 bg-blue-900/30 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white flex items-center">
            {title}
            <ExternalLink className="w-3 h-3 ml-2 text-gray-500" />
          </h3>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </a>
  );
};

// Define project interface
interface ProjectProps {
  title: string;
  difficulty: string;
  description: string;
  skills: string[];
  timeEstimate: string;
}

// Define course interface
interface CourseProps {
  title: string;
  provider: string;
  level: string;
  duration: string;
  link: string;
  rating: number;
}

// Define tool interface
interface ToolProps {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const DevelopersPage: React.FC = () => {
  // Using a custom navigate function since we're not using React Router
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  const [activeTab, setActiveTab] = useState("overview");
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [ocid, setOcid] = useState("");
  const { toast, toasts } = useToast();
  
  useEffect(() => {
    // Generate random OCID for tracking
    const generateRandomOcid = () => {
      const characters = "0123456789abcdef";
      let result = "0x";
      for (let i = 0; i < 40; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setOcid(result);
    };
    
    generateRandomOcid();
  }, []);
  
  const connectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setWalletConnected(true);
      setIsConnecting(false);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected to EduChain.",
      });
    }, 1500);
  };
  
  const disconnectWallet = () => {
    setWalletConnected(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected from EduChain.",
    });
  };
  
  const solidity101Code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint private storedData;
    
    function set(uint x) public {
        storedData = x;
    }
    
    function get() public view returns (uint) {
        return storedData;
    }
}`;
  
  const erc20Code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}`;
  
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "code-examples", label: "Code Examples" },
    { id: "resources", label: "Resources" },
    { id: "projects", label: "Projects" },
  ];

  // Define tools data
  const tools: ToolProps[] = [
    {
      name: "Solidity",
      description: "The most popular language for writing smart contracts",
      icon: <Code className="w-5 h-5 text-yellow-400" />,
    },
    {
      name: "Hardhat",
      description: "Development environment for Ethereum software",
      icon: <Terminal className="w-5 h-5 text-orange-400" />,
    },
    {
      name: "Web3.js / ethers.js",
      description: "Libraries for interacting with the Ethereum blockchain",
      icon: <Layout className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "EduChain SDK",
      description: "Tools for building on the EduChain ecosystem",
      icon: <Shield />,
    },
  ];

  // Define courses data
  const courses: CourseProps[] = [
    {
      title: "Blockchain Developer Bootcamp",
      provider: "EduChain Academy",
      level: "Beginner to Intermediate",
      duration: "8 weeks",
      link: "/courses/blockchain-bootcamp",
      rating: 4.9,
    },
    {
      title: "Advanced Smart Contract Development",
      provider: "EduChain Academy",
      level: "Intermediate to Advanced",
      duration: "6 weeks",
      link: "/courses/advanced-smart-contracts",
      rating: 4.8,
    },
    {
      title: "Web3 Frontend Development",
      provider: "EduChain Academy",
      level: "Intermediate",
      duration: "4 weeks",
      link: "/courses/web3-frontend",
      rating: 4.7,
    },
  ];

  // Define projects data
  const projects: ProjectProps[] = [
    {
      title: "Build a Decentralized Exchange (DEX)",
      difficulty: "Advanced",
      description: "Create a platform that allows users to swap tokens without a trusted third party.",
      skills: ["Solidity", "Web3.js", "React", "UniswapV2 Protocol"],
      timeEstimate: "4-6 weeks",
    },
    {
      title: "NFT Marketplace",
      difficulty: "Intermediate",
      description: "Develop a marketplace where users can mint, buy, and sell NFTs.",
      skills: ["ERC-721", "IPFS", "Smart Contracts", "Frontend Development"],
      timeEstimate: "3-4 weeks",
    },
    {
      title: "Blockchain Voting System",
      difficulty: "Intermediate",
      description: "Create a secure, transparent voting system using blockchain technology.",
      skills: ["Solidity", "Access Control", "Frontend Development"],
      timeEstimate: "2-3 weeks",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900 to-gray-900 pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <a href="/" className="inline-flex items-center text-blue-300 mb-6 group">
            <ArrowRight className="w-5 h-5 mr-2 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </a>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Blockchain Development
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Learn to build decentralized applications, smart contracts, and contribute to the Web3 ecosystem.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <button
                onClick={walletConnected ? disconnectWallet : connectWallet}
                disabled={isConnecting}
                className={`relative px-6 py-3 group overflow-hidden rounded-lg 
                ${isConnecting ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div
                  className={`absolute inset-0 ${
                    walletConnected ? "bg-red-600/70" : "bg-blue-600/70"
                  } opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <span className="relative z-10 flex items-center">
                  {isConnecting ? (
                    "Connecting..."
                  ) : walletConnected ? (
                    <>Disconnect Wallet</>
                  ) : (
                    <>Connect Wallet</>
                  )}
                </span>
              </button>
            </div>
          </div>
          
          {ocid && (
            <div className="inline-block bg-blue-900/30 border border-blue-700/30 rounded-lg px-4 py-2 text-sm">
              <p className="text-blue-200">Content OCID: <span className="font-mono">{ocid.slice(0, 10)}...{ocid.slice(-6)}</span></p>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto space-x-1 mb-12 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${activeTab === tab.id 
                ? "bg-blue-900/50 text-white" 
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-300">Start Building on Blockchain</h2>
                <p className="text-gray-300 mb-6">
                  Blockchain development involves creating applications that operate on decentralized networks.
                  Whether you're new to blockchain or an experienced developer, this section provides resources
                  to help you build secure and efficient blockchain applications.
                </p>
                <ul className="space-y-3">
                  {[
                    "Learn Solidity programming language",
                    "Understand Smart Contract development",
                    "Build decentralized applications (dApps)",
                    "Explore Web3 libraries and tools",
                    "Join developer communities",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-white">Developer Toolkit</h3>
                <div className="space-y-4">
                  {tools.map((tool, index) => (
                    <div key={index} className="flex items-start py-2 border-b border-gray-800 last:border-b-0">
                      <div className="mr-3 p-2 bg-gray-800 rounded">{tool.icon}</div>
                      <div>
                        <h4 className="font-medium text-white">{tool.name}</h4>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-900/30">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <Github className="w-16 h-16 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-white">Join Our Developer Community</h3>
                  <p className="text-gray-300 mb-4">
                    Collaborate with other blockchain developers, share your projects, and get help when you need it.
                  </p>
                  <a 
                    href="https://github.com/educhain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "code-examples" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Blockchain Code Examples</h2>
              <p className="text-gray-300 mb-6">
                Explore these code examples to understand how to write smart contracts and interact with the blockchain.
                Each example includes explanations and best practices to follow.
              </p>
            </div>
            
            <div className="space-y-8">
              <CodeExample
                title="Simple Storage Contract"
                language="Solidity"
                description="A basic smart contract that demonstrates how to store and retrieve data on the blockchain."
                code={solidity101Code}
              />
              
              <CodeExample
                title="ERC-20 Token Contract"
                language="Solidity"
                description="Create your own fungible token on Ethereum using the ERC-20 standard."
                code={erc20Code}
              />
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4">Using Web3.js to Interact with Smart Contracts</h3>
                <p className="text-gray-400 text-sm mb-4">
                  This JavaScript example shows how to connect to Ethereum and interact with your deployed smart contracts.
                </p>
                <pre className="bg-gray-950 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm font-mono text-blue-400 whitespace-pre-wrap">
{`// Connect to the blockchain
const web3 = new Web3(window.ethereum);

// Contract ABI and address
const contractABI = [...]; // Your contract ABI
const contractAddress = "0x..."; // Your contract address

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call a contract function
async function getValue() {
  try {
    const value = await contract.methods.get().call();
    console.log("Stored value:", value);
    return value;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Send a transaction to the contract
async function setValue(newValue) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const result = await contract.methods.set(newValue).send({
      from: accounts[0]
    });
    console.log("Transaction result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "resources" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Learning Resources</h2>
              <p className="text-gray-300 mb-6">
                Explore these curated resources to deepen your blockchain development knowledge and skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                title="Solidity Documentation"
                description="Official documentation for the Solidity programming language."
                link="https://docs.soliditylang.org/"
                icon={<BookOpen className="w-5 h-5 text-blue-400" />}
              />
              
              <ResourceCard
                title="Ethereum Developer Portal"
                description="Comprehensive resources for building on Ethereum."
                link="https://ethereum.org/developers/"
                icon={<Layout className="w-5 h-5 text-blue-400" />}
              />
              
              <ResourceCard
                title="CryptoZombies"
                description="Learn to code blockchain DApps by building simple games."
                link="https://cryptozombies.io/"
                icon={<Terminal className="w-5 h-5 text-blue-400" />}
              />
              
              <ResourceCard
                title="OpenZeppelin Contracts"
                description="Library of secure, reusable smart contracts."
                link="https://openzeppelin.com/contracts/"
                icon={<Shield />}
              />
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-blue-300">Recommended Courses</h3>
              
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg border border-gray-800 p-5 transition-all duration-300 hover:border-blue-500">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-white">{course.title}</h4>
                        <p className="text-gray-400 text-sm">{course.provider}</p>
                        <div className="flex flex-wrap mt-2 text-sm">
                          <span className="bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded mr-2 mb-2">
                            {course.level}
                          </span>
                          <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded mr-2 mb-2">
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center">
                        <div className="flex items-center mr-4">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-white">{course.rating}</span>
                        </div>
                        <a 
                          href={course.link} 
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          View Course
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "projects" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">Projects & Challenges</h2>
              <p className="text-gray-300 mb-6">
                Apply your skills by working on these blockchain development projects and challenges.
                Build your portfolio and gain real-world experience.
              </p>
            </div>
            
            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 md:mb-0">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        project.difficulty === "Advanced" 
                          ? "bg-red-900/30 text-red-300" 
                          : project.difficulty === "Intermediate"
                            ? "bg-yellow-900/30 text-yellow-300"
                            : "bg-green-900/30 text-green-300"
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, i) => (
                          <span key={i} className="bg-gray-800 text-gray-300 px-2 py-1 text-sm rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {project.timeEstimate}
                      </span>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-900/30 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready for a Challenge?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join our monthly blockchain hackathons and compete with developers from around the world.
                Build innovative solutions and win prizes!
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Join Next Hackathon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopersPage;

