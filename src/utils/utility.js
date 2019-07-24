export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return { idToken };
  } catch (err) {
    clearToken();
    return {};
  }
}