import React from 'react';

export default function Card({ children, className = '', padding }) {
    return (
        <div
            className={`bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-lg ${className} p-${padding}`}
        >
            {children}
        </div>
    );
}