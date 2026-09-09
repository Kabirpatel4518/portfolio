import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Plus, Edit2, Trash2, X, Save, Loader } from "lucide-react";

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/experience`, { headers });
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this experience record?")
    ) {
      try {
        await axios.delete(`${API_URL}/api/experience/${id}`, { headers });
        fetchExperiences();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (exp) => {
    setCurrentExp(exp);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentExp({ role: "", company: "", desc: "" });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentExp._id) {
        await axios.put(
          `${API_URL}/api/experience/${currentExp._id}`,
          currentExp,
          { headers },
        );
      } else {
        await axios.post(`${API_URL}/api/experience`, currentExp, { headers });
      }
      setIsEditing(false);
      fetchExperiences();
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
          Manage your work experience and education
        </p>
        <button
          onClick={handleAddNew}
          className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* TABLE VIEW */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Role / Degree
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Company / Institution
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Description
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {experiences.map((exp) => (
              <tr key={exp._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">
                  {exp.role}
                </td>
                <td className="px-6 py-4 text-primary font-medium">
                  {exp.company}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                  {exp.desc}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="text-blue-500 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-slate-500">
                  No experience records found. Add one!
                </td>
              </tr>
            )}
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

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                {currentExp._id ? "Edit Experience" : "Add New Experience"}
              </h3>
              <button
                onClick={() => !saving && setIsEditing(false)}
                className="text-slate-400 hover:bg-slate-200 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <form id="expForm" onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Role / Degree
                    </label>
                    <input
                      type="text"
                      value={currentExp.role}
                      onChange={(e) =>
                        setCurrentExp({ ...currentExp, role: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="e.g. Web Developer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company (with duration)
                    </label>
                    <input
                      type="text"
                      value={currentExp.company}
                      onChange={(e) =>
                        setCurrentExp({
                          ...currentExp,
                          company: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="e.g. Google | 2021 - Present"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={currentExp.desc}
                    onChange={(e) =>
                      setCurrentExp({ ...currentExp, desc: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                    required
                  />
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
                form="expForm"
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

export default ExperienceManager;
