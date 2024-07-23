'use client'

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React, { useRef, useState } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdContentCopy } from 'react-icons/md';

interface NodeAttrs {
  language: string;
  // Add other properties of the attrs object here
}

interface Node {
  attrs: NodeAttrs;
  // Add other properties of the node object here
}

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: {
  node: Node;
  updateAttributes: (attributes: { language: string }) => void;
  extension: any; // Add the correct type for the extension prop
}) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = () => {
    if (codeRef.current) {
      const codeElement = codeRef.current.querySelector('code');
      if (codeElement) {
        setIsCopying(true);
        navigator.clipboard.writeText(codeElement.textContent || '')
          .then(() => {
            setTimeout(() => {
              setIsCopying(false);
            }, 1000);
          })
          .catch(err => {
            console.error('Failed to copy code: ', err);
            setIsCopying(false);
          });
      }
    }
  };

  // Safely capitalize the first letter of the language
  const capitalizedLanguage = defaultLanguage
    ? defaultLanguage.charAt(0).toUpperCase() + defaultLanguage.slice(1)
    : 'Code';

  return (
    <NodeViewWrapper className="code-block">
      <pre ref={codeRef}>
        <div className='codeHeader'>
          <p className="code-title">{capitalizedLanguage}</p>
          <button
            type="button"
            onClick={handleCopy}
          >
            {isCopying ? (
              <IoCheckmarkDoneSharp/>
            ) : (
              <MdContentCopy />
            )}
          </button>
        </div>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlock;