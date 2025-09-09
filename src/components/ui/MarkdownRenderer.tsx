'use client';

import React from 'react';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const renderMarkdown = (md: string) => {
    // Basic markdown to HTML conversion
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-6">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
      .replace(/^\s*(\n)?/gm, '')
      .replace(/<\/li>\n<li/gim, '</li><li');

    // Wrap list items in ul
    html = html.replace(/<li.*<\/li>/gim, (match) => `<ul>${match}</ul>`);
    
    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={renderMarkdown(markdown)} />;
};

export default MarkdownRenderer;
