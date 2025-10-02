import { useState } from "react";
import { Copy, Check } from "phosphor-react";

interface ProjectIdDisplayProps {
  projectId: string;
}

export function ProjectIdDisplay({ projectId }: ProjectIdDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(projectId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <span className="text-sm font-semibold text-gray-600 mr-3">
        Project ID:
      </span>
      <code className="text-sm font-mono font-bold text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
        {projectId}
      </code>
      <button
        onClick={handleCopy}
        className="ml-3 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
        aria-label="Copy ID"
        title="Copy project ID"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" weight="bold" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
