export const API_URL = (process.env.NODE_ENV === 'production')
    ? "https://saigonparking.wtf:8443"
    : "http://localhost:8000";