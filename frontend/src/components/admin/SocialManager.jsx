import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader,
  Link as LinkIcon,
} from "lucide-react";
import { API_URL } from "../../config";

const SocialManager = () => {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSocial, setCurrentSocial] = useState({
    platform: "",
    url: "",
    icon: "fas fa-globe",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSocials();
  }, []);

  const fetchSocials = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/socials`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setSocials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentSocial({ platform: "", url: "", icon: "fas fa-globe" });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this social link?")) {
      try {
        await axios.delete(`${API_URL}/api/socials/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        fetchSocials();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (social) => {
    setCurrentSocial(social);
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      };
      if (currentSocial._id) {
        await axios.put(
          `${API_URL}/api/socials/${currentSocial._id}`,
          currentSocial,
          { headers },
        );
      } else {
        await axios.post(`${API_URL}/api/socials`, currentSocial, { headers });
      }
      setIsEditing(false);
      fetchSocials();
    } catch (err) {
      console.error(err);
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-500">
          Manage your social media links for the footer
        </p>
        <button
          onClick={handleAddNew}
          className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Platform
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                URL
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">
                Icon
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {socials.map((social) => (
              <tr
                key={social._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-800">
                  {social.platform}
                </td>
                <td className="px-6 py-4 text-sm text-blue-500 hover:underline max-w-xs truncate">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.url}
                  </a>
                </td>
                <td className="px-6 py-4 text-center">
                  <i className={`${social.icon} text-slate-500 text-xl`}></i>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(social)}
                      className="text-blue-500 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(social._id)}
                      className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {socials.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-slate-500">
                  No social links found. Add one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => !saving && setIsEditing(false)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                {currentSocial._id ? "Edit Social Link" : "Add New Social Link"}
              </h3>
              <button
                onClick={() => !saving && setIsEditing(false)}
                className="text-slate-400 hover:bg-slate-200 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <form id="socialForm" onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={currentSocial.platform}
                    onChange={(e) =>
                      setCurrentSocial({
                        ...currentSocial,
                        platform: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                    placeholder="e.g. Instagram"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Profile URL
                  </label>
                  <input
                    type="url"
                    value={currentSocial.url}
                    onChange={(e) =>
                      setCurrentSocial({
                        ...currentSocial,
                        url: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                    placeholder="https://instagram.com/yourprofile"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Icon Class (FontAwesome)
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={currentSocial.icon}
                      onChange={(e) =>
                        setCurrentSocial({
                          ...currentSocial,
                          icon: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="e.g. fab fa-instagram"
                      required
                    />
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200">
                      <i
                        className={`${currentSocial.icon} text-xl text-slate-600`}
                      ></i>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Common icons: fab fa-instagram, fab fa-facebook-f, fab
                    fa-linkedin-in, fab fa-twitter, fab fa-github, fas fa-globe
                  </p>
                </div>
              </form>
            </div>

            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 text-slate-600 hover:bg-slate-200 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                form="socialForm"
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                {saving ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialManager;
