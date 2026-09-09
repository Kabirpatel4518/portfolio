import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutManager from "./AboutManager";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import ExperienceManager from "./ExperienceManager";
import ContactManager from "./ContactManager";
import ProfileManager from "./ProfileManager";
import {
  LayoutDashboard,
  LogOut,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  Mail,
  Bell,
  ChevronDown,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutManager />;
      case "projects":
        return <ProjectsManager />;
      case "skills":
        return <SkillsManager />;
      case "experience":
        return <ExperienceManager />;
      case "contacts":
        return <ContactManager />;
      case "profile":
        return <ProfileManager />;
      default:
        return <AboutManager />;
    }
  };

  const menuItems = [
    { id: "about", label: "About & Stats", icon: <User size={20} /> },
    { id: "projects", label: "Projects", icon: <FolderKanban size={20} /> },
    { id: "skills", label: "Skills", icon: <Wrench size={20} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={20} /> },
    { id: "contacts", label: "Inbox", icon: <Mail size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-surface overflow-hidden font-sans">
      {/* Sidebar - Fixed Height & Width */}
      <div className="w-72 h-full bg-white border-r border-slate-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              Admin<span className="text-primary">Portal</span>
            </span>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Management
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25 translate-x-1"
                  : "text-slate-500 hover:bg-slate-50 hover:text-primary hover:translate-x-1"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f8f9fc]">
        {/* Topbar */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 z-10 sticky top-0">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 capitalize flex items-center gap-3">
              {menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex bg-white border border-slate-200 hover:border-primary/30 hover:shadow-sm text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all items-center gap-2 mr-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              View Live
            </a>

            <button
              className="relative p-1.5 text-slate-500 hover:text-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell size={22} strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 ml-2 p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <User size={20} strokeWidth={2} />
                </div>
                <div className="hidden sm:flex flex-col justify-center text-left">
                  <span className="text-sm font-bold text-slate-800 leading-tight">
                    Admin User
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">
                    Super Admin
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-20 animate-in slide-in-from-top-2 fade-in duration-200">
                    <button
                      onClick={() => {
                        setActiveTab("profile");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User size={16} strokeWidth={2.5} />
                      My Profile
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} strokeWidth={2.5} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-10 relative flex flex-col">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>

          <div className="w-full flex-1">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.04)] min-h-[calc(100vh-16rem)]">
              {renderContent()}
            </div>
          </div>

          {/* Admin Footer */}
          <footer className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-sm text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Kabir Patel. All rights
              reserved.
            </p>
            <p>Portfolio Admin Portal v1.0</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
