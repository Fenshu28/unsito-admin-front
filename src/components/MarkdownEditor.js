import React, { useState } from "react";
import { Icon } from "@iconify/react";

const MarkdownEditor = ({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = false,
}) => {
  const [activeTab, setActiveTab] = useState("write"); // write, preview

  const insertText = (before, after = "") => {
    if (disabled) return;
    const textarea = document.getElementById("md-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText =
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end);

    onChange({ target: { name: "descripcion", value: newText } });

    // Devolvemos el focus al textarea después de un micro-ticket
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const basicMdParser = (text) => {
    if (!text) return "";
    return text
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>',
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-xl font-bold mt-6 mb-3 border-b pb-1">$1</h2>',
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-2xl font-bold mt-8 mb-4 border-b pb-2">$1</h1>',
      )
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        '<a href="$2" class="text-brand-600 underline" target="_blank">$1</a>',
      )
      .replace(/^\s*\n/gm, "<br />")
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
  };

  return (
    <div className="w-full font-sans">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-3 py-1 text-xs font-bold transition-colors ${activeTab === "write" ? "bg-white text-brand-600 shadow-sm rounded-md" : "text-gray-500 hover:text-gray-700"}`}
          >
            Escribir
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-xs font-bold transition-colors ${activeTab === "preview" ? "bg-white text-brand-600 shadow-sm rounded-md" : "text-gray-500 hover:text-gray-700"}`}
          >
            Vista Previa
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-300 overflow-hidden bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600/20 transition-all">
        {/* Toolbar */}
        {activeTab === "write" && (
          <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
            <ToolbarButton
              icon="mdi:format-bold"
              onClick={() => insertText("**", "**")}
              title="Negrita"
            />
            <ToolbarButton
              icon="mdi:format-italic"
              onClick={() => insertText("*", "*")}
              title="Itálica"
            />
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <ToolbarButton
              icon="mdi:format-header-1"
              onClick={() => insertText("# ")}
              title="Título 1"
            />
            <ToolbarButton
              icon="mdi:format-header-2"
              onClick={() => insertText("## ")}
              title="Título 2"
            />
            <ToolbarButton
              icon="mdi:format-header-3"
              onClick={() => insertText("### ")}
              title="Título 3"
            />
            <div className="w-px h-4 bg-gray-300 mx-1" />
            <ToolbarButton
              icon="mdi:format-list-bulleted"
              onClick={() => insertText("- ")}
              title="Lista"
            />
            <ToolbarButton
              icon="mdi:link-variant"
              onClick={() => insertText("[", "](url)")}
              title="Enlace"
            />
          </div>
        )}

        <div className="relative">
          {activeTab === "write" ? (
            <textarea
              id="md-editor"
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              rows={12}
              className="w-full p-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none resize-y min-h-[200px]"
            />
          ) : (
            <div
              className="w-full p-4 text-sm text-gray-800 min-h-[285px] prose max-w-none overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html:
                  basicMdParser(value) ||
                  '<p class="text-gray-400 italic font-medium">Nada que previsualizar...</p>',
              }}
            />
          )}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        Sugerencia: Usa Markdown para dar formato a tu publicación.
      </p>
    </div>
  );
};

const ToolbarButton = ({ icon, onClick, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className="p-1.5 rounded-md hover:bg-white hover:shadow-sm text-gray-600 hover:text-brand-600 transition-all"
  >
    <Icon icon={icon} width="18" />
  </button>
);

export default MarkdownEditor;
