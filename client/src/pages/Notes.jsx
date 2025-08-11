import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import NoteCard from "../components/NoteCard";
import Data from "../utils/Data";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Notes() {

  const { logout } = useAuth();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewNote, setViewNote] = useState(null);

  const navigate = useNavigate();

    useEffect(() => {
      fetchNotes();
    }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes/getnote");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/notes/updatenote/${editingId}`, {
          title,
          content,
        });
        setEditingId(null);
      } else {
        await api.post("/notes/addnote", {
          title,
          content,
        });
      }
      setTitle("");
      setContent("");
      setShowForm(false);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (note) => {
    console.log("Edit:", note);
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    setShowForm(true);
    setViewNote(null);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`);
      await api.delete(`/notes/deletenote/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };  

  const handleLogout = async () => await logout();

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navbar */}
      <nav className="bg-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">NotesFlow</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet. Add your first note!</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onView={(note) => setViewNote(note)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {viewNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-200 rounded-lg w-[auto] shadow-lg relative p-6">
            {/* Title */}
            <h2 className="text-xl font-bold">{viewNote.title}</h2>
            <div className="bg-white w-fit max-h-[80vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setViewNote(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
              {/* Edit button with logo */}
              <button
                onClick={() => handleEdit(viewNote)}
                className="absolute top-4 right-10 text-gray-500 hover:text-yellow-400"
              >
                <FiEdit size={20} />
              </button>

              {/* Scrollable content */}
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed px-10 py-5">
                {viewNote.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg"
      >
        <FiPlus size={24} />
      </button>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-10">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-full">
            <h2 className="text-lg font-medium mb-4">
              {editingId ? "Edit Note" : "Add New Note"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-3"
                required
              />
              <textarea
                placeholder="Content"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-3"
                required
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setTitle("");
                    setContent("");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
