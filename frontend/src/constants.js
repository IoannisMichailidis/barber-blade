// Temporary because the proxy doesn't work
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';

// export const BASE_URL =''; // We use proxy instead

export const USERS_AUTH_URL = '/auth/token';
export const USERS_URL = '/api/users';
export const HAIRCUTS_URL = '/api/haircuts';
export const TIMESLOTS_URL = '/api/timeslots';
export const BOOKINGS_URL = '/api/bookings';
export const UPLOAD_URL = '/api/upload';