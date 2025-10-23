/**
 * Core Element Types for Website Builder
 * Based on Technical Architecture Document
 */

// ============================================================================
// ELEMENT NODE
// ============================================================================

export interface ElementNode {
  id: string;
  type: string; // 'container', 'text', 'button', 'image', etc.
  props: ElementProps;
  styles: ElementStyles;
  children?: ElementNode[];
  parent?: string; // Parent element ID
}

export interface ElementProps {
  // Common props
  className?: string;
  customCSS?: string;
  id?: string;

  // Content props (for text, button, etc.)
  content?: string;
  text?: string;

  // Link props
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;

  // Image props
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';

  // Form props
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;

  // Layout props
  tag?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;

  // Data attributes (for dynamic data binding)
  dataSource?: string;
  dataField?: string;

  // Any other custom props
  [key: string]: any;
}

// ============================================================================
// ELEMENT STYLES
// ============================================================================

export interface ElementStyles {
  // Display & Layout
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'inline-block' | 'inline-flex' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

  // Dimensions
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;

  // Spacing
  margin?: SpacingValue;
  padding?: SpacingValue;

  // Flexbox
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;

  // Grid
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumnGap?: string;
  gridRowGap?: string;

  // Typography
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textDecoration?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  fontFamily?: string;

  // Colors
  color?: string;
  backgroundColor?: string;

  // Borders
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;

  // Effects
  boxShadow?: string;
  opacity?: number;
  transform?: string;
  transition?: string;

  // Positioning
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;

  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';

  // Responsive breakpoints
  tablet?: Partial<ElementStyles>;
  mobile?: Partial<ElementStyles>;
}

export interface SpacingValue {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  all?: string; // Shorthand for all sides
}

// ============================================================================
// ELEMENT REGISTRY
// ============================================================================

export interface ElementDefinition {
  type: string;
  label: string;
  icon: string; // Lucide icon name
  category: ElementCategory;
  defaultProps: ElementProps;
  defaultStyles: ElementStyles;
  defaultChildren?: ElementNode[];
  isContainer: boolean; // Can accept children
  allowedChildren?: string[]; // Whitelist of allowed child types (empty = all)
  requiredParent?: string[]; // Must be inside these parent types
  schema?: ElementSchema; // Validation schema
}

export type ElementCategory =
  | 'layout'
  | 'content'
  | 'media'
  | 'form'
  | 'navigation'
  | 'advanced';

export interface ElementSchema {
  props?: Record<string, PropSchema>;
  styles?: Record<string, StyleSchema>;
}

export interface PropSchema {
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'url';
  label: string;
  default?: any;
  options?: { label: string; value: any }[];
  required?: boolean;
  placeholder?: string;
}

export interface StyleSchema {
  type: 'string' | 'number' | 'select' | 'color' | 'spacing';
  label: string;
  default?: any;
  options?: { label: string; value: any }[];
  unit?: 'px' | 'rem' | '%' | 'vh' | 'vw';
}

// ============================================================================
// PAGE CONTENT
// ============================================================================

export interface PageContent {
  version: string; // Content schema version (e.g., '1.0')
  elements: ElementNode[];
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

// ============================================================================
// DESIGN SYSTEM
// ============================================================================

export interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    [key: string]: string;
  };
  typography: {
    fontFamilies: {
      heading: string;
      body: string;
      mono?: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      [key: string]: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    [key: string]: string;
  };
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  customCSS?: string; // User's global custom CSS
}
