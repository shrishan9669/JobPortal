import React from 'react';

const BarLoader = ({ width = 'w-full', height = 'h-2', color = 'bg-green-500' }) => {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded-full overflow-hidden`}>
      <div
        className={`${height} ${color} rounded-full animate-progress`}
        style={{
          width: '100%',
          transformOrigin: '0% 50%',
          animation: 'progress 1s ease-in-out infinite'
        }}
      ></div>
    </div>
  );
};

import { LoaderIcon } from "lucide-react"
import { cn } from '../lib/utils';
export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}



export default BarLoader;
