import './Dashboard.css';

import React, { useState } from 'react';
import { Moon, Sun, Search, Tag, Download, Play, Square, Box, Menu, Home, BarChart2, Users, Settings, X, ChevronDown } from 'lucide-react';

const OllamaDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('models');
  const [expandedModel, setExpandedModel] = useState(null);
  
  // Mock data for the wireframe
  const availableModels = [
    { id: 'llama3', name: 'Llama 3', description: 'Meta\'s open LLM', tags: ['8B', '16B'], downloaded: true, running: true },
    { id: 'mistral', name: 'Mistral', description: 'Mistral AI\'s open model', tags: ['7B'], downloaded: true, running: false },
    { id: 'qwen', name: 'Qwen', description: 'Reasoning model of the Qwen series', tags: ['32B'], downloaded: false, running: false },
    { id: 'deepseek', name: 'DeepSeek', description: 'First-generation reasoning model', tags: ['7B', '67B'], downloaded: false, running: false },
  ];
  
  const runningModels = availableModels.filter(model => model.running);
  
  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle model expansion in the list
  const toggleModelExpansion = (modelId) => {
    if (expandedModel === modelId) {
      setExpandedModel(null);
    } else {
      setExpandedModel(modelId);
    }
  };

  return (
    <div className={`lazyollama-gui ${darkMode ? 'lazyollama-gui--dark' : 'lazyollama-gui--light'}`}>
      {/* Sidebar */}
      <div className="lazyollama-gui__sidebar">
        <div className="lazyollama-gui__sidebar-header">
          <Box className="lazyollama-gui__logo-icon" />
          <h1 className="lazyollama-gui__title">Ollama Dashboard</h1>
        </div>
        
        <nav className="lazyollama-gui__nav">
          <ul className="lazyollama-gui__nav-list">
            <li className={`lazyollama-gui__nav-item ${activeTab === 'home' ? 'lazyollama-gui__nav-item--active' : ''}`}>
              <button 
                className="lazyollama-gui__nav-button"
                onClick={() => setActiveTab('home')}
              >
                <Home className="lazyollama-gui__nav-icon" />
                <span>Home</span>
              </button>
            </li>
            <li className={`lazyollama-gui__nav-item ${activeTab === 'models' ? 'lazyollama-gui__nav-item--active' : ''}`}>
              <button 
                className="lazyollama-gui__nav-button"
                onClick={() => setActiveTab('models')}
              >
                <Box className="lazyollama-gui__nav-icon" />
                <span>Models</span>
              </button>
            </li>
            <li className={`lazyollama-gui__nav-item ${activeTab === 'running' ? 'lazyollama-gui__nav-item--active' : ''}`}>
              <button 
                className="lazyollama-gui__nav-button"
                onClick={() => setActiveTab('running')}
              >
                <Play className="lazyollama-gui__nav-icon" />
                <span>Running Models</span>
              </button>
            </li>
            <li className={`lazyollama-gui__nav-item ${activeTab === 'stats' ? 'lazyollama-gui__nav-item--active' : ''}`}>
              <button 
                className="lazyollama-gui__nav-button"
                onClick={() => setActiveTab('stats')}
              >
                <BarChart2 className="lazyollama-gui__nav-icon" />
                <span>Stats</span>
              </button>
            </li>
            <li className={`lazyollama-gui__nav-item ${activeTab === 'settings' ? 'lazyollama-gui__nav-item--active' : ''}`}>
              <button 
                className="lazyollama-gui__nav-button"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="lazyollama-gui__nav-icon" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <button className="lazyollama-gui__theme-toggle" onClick={toggleDarkMode}>
          <span>Theme</span>
          {darkMode ? <Sun className="lazyollama-gui__theme-icon" /> : <Moon className="lazyollama-gui__theme-icon" />}
        </button>
      </div>
      
      {/* Main Content */}
      <div className="lazyollama-gui__main">
        {/* Top Navigation */}
        <header className="lazyollama-gui__header">
          <h2 className="lazyollama-gui__header-title">
            {activeTab === 'home' && 'Home'}
            {activeTab === 'models' && 'Models'}
            {activeTab === 'running' && 'Running Models'}
            {activeTab === 'stats' && 'Statistics'}
            {activeTab === 'settings' && 'Settings'}
          </h2>
          
          <div className="lazyollama-gui__search-container">
            <Search className="lazyollama-gui__search-icon" />
            <input
              type="text"
              className="lazyollama-gui__search-input"
              placeholder="Search..."
            />
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="lazyollama-gui__content">
          {activeTab === 'models' && (
            <div className="lazyollama-gui__models-tab">
              <div className="lazyollama-gui__section-header">
                <h3 className="lazyollama-gui__section-title">Available Models</h3>
                <div className="lazyollama-gui__filter-buttons">
                  <button className="lazyollama-gui__filter-button lazyollama-gui__filter-button--active">
                    All
                  </button>
                  <button className="lazyollama-gui__filter-button">
                    Downloaded
                  </button>
                  <button className="lazyollama-gui__filter-button">
                    Running
                  </button>
                </div>
              </div>
              
              <div className="lazyollama-gui__models-list">
                {availableModels.map(model => (
                  <div 
                    key={model.id}
                    className="lazyollama-gui__model-card"
                  >
                    <div 
                      className="lazyollama-gui__model-header"
                      onClick={() => toggleModelExpansion(model.id)}
                    >
                      <div className="lazyollama-gui__model-info">
                        <Box className={`lazyollama-gui__model-icon ${model.running ? 'lazyollama-gui__model-icon--running' : ''}`} />
                        <div>
                          <h4 className="lazyollama-gui__model-name">{model.name}</h4>
                          <p className="lazyollama-gui__model-description">{model.description}</p>
                        </div>
                      </div>
                      
                      <div className="lazyollama-gui__model-meta">
                        <div className="lazyollama-gui__model-tags">
                          {model.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="lazyollama-gui__model-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ChevronDown className={`lazyollama-gui__chevron ${expandedModel === model.id ? 'lazyollama-gui__chevron--expanded' : ''}`} />
                      </div>
                    </div>
                    
                    {expandedModel === model.id && (
                      <div className="lazyollama-gui__model-actions">
                        {!model.downloaded && (
                          <button className="lazyollama-gui__button lazyollama-gui__button--primary">
                            <Download className="lazyollama-gui__button-icon" />
                            Pull Model
                          </button>
                        )}
                        
                        {model.downloaded && !model.running && (
                          <button className="lazyollama-gui__button lazyollama-gui__button--success">
                            <Play className="lazyollama-gui__button-icon" />
                            Start Model
                          </button>
                        )}
                        
                        {model.running && (
                          <button className="lazyollama-gui__button lazyollama-gui__button--danger">
                            <Square className="lazyollama-gui__button-icon" />
                            Stop Model
                          </button>
                        )}
                        
                        {model.downloaded && (
                          <button className="lazyollama-gui__button lazyollama-gui__button--secondary">
                            <X className="lazyollama-gui__button-icon" />
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'running' && (
            <div className="lazyollama-gui__running-tab">
              <h3 className="lazyollama-gui__section-title">Running Models</h3>
              
              {runningModels.length > 0 ? (
                <div className="lazyollama-gui__running-grid">
                  {runningModels.map(model => (
                    <div
                      key={model.id}
                      className="lazyollama-gui__running-card"
                    >
                      <div className="lazyollama-gui__running-header">
                        <div className="lazyollama-gui__running-name">
                          <Box className="lazyollama-gui__running-icon" />
                          <h4 className="lazyollama-gui__model-name">{model.name}</h4>
                        </div>
                        <div className="lazyollama-gui__model-tags">
                          {model.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="lazyollama-gui__model-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="lazyollama-gui__metrics">
                        <div className="lazyollama-gui__metric-row">
                          <span>Memory Usage</span>
                          <span>4.2 GB</span>
                        </div>
                        <div className="lazyollama-gui__progress-container">
                          <div className="lazyollama-gui__progress-bar" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      
                      <div className="lazyollama-gui__metrics">
                        <div className="lazyollama-gui__metric-row">
                          <span>Uptime</span>
                          <span>2h 34m</span>
                        </div>
                      </div>
                      
                      <div className="lazyollama-gui__running-actions">
                        <button className="lazyollama-gui__button lazyollama-gui__button--danger">
                          <Square className="lazyollama-gui__button-icon" />
                          Stop Model
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="lazyollama-gui__empty-state">
                  <Box className="lazyollama-gui__empty-icon" />
                  <h3 className="lazyollama-gui__empty-title">No Models Running</h3>
                  <p className="lazyollama-gui__empty-text">Start a model from the Models tab to see it here.</p>
                  <button 
                    className="lazyollama-gui__button lazyollama-gui__button--primary"
                    onClick={() => setActiveTab('models')}
                  >
                    Go to Models
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="lazyollama-gui__stats-tab">
              <h3 className="lazyollama-gui__section-title lazyollama-gui__section-title--spaced">System Statistics</h3>
              
              <div className="lazyollama-gui__stats-grid">
                <div className="lazyollama-gui__stat-card">
                  <h4 className="lazyollama-gui__stat-title">CPU Usage</h4>
                  <div className="lazyollama-gui__stat-value">32%</div>
                  <div className="lazyollama-gui__progress-container">
                    <div className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--blue" style={{ width: '32%' }}></div>
                  </div>
                </div>
                
                <div className="lazyollama-gui__stat-card">
                  <h4 className="lazyollama-gui__stat-title">Memory Usage</h4>
                  <div className="lazyollama-gui__stat-value">8.4 GB / 16 GB</div>
                  <div className="lazyollama-gui__progress-container">
                    <div className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--green" style={{ width: '52%' }}></div>
                  </div>
                </div>
                
                <div className="lazyollama-gui__stat-card">
                  <h4 className="lazyollama-gui__stat-title">GPU Memory</h4>
                  <div className="lazyollama-gui__stat-value">5.6 GB / 8 GB</div>
                  <div className="lazyollama-gui__progress-container">
                    <div className="lazyollama-gui__progress-bar lazyollama-gui__progress-bar--purple" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="lazyollama-gui__chart-container">
                <h4 className="lazyollama-gui__chart-title">Model Usage History</h4>
                <div className="lazyollama-gui__chart">
                  {[40, 65, 30, 85, 55, 70, 45, 90, 65, 50, 75, 60].map((height, index) => (
                    <div key={index} className="lazyollama-gui__chart-bar" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <div className="lazyollama-gui__chart-labels">
                  <span>12 AM</span>
                  <span>3 AM</span>
                  <span>6 AM</span>
                  <span>9 AM</span>
                  <span>12 PM</span>
                  <span>3 PM</span>
                  <span>6 PM</span>
                  <span>9 PM</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="lazyollama-gui__settings-tab">
              <h3 className="lazyollama-gui__section-title lazyollama-gui__section-title--spaced">Settings</h3>
              
              <div className="lazyollama-gui__settings-card">
                <h4 className="lazyollama-gui__settings-title">API Configuration</h4>
                
                <div className="lazyollama-gui__settings-form">
                  <div className="lazyollama-gui__form-group">
                    <label className="lazyollama-gui__form-label">
                      Ollama API Endpoint
                    </label>
                    <input
                      type="text"
                      className="lazyollama-gui__form-input"
                      defaultValue="http://localhost:11434"
                    />
                  </div>
                  
                  <div className="lazyollama-gui__form-group">
                    <label className="lazyollama-gui__form-label">
                      API Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      className="lazyollama-gui__form-input"
                      defaultValue="30"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lazyollama-gui__settings-card">
                <h4 className="lazyollama-gui__settings-title">Interface Settings</h4>
                
                <div className="lazyollama-gui__settings-form">
                  <div className="lazyollama-gui__toggle-row">
                    <label className="lazyollama-gui__form-label">
                      Dark Mode
                    </label>
                    <div 
                      className={`lazyollama-gui__toggle ${darkMode ? 'lazyollama-gui__toggle--active' : ''}`}
                      onClick={toggleDarkMode}
                    >
                      <div className="lazyollama-gui__toggle-dot"></div>
                    </div>
                  </div>
                  
                  <div className="lazyollama-gui__toggle-row">
                    <label className="lazyollama-gui__form-label">
                      Auto-refresh Running Models
                    </label>
                    <div className="lazyollama-gui__toggle lazyollama-gui__toggle--active">
                      <div className="lazyollama-gui__toggle-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

export default OllamaDashboard;          