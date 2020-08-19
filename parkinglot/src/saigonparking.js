export const API_URL = (process.env.NODE_ENV === 'production')
    ? "https://saigonparking.wtf:8448"
    : "http://ylas2712.ddns.net:8338";

export const WEBSOCKET_URL = (process.env.NODE_ENV === 'production')
    ? "wss://saigonparking.wtf:8443"
    : "ws://ylas2712.ddns.net:8000";

// export const API_URL = "http://localhost:8338";