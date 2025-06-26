import React from 'react';

const NavBar = () => {
    return (
        <header className="px-6 py-4 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">α</span>
                    </div>
                    <span className="font-bold text-xl text-gray-900">AlphaGrade</span>
                </div>
                {/* <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Start Free Trial
                </button> */}
            </div>
        </header>
    );
};

export default NavBar;