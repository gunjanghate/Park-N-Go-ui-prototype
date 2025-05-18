export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function setCSRFToken(token) {
  document.cookie = `csrftoken=${token}; path=/; secure; samesite=strict`;
}

export async function fetchCSRFToken() {
  let csrfToken = getCookie('csrftoken');
  
  if (!csrfToken) {
    try {
      const response = await fetch('/get-csrf-token/');  // Fetch the CSRF token from your server endpoint
      if (response.ok) {
        const data = await response.json();
        csrfToken = data.csrfToken;
        setCSRFToken(csrfToken);  // Save the token in a cookie
      } else {
        console.error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error while fetching CSRF token:', error);
    }
  }
}

export function getCSRFToken () {
  return getCookie('csrftoken');
}

export const BACKEND = 'http://localhost:8000'  // Backend URL

export const backendUrl = () => `http://${location.hostname}:8000`