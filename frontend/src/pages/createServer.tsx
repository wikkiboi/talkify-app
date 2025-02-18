import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateServer = () => {
    const [serverName, setServerName] = useState("");
    const [serverImage, setServerImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Send data to backend (replace this with an API call)
        console.log("Creating server:", { serverName, serverImage });

        // Redirect to the server page (mock ID for now)
        navigate(`/server/123`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">Create a Server</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-80">
                <label className="block mb-2">Server Name</label>
                <input 
                    type="text" 
                    value={serverName} 
                    onChange={(e) => setServerName(e.target.value)} 
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    required
                />

                <label className="block mt-4 mb-2">Server Image</label>
                <input 
                    type="file" 
                    onChange={(e) => setServerImage(e.target.files?.[0] || null)} 
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />

                <button 
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Create Server
                </button>
            </form>
        </div>
    );
};

export default CreateServer;
