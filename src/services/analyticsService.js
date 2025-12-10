import apiClient from "./api";

/**
 * Analytics Service
 * Handles all analytics-related API calls
 */

// Get global dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get('/analytics/dashboard');
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard", error.response?.data || error.message);
    throw error;
  }
};

// Get top publications sorted by metric
export const getTopPublicaciones = async (by = 'views', limit = 10) => {
  try {
    const response = await apiClient.get(`/analytics/top?by=${by}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener top publicaciones", error.response?.data || error.message);
    throw error;
  }
};

// Get statistics for a specific publication
export const getPublicacionStats = async (id) => {
  try {
    const response = await apiClient.get(`/analytics/publicacion/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas de publicación", error.response?.data || error.message);
    throw error;
  }
};

// Get timeline data for charts
export const getTimeline = async (id, period = '30d', groupBy = 'day') => {
  try {
    const response = await apiClient.get(`/analytics/timeline/${id}?period=${period}&groupBy=${groupBy}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener timeline", error.response?.data || error.message);
    throw error;
  }
};

// Track download event (public endpoint)
export const trackDownload = async (publicacionId) => {
  try {
    const response = await apiClient.post(`/analytics/track/download/${publicacionId}`, {
      source: 'web'
    });
    return response.data;
  } catch (error) {
    // Fail silently - don't interrupt user experience
    console.warn("Error al registrar descarga", error.response?.data || error.message);
    return null;
  }
};

// Track save event (public endpoint)
export const trackSave = async (publicacionId) => {
  try {
    const response = await apiClient.post(`/analytics/track/save/${publicacionId}`, {
      source: 'web'
    });
    return response.data;
  } catch (error) {
    // Fail silently - don't interrupt user experience
    console.warn("Error al registrar guardado", error.response?.data || error.message);
    return null;
  }
};
