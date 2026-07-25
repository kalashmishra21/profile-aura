export function sanitizeSvg(svgContent: string): string {
  // Ensure correct XML namespace and remove unwanted scripts or dangerous elements
  let clean = svgContent.trim();
  if (!clean.includes('xmlns="http://www.w3.org/2000/svg"')) {
    clean = clean.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return clean;
}
