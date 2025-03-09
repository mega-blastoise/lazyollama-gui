import React, { JSX, useState } from 'react';
import './CodeBlock.css';
import { CodeBlockProps } from './types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  showCopyButton = true,
  title,
  theme = 'auto',
  className = ''
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const codeBlockClasses = ['sb-code-block', `sb-code-block-${theme}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={codeBlockClasses}>
      {title && (
        <div className="sb-code-block-header">
          <div className="sb-code-block-title">{title}</div>
          <div className="sb-code-block-language">{language}</div>
        </div>
      )}

      <div className="sb-code-block-content">
        {showCopyButton && (
          <button
            className="sb-code-block-copy-button"
            onClick={handleCopyClick}
            aria-label="Copy code"
            title="Copy code"
          >
            {isCopied ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}

        <pre className="sb-code-block-pre">
          <code className={`sb-code-block-code language-${language}`}>
            <SyntaxHighlighter
              language={language}
              style={dark}
              showLineNumbers={showLineNumbers}
              wrapLines
              customStyle={{ marginTop: '1.5rem' }}
            >
              {code}
            </SyntaxHighlighter>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
