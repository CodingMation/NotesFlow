// src/components/NoteCard.jsx
import { FiEye, FiTrash2 } from "react-icons/fi";

export default function NoteCard({ note, onEdit, onDelete, onView }) {
  return (
    <div className="relative bg-white rounded-lg shadow hover:shadow-lg p-4 w-64 h-48 flex flex-col justify-between group">
      <div>
        <h3 className="text-lg font-semibold truncate">{note.title}</h3>
        <p className="text-gray-600 text-sm mt-1 overflow-hidden line-clamp-3">
          {note.content}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(note.createdAt).toLocaleDateString()}
      </p>

      {/* Hover Icons */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onView(note)}
          className="text-white hover:text-blue-400"
        >
          <FiEye size={20} />
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-white hover:text-red-400"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
}
