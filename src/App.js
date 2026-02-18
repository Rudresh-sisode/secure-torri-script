import React, { useEffect } from 'react';
import './App.css';
import Profile from './components/Profile';

function App() {
  useEffect(() => {
    // Load Vapi SDK script dynamically
    const loadVapiScript = () => {
      const assistant = process.env.REACT_APP_VAPI_ASSISTANT_ID;
      const apiKey = process.env.REACT_APP_VAPI_API_KEY;
      const buttonConfig = {}; // Modify this as required

      if (!assistant || !apiKey) {
        console.error('Vapi Assistant ID or API Key is missing. Please check your .env file.');
        return;
      }

      // Check if script is already loaded
      if (window.vapiSDK) {
        initializeVapi(assistant, apiKey, buttonConfig);
        return;
      }

      // Create and load the script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
      script.defer = true;
      script.async = true;
      script.onload = () => {
        initializeVapi(assistant, apiKey, buttonConfig);
      };
      document.body.appendChild(script);
    };

    const initializeVapi = (assistant, apiKey, buttonConfig) => {
      if (window.vapiSDK) {
        window.vapiInstance = window.vapiSDK.run({
          apiKey: apiKey,
          assistant: assistant,
          config: buttonConfig,
        });
      }
    };

    loadVapiScript();

    // Cleanup function
    return () => {
      if (window.vapiInstance) {
        // Clean up Vapi instance if needed
        window.vapiInstance = null;
      }
    };
  }, []);

  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default App;
