import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Plus, Edit2, Trash2, X, Save, Loader } from "lucide-react";

const EducationManager = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/education`, { headers });
      setEducations(res.data);
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
        await axios.delete(`${API_URL}/api/education/${id}`, { headers });
        fetchEducations();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (edu) => {
    setCurrentEdu(edu);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentEdu({ degree: "", institution: "", desc: "" });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentEdu._id) {
        await axios.put(
          `${API_URL}/api/education/${currentEdu._id}`,
          currentEdu,
          { headers },
        );
      } else {
        await axios.post(`${API_URL}/api/education`, currentEdu, { headers });
      }
      setIsEditing(false);
      fetchEducations();
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
                Degree / Course
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Institution
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
            {educations.map((edu) => (
              <tr key={edu._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">
                  {edu.degree}
                </td>
                <td className="px-6 py-4 text-primary font-medium">
                  {edu.institution}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                  {edu.desc}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="text-blue-500 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(edu._id)}
                      className="text-red-500 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {educations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-slate-500">
                  No education records found. Add one!
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
                {currentEdu._id ? "Edit Education" : "Add New Education"}
              </h3>
              <button
                onClick={() => !saving && setIsEditing(false)}
                className="text-slate-400 hover:bg-slate-200 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <form id="eduForm" onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Degree / Course
                    </label>
                    <input
                      type="text"
                      value={currentEdu.degree}
                      onChange={(e) =>
                        setCurrentEdu({ ...currentEdu, degree: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="e.g. Web Developer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Institution / College
                    </label>
                    <input
                      type="text"
                      value={currentEdu.institution}
                      onChange={(e) =>
                        setCurrentEdu({
                          ...currentEdu,
                          institution: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="e.g. Gujarat University"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Year / Duration
                    </label>
                    <input
                      type="text"
                      value={currentEdu.year || ""}
                      onChange={(e) =>
                        setCurrentEdu({
                          ...currentEdu,
                          year: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-primary focus:bg-white transition-colors"
                      placeholder="e.g. 2021 - 2024"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={currentEdu.desc}
                    onChange={(e) =>
                      setCurrentEdu({ ...currentEdu, desc: e.target.value })
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
                form="eduForm"
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

export default EducationManager;
