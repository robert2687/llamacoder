"use client";

import { use, memo, useMemo } from "react";
import { createHighlighter } from "shiki/bundle/web";

const highlighterPromise = createHighlighter({
  langs: [
    "html",
    "css",
    "js",
    "graphql",
    "javascript",
    "json",
    "jsx",
    "markdown",
    "md",
    "mdx",
    "plaintext",
    "py",
    "python",
    "sh",
    "shell",
    "sql",
    "text",
    "ts",
    "tsx",
    "txt",
    "typescript",
    "zsh",
  ],
  themes: ["github-light-default"],
});

const SyntaxHighlighter = memo(function SyntaxHighlighter({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const highlighter = use(highlighterPromise);
  
  const html = useMemo(() => 
    highlighter.codeToHtml(code, {
      lang: language,
      theme: "github-light-default",
    }),
    [highlighter, code, language]
  );

  return (
    <div className="p-4 text-sm" dangerouslySetInnerHTML={{ __html: html }} />
  );
});

export default SyntaxHighlighter;
