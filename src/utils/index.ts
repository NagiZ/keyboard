export function tremble(duration = 50) {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(duration)
  }
}