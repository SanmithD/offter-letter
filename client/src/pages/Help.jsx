import { ArrowLeft, Loader, Sparkles } from "lucide-react";
import { useState } from "react";
import { UseAgentStore } from "../store/UseAgentStore";

function Help() {
  const [msg, setMsg] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(''); // Track the current question
  const { getHelp, helpResponse, isLoading } = UseAgentStore();
  
  const handleSubmit = async () => {
    if (msg.trim()) {
      console.log('Asking AI:', msg);
      setCurrentQuestion(msg); // Store the question before clearing
      await getHelp(msg);
      setMsg(''); // Clear input after submission
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleSubmit(); // Only call handleSubmit, don't duplicate the API call
    }
  };

  return (
    <div className="flex flex-col h-screen mx-auto max-w-4xl px-4">
      <div className="py-4 border-b md:hidden">
        <button className="flex items-center gap-2 text-2xl font-medium hover:text-gray-600 transition-colors">
          <ArrowLeft size={24} />
          <span>Helper</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {currentQuestion && (
              <div className="flex justify-end">
                <div className="bg-[#A259FF] text-white rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
                  <p>{currentQuestion}</p>
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg px-4 py-2">
                  <Loader className="animate-spin" size={16} />
                  <span>Thinking...</span>
                </div>
              </div>
            ) : (
              helpResponse && (
                <div className="flex justify-start">
                  <div className=" rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
                    <p>{helpResponse}</p>
                  </div>
                </div>
              )
            )}
            
            {!currentQuestion && !helpResponse && !isLoading && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Ask me anything and I'll help you!</p>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-20 md:bottom-0 lg:bottom-0 border-t p-4">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Get help by AI..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading} 
            />
            <button
              onClick={handleSubmit}
              disabled={!msg.trim() || isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-[#A259FF] font-medium rounded-lg hover:bg-[#9147FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <span>Asking...</span>
                  <Loader className="animate-spin" size={20} />
                </>
              ) : (
                <>
                  <span>Ask</span>
                  <Sparkles size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
