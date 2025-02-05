import React from 'react';

export default function Card({ children, className = '' }) {
    return (
        <div
            className={`bg-white shadow-md rounded-lg p-6 ${className}`}
        >
            {children}
        </div>
    );
}