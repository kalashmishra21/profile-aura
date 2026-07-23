/**
 * JSX type definitions for Satori
 */

declare namespace JSX {
  interface IntrinsicElements {
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    svg: React.SVGProps<SVGSVGElement>;
    path: React.SVGProps<SVGPathElement>;
    circle: React.SVGProps<SVGCircleElement>;
    rect: React.SVGProps<SVGRectElement>;
    text: React.SVGProps<SVGTextElement>;
    g: React.SVGProps<SVGGElement>;
    defs: React.SVGProps<SVGDefsElement>;
    linearGradient: React.SVGProps<SVGLinearGradientElement>;
    radialGradient: React.SVGProps<SVGRadialGradientElement>;
    stop: React.SVGProps<SVGStopElement>;
    filter: React.SVGProps<SVGFilterElement>;
    feGaussianBlur: React.SVGProps<SVGFEGaussianBlurElement>;
    feOffset: React.SVGProps<SVGFEOffsetElement>;
    feMerge: React.SVGProps<SVGFEMergeElement>;
    feMergeNode: React.SVGProps<SVGFEMergeNodeElement>;
  }

  interface Element {}
  
  interface ElementClass {}
  
  interface IntrinsicAttributes {}
}

declare module 'react' {
  export interface CSSProperties {
    [key: string]: any;
  }
}
