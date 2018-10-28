// The built-in requiredIf/requiredUnless weren't behaving according to
// the documentation, so I made this.
export function required(value) {
  // If required isn't `true`, then value is always valid
  if (!this.required) return true

  return !!value
}
