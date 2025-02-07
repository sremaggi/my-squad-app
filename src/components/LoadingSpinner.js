"use client";
import React from "react";

const LoadingSpinner = ({ size = 40 }) => {
    return (
        <div className="flex justify-center items-center">
            <div
                className="border-t-transparent border-solid animate-spin rounded-full border-blue-500"
                style={{
                    borderWidth: `${size / 10}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;