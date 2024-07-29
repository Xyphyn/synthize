export function webfingerToInstance(home: string, finger: string) {
  const split = finger.split('@')

  if (split[1]) {
    return split[1]
  } else {
    return new URL(home).hostname
  }
}
