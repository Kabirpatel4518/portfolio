import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Trash2, Search, Mail, Calendar, X, Inbox } from 'lucide-react';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  
  const token = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/contacts`, { headers });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${API_URL}/api/contacts/${id}`, { headers });
        if (selectedContact?._id === id) setSelectedContact(null);
        fetchContacts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOpenModal = async (contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      try {
        await axios.put(`${API_URL}/api/contacts/${contact._id}`, {}, { headers });
        setContacts(contacts.map(c => c._id === contact._id ? { ...c, isRead: true } : c));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-8"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Inbox</h2>
          <p className="text-slate-500 text-sm">Messages from your contact form</p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Inbox size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm">When someone contacts you, it will appear here.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sender</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Message Snippet</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contacts.map((contact) => (
                <tr 
                  key={contact._id} 
                  onClick={() => handleOpenModal(contact)}
                  className={`hover:bg-slate-50 cursor-pointer transition-colors ${!contact.isRead ? 'bg-primary/5 font-semibold' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-sm">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-slate-800">{contact.name}</div>
                        <div className="text-xs text-slate-500 font-normal">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                    {contact.message}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-normal">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => handleDelete(contact._id, e)}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedContact(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{selectedContact.name}</h3>
                <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline flex items-center gap-2 text-sm font-medium">
                  <Mail size={14} /> {selectedContact.email}
                </a>
              </div>
              <button 
                onClick={() => setSelectedContact(null)}
                className="bg-white p-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <Calendar size={14} />
                {new Date(selectedContact.createdAt).toLocaleString()}
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
              <button 
                onClick={(e) => handleDelete(selectedContact._id, e)}
                className="px-6 py-2.5 rounded-xl font-semibold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-colors"
              >
                Delete Message
              </button>
              <a 
                href={`mailto:${selectedContact.email}`}
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;
