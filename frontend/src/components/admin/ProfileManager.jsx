import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Save, Loader, User, Lock, Mail, Eye, EyeOff } from "lucide-react";

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/profile`, { headers });
      setProfile({
        ...res.data,
        password: "", // Keep password empty initially for security
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await axios.put(`${API_URL}/api/auth/profile`, profile, { headers });
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);

      // Update local storage if username changes might invalidate token?
      // For now, simple update is fine.
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
          <p className="text-slate-500 mt-1">
            Manage your admin account settings
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center text-red-500 mb-4 shadow-inner">
            <User size={40} strokeWidth={2} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {profile.username || "Admin"}
          </h3>
          <p className="text-sm font-medium text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full mt-2">
            Administrator
          </p>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User size={16} className="text-slate-400" />
              Username
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Mail size={16} className="text-slate-400" />
              Email ID
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Lock size={16} className="text-slate-400" />
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors pr-10"
                placeholder="Leave blank to keep current password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            <span
              className={`text-sm font-medium ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
            >
              {message}
            </span>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            >
              {saving ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManager;
