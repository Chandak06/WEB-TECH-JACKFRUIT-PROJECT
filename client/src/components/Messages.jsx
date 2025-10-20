import React, { useState } from 'react';
import Navbar from './shared/Navbar';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Mock data - replace with API calls
  const conversations = [
    {
      id: 1,
      user: { name: 'Sarah Johnson', avatar: null, online: true },
      lastMessage: 'Thanks for the React session!',
      timestamp: '2m ago',
      unread: 2
    },
    {
      id: 2,
      user: { name: 'David Chen', avatar: null, online: false },
      lastMessage: 'Can we reschedule?',
      timestamp: '1h ago',
      unread: 0
    },
    {
      id: 3,
      user: { name: 'Emily Davis', avatar: null, online: true },
      lastMessage: 'Looking forward to our session!',
      timestamp: '3h ago',
      unread: 1
    },
    {
      id: 4,
      user: { name: 'Mike Wilson', avatar: null, online: false },
      lastMessage: 'Great explanation on Node.js',
      timestamp: '1d ago',
      unread: 0
    }
  ];

  const messages = selectedChat ? [
    { id: 1, sender: 'them', text: 'Hi! I have a question about React hooks.', timestamp: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Sure! What would you like to know?', timestamp: '10:31 AM' },
    { id: 3, sender: 'them', text: 'How do I manage complex state with useReducer?', timestamp: '10:32 AM' },
    { id: 4, sender: 'me', text: 'Great question! useReducer is perfect for complex state logic...', timestamp: '10:33 AM' },
    { id: 5, sender: 'them', text: 'Thanks for the React session!', timestamp: '10:45 AM' }
  ] : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar isAuthenticated={true} user={{ name: 'John Doe', email: 'john@example.com' }} />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Messages</span>
            </h1>
            <p className="text-slate-400">Chat with your mentors and mentees</p>
          </div>

          {/* Chat Container */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden h-[calc(100vh-240px)]">
            <div className="flex h-full">
              {/* Conversations List */}
              <div className="w-full md:w-1/3 border-r border-white/10 overflow-y-auto">
                {/* Search */}
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                {/* Conversation Items */}
                <div>
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedChat(conv)}
                      className={`p-4 cursor-pointer transition-all border-b border-white/5 ${
                        selectedChat?.id === conv.id
                          ? 'bg-white/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
                            {conv.user.name.charAt(0)}
                          </div>
                          {conv.user.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-white truncate">{conv.user.name}</h3>
                            <span className="text-xs text-slate-400">{conv.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 truncate">{conv.lastMessage}</p>
                            {conv.unread > 0 && (
                              <span className="ml-2 px-2 py-0.5 bg-violet-600 text-white text-xs rounded-full">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
                            {selectedChat.user.name.charAt(0)}
                          </div>
                          {selectedChat.user.online && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-950"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{selectedChat.user.name}</h3>
                          <p className="text-xs text-slate-400">
                            {selectedChat.user.online ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                            <div className={`px-4 py-2 rounded-2xl ${
                              msg.sender === 'me'
                                ? 'bg-violet-600 text-white'
                                : 'bg-white/10 text-white'
                            }`}>
                              <p>{msg.text}</p>
                            </div>
                            <p className={`text-xs text-slate-400 mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-white/10">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <button
                          type="submit"
                          className="p-3 bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors"
                        >
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-24 h-24 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-xl font-bold text-slate-400 mb-2">No chat selected</h3>
                      <p className="text-slate-500">Choose a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
