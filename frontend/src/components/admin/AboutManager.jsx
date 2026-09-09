import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Save, Loader, Edit2, X } from "lucide-react";

const AboutManager = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    objective: "",
    desc: "",
    languages: "",
    hobbies: "",
    profileImage: "",
    resumeUrl: "",
    stats: { experience: "0", projects: "0", clients: "0" },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/about`, { headers });
      if (res.data && res.data.name) {
        setData(res.data);
        setFormData({
          ...res.data,
          languages: res.data.languages?.join(", ") || "",
          hobbies: res.data.hobbies?.join(", ") || "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("stats.")) {
      const statName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        stats: { ...prev.stats, [statName]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    setUploadingImage(true);
    try {
      const res = await axios.post(`${API_URL}/api/upload`, formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, profileImage: res.data.url }));
      }
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    setUploadingResume(true);
    try {
      const res = await axios.post(`${API_URL}/api/upload`, formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, resumeUrl: res.data.url }));
      }
    } catch (err) {
      console.error("Resume upload failed", err);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        languages: formData.languages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        hobbies: formData.hobbies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await axios.put(`${API_URL}/api/about`, dataToSave, { headers });
      setIsEditing(false);
      fetchData();
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
          Your profile information and statistics
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Edit2 size={18} /> Edit
        </button>
      </div>

      {/* DISPLAY TABLE / CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <tbody className="divide-y divide-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50">
                Profile Photo
              </th>
              <td className="px-6 py-4">
                {data?.profileImage ? (
                  <img
                    src={data.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                ) : (
                  <span className="text-slate-400 italic">
                    No image uploaded
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50">
                Resume/CV
              </th>
              <td className="px-6 py-4">
                {data?.resumeUrl ? (
                  <a
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-semibold hover:underline flex items-center gap-2"
                  >
                    View Current CV
                  </a>
                ) : (
                  <span className="text-slate-400 italic">No CV uploaded</span>
                )}
              </td>
            </tr>
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50 w-1/4">
                Full Name
              </th>
              <td className="px-6 py-4 text-slate-800 font-medium">
                {data?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50">
                Current Role
              </th>
              <td className="px-6 py-4 text-slate-800">{data?.role || "-"}</td>
            </tr>
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50">
                Short Desc
              </th>
              <td className="px-6 py-4 text-slate-600">{data?.desc || "-"}</td>
            </tr>
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50">
                Languages
              </th>
              <td className="px-6 py-4 text-slate-800">
                {data?.languages?.join(", ") || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-500 bg-slate-50">
                Stats
              </th>
              <td className="px-6 py-4">
                <div className="flex gap-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-sm font-bold">
                    Exp: {data?.stats?.experience || "0"}+ &nbsp;|&nbsp;
                    Projects: {data?.stats?.projects || "0"}+ &nbsp;|&nbsp;
                    Clients: {data?.stats?.clients || "0"}+
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => !saving && setIsEditing(false)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">
                Edit About & Stats
              </h3>
              <button
                onClick={() => !saving && setIsEditing(false)}
                className="text-slate-400 hover:bg-slate-200 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <form
                id="aboutForm"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Objective
                  </label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                        No img
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                      />
                      {uploadingImage && (
                        <p className="text-xs text-primary mt-2">
                          Uploading...
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resume/CV (PDF/DOC)
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.resumeUrl ? (
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xs font-bold text-center p-2">
                        CV Ready
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs text-center p-2">
                        No CV
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                      />
                      {uploadingResume && (
                        <p className="text-xs text-primary mt-2">Uploading CV...</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Languages (comma separated)
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Hobbies (comma separated)
                    </label>
                    <input
                      type="text"
                      name="hobbies"
                      value={formData.hobbies}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {["experience", "projects", "clients"].map((stat) => (
                      <div key={stat}>
                        <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">
                          {stat}
                        </label>
                        <input
                          type="text"
                          name={`stats.${stat}`}
                          value={formData.stats[stat]}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-slate-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 text-slate-600 hover:bg-slate-200 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                form="aboutForm"
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
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

export default AboutManager;
