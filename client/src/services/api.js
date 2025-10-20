// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  signup: async (name, email, password) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST'
    });
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  }
};

// Users API
export const usersAPI = {
  getProfile: async (userId) => {
    return apiCall(`/users/${userId}`);
  },

  updateProfile: async (userId, data) => {
    return apiCall(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  searchUsers: async (query) => {
    return apiCall(`/users/search?q=${query}`);
  }
};

// Skills API
export const skillsAPI = {
  getAllSkills: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiCall(`/skills?${queryParams}`);
  },

  getSkillById: async (skillId) => {
    return apiCall(`/skills/${skillId}`);
  },

  createSkill: async (data) => {
    return apiCall('/skills', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateSkill: async (skillId, data) => {
    return apiCall(`/skills/${skillId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  deleteSkill: async (skillId) => {
    return apiCall(`/skills/${skillId}`, {
      method: 'DELETE'
    });
  }
};

// Sessions API
export const sessionsAPI = {
  getMySessions: async (status = null) => {
    const query = status ? `?status=${status}` : '';
    return apiCall(`/sessions/my${query}`);
  },

  getSessionById: async (sessionId) => {
    return apiCall(`/sessions/${sessionId}`);
  },

  bookSession: async (data) => {
    return apiCall('/sessions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateSession: async (sessionId, data) => {
    return apiCall(`/sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  cancelSession: async (sessionId) => {
    return apiCall(`/sessions/${sessionId}/cancel`, {
      method: 'POST'
    });
  },

  rescheduleSession: async (sessionId, newDateTime) => {
    return apiCall(`/sessions/${sessionId}/reschedule`, {
      method: 'POST',
      body: JSON.stringify({ newDateTime })
    });
  }
};

// Messages API
export const messagesAPI = {
  getConversations: async () => {
    return apiCall('/messages/conversations');
  },

  getMessages: async (conversationId) => {
    return apiCall(`/messages/conversations/${conversationId}`);
  },

  sendMessage: async (conversationId, content) => {
    return apiCall(`/messages/conversations/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  },

  markAsRead: async (messageId) => {
    return apiCall(`/messages/${messageId}/read`, {
      method: 'PUT'
    });
  }
};

// Reviews API
export const reviewsAPI = {
  getReviewsForUser: async (userId) => {
    return apiCall(`/reviews/user/${userId}`);
  },

  createReview: async (data) => {
    return apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateReview: async (reviewId, data) => {
    return apiCall(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  deleteReview: async (reviewId) => {
    return apiCall(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  }
};

export default {
  auth: authAPI,
  users: usersAPI,
  skills: skillsAPI,
  sessions: sessionsAPI,
  messages: messagesAPI,
  reviews: reviewsAPI
};
