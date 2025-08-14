import React from 'react';
import Navbar from '../components/Navbar';
import { FiGithub, FiGlobe, FiCode, FiLock, FiCloud, FiEdit } from 'react-icons/fi';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* // In your Navbar component */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                        About <span className="text-indigo-600">NotesFlow</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your free note-taking solution for organized thoughts and ideas
                    </p>
                </div>

                {/* Version Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12 border border-gray-200">
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                                <FiCode className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-medium w-24">Version:</span>
                                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                                        v{__APP_VERSION__}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-medium w-24">License:</span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        MIT
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-medium w-24">Release:</span>
                                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                                        2025
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-medium w-24">Hosting:</span>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Free Tier
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-medium w-24">Source:</span>
                                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Open
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 font-medium w-24">Year:</span>
                                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {new Date().getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Features Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <FiEdit className="h-8 w-8" />, title: "Rich Editing", desc: "Simple yet powerful text editor" },
                            { icon: <FiLock className="h-8 w-8" />, title: "Secure", desc: "Basic authentication protection" },
                            { icon: <FiCloud className="h-8 w-8" />, title: "Cloud Sync", desc: "Free cloud storage for your notes" },
                            { icon: <FiGlobe className="h-8 w-8" />, title: "Accessible", desc: "Works on any modern browser" },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center mb-6">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                                <FiGlobe className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiGithub className="text-gray-500 mr-3" />
                                <a
                                    href="https://github.com/CodingMation/NotesFlow"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    GitHub Repository (Report Issues Here)
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FiGlobe className="text-gray-500 mr-3" />
                                <a
                                    href="https://notes-flow.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    NotesFlow
                                </a>
                            </div>
                        </div>
                        <div className="mt-6 text-sm text-gray-500">
                            <p>This is a free project maintained in my spare time.</p>
                            <p className="mt-2">For support, please use GitHub issues or visit our website.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-100 py-4 px-4 border-t border-gray-200">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center text-sm text-gray-600">
                    <div>
                        © {new Date().getFullYear()} NotesFlow - All rights reserved
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default About;