import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load route components for better performance
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));

const PublicLayout = ({ data }) => {
  return (
    <div className="relative flex flex-col w-full min-h-screen bg-white overflow-hidden selection:bg-primary/30">
      <Navbar data={data} />
      <main className="pt-20 flex-grow w-full">
        <Outlet />
      </main>
      <Footer data={data} />
    </div>
  );
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch data from Node.js backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/data`);
        setData(response.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-background">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-slate-50 p-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-white border border-red-100 rounded-3xl p-10 max-w-lg text-center shadow-2xl shadow-red-500/10 relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 border border-red-100 shadow-sm">
            <span className="text-red-500 text-4xl -rotate-3">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Data Not Found
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">
            Could not connect to the backend server. If you are testing locally,
            make sure{" "}
            <code className="bg-slate-100 text-red-600 px-2 py-1 rounded-md font-medium text-sm border border-slate-200">
              isLive
            </code>{" "}
            is set to{" "}
            <code className="bg-slate-100 text-red-600 px-2 py-1 rounded-md font-medium text-sm border border-slate-200">
              false
            </code>{" "}
            in your{" "}
            <code className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-medium text-sm border border-slate-200">
              config.js
            </code>{" "}
            file!
          </p>
          <div className="text-sm font-mono text-red-600 bg-red-50/80 p-4 rounded-2xl border border-red-100 break-all">
            <span className="block text-xs text-red-400 font-sans uppercase tracking-wider mb-1 font-bold">
              Attempted URL
            </span>
            {API_URL}/api/data
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen w-full bg-background">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route element={<PublicLayout data={data} />}>
            <Route path="/" element={<Home data={data} />} />
            <Route
              path="/about"
              element={<About data={data?.about} stats={data?.stats} />}
            />
            <Route path="/skills" element={<Skills skills={data?.skills} />} />
            <Route
              path="/projects"
              element={<Projects projects={data?.projects} />}
            />
            <Route
              path="/experience"
              element={
                <Experience experience={data?.experience} data={data?.about} />
              }
            />
            <Route path="/contact" element={<Contact data={data?.about} />} />
          </Route>

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
