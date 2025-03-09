export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  title?: string;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}
