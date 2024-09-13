import React from 'react';
import 'tailwindcss/tailwind.css';

export default function Comment({ name, date, rating, comment }) {
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div>
          <div className="text-sm font-bold">{name} ({date})</div>
          <div className="text-sm text-yellow-500">{'★'.repeat(rating)}</div>
          <div className="text-sm text-gray-700">{comment}</div>
        </div>
      </div>
    );
  }