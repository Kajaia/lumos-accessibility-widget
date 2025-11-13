export default function screenReader(enable = false) {
  if (enable) {
    console.log("Screen reader activated");
  } else {
    console.log("Screen reader deactivated");
  }
}
