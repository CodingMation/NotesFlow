import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext';
import notesflow from '../assets/notesflow.svg';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const { logout } = useAuth();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const handleLogout = async () => await logout();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        // Add event listener when dropdown is open
        if (profileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileMenuOpen]);

    return (
        <>
            <nav className="bg-blue-600 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-2">
                            <img
                                src={notesflow}
                                alt="notesflow Logo"
                                className="w-10"
                            />


                            <h1 className="text-xl font-bold text-white">NotesFlow</h1>
                        </div>

                        <div className="flex items-center">
                            <button
                                onClick={() => {
                                    setProfileMenuOpen(!profileMenuOpen);
                                }}
                                className="px-3 py-2 rounded-md font-medium flex items-center gap-2 text-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                {JSON.parse(localStorage.getItem("user"))?.username || "Default"}
                                <svg
                                    className={`w-4 h-4 transition-transform ${profileMenuOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {profileMenuOpen && (
                                <ul ref={dropdownRef} className="absolute right-[6%] mt-[25vh] w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                                    <li>
                                        <Link
                                            to="/"
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/about"
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 bg-[#e7c400] hover:bg-gray-100 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;