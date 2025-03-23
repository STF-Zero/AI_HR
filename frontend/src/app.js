// App.js 主文件
import React, { useState } from "react";
import axios from "axios";
import "./app.css";
import "./api_document";
import { uploadDocument } from "./api_document";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // 保持原有的逻辑处理不变...

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    uploadDocument(file, "18548624-56c7-4462-8ffd-5e3514a44539")
  };

  const sendMessage = async (e) => {};

  return (
    <div className="app-container">
      {/* 头部 */}
      <header className="app-header">
        <h1>AI面试官系统</h1>
        <div className="upload-section">
          <form onSubmit={handleFileUpload} className="upload-form">
            <label className="file-input-label">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                // accept=".pdf,.doc,.docx"
              />
              <span className="file-input-button">选择简历文件</span>
              <span className="file-name">
                {file ? file.name : "未选择文件"}
              </span>
            </label>
            <button type="submit" className="upload-button" disabled={!file}>
              {file ? "开始上传" : "请先选择文件"}
            </button>
          </form>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="chat-main">
        {/* 聊天历史区域 */}
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`message-bubble ${
                msg.type === "user" ? "user" : "ai"
              }`}
            >
              <div className="message-content">
                {msg.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="message-meta">
                {msg.type === "user" ? "候选人" : "AI面试官"}
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="chat-input-area">
          <div className="input-wrapper">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="请输入面试问题..."
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
            />
            <button
              onClick={sendMessage}
              className="send-button"
              disabled={!message.trim()}
            >
              发送
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
