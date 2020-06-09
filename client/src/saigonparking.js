export const API_URL = (process.env.NODE_ENV === 'production')
    ? "https://saigonparking.wtf:8448"
    : "http://localhost:8338";