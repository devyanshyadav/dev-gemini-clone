import styled from "styled-components";

export const FormatOutput = styled.div`
  .ProseMirror {
   outline: none;
   caret-color: transparent;

   .codeHeader button {
     background: transparent;
     border: none;
     cursor: pointer;
     border-radius: 6px;
   }

   .codeHeader {
     border-bottom: 2px solid #94a3b873;
     display: flex;
     justify-content: space-between;
   }

   .codeHeader button {
     font-size: 1.5rem;
     position: sticky;
     top: 0;
     z-index: 10;
   }

   .codeHeader .code-title {
     font-size: 17px;
     font-family: Verdana, Geneva, Tahoma, sans-serif;
     pointer-events: none;
     text-select: none;
     opacity: 0.8;
   }



   .hljs-comment,
   .hljs-quote {
     color: #616161;
   }

   .hljs-variable,
   .hljs-template-variable,
   .hljs-attribute,
   .hljs-tag,
   .hljs-name,
   .hljs-regexp,
   .hljs-link,
   .hljs-name,
   .hljs-selector-id,
   .hljs-selector-class {
     color: #f98181;
   }

   .hljs-number,
   .hljs-meta,
   .hljs-built_in,
   .hljs-builtin-name,
   .hljs-literal,
   .hljs-type,
   .hljs-params {
     color: #fbbc88;
   }

   .hljs-string,
   .hljs-symbol,
   .hljs-bullet {
     color: #b9f18d;
   }

   .hljs-title,
   .hljs-section {
     color: #faf594;
   }

   .hljs-keyword,
   .hljs-selector-tag {
     color: #70cff8;
   }

   .hljs-emphasis {
     font-style: italic;
   }

   .hljs-strong {
     font-weight: 700;
   }

 }

pre {
  background: #94a3b81f;
  position: relative;
  font-family: "JetBrainsMono", monospace;
  border-radius: 1rem;
  padding: 3px 1rem;
  overflow: auto;
  max-width: 100%;
}

pre code {
  display: inline-block;
  min-width: 100%;
  color: inherit;
  background: none !important;
  font-size: 0.9rem;
  white-space: pre;
  word-wrap: normal;
  word-break: keep-all;
}

/* Styling for webkit browsers (Chrome, Safari, etc.) */
pre::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

pre::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

pre::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 4px;
}

/* Styling for Firefox */
pre {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
    code {
    color: inherit;
    background: #94a3b81f !important;
    padding:2px 5px;
    font-size: 0.9rem;
    border-radius: 6px;
   }
`;
