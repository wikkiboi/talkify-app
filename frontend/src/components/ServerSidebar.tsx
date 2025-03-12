import React from "react";

const ServerSidebar = ({ server }: { server: any }) => {
  return (
    <div className="w-16 bg-gray-800 h-screen p-2 flex flex-col space-y-4">
      <div className="text-white text-center">
        {server.name[0]} {/* Display first letter of server name as icon */}
      </div>
      <div className="text-white text-center">{server.name}</div> {/* Display server name */}
    </div>
  );
};

export default ServerSidebar;
