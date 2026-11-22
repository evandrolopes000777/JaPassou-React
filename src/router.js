export function navigate(path) {
  window.location.hash = path
}

export function getCurrentRoute() {
  return window.location.hash.slice(1) || '/login'
}
