import { useAppSelector } from "@/redux/hooks";
import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { Spinner } from "./ui/spinner";

interface editorProps {
  editorRef: React.RefObject<any>;
  monacoRef: React.RefObject<any>;
  isRemoteUpdateRef: React.RefObject<any>;
  wsRef: React.RefObject<WebSocket | null>;
}

const EditorComponent = ({
  editorRef,
  monacoRef,
  isRemoteUpdateRef,
  wsRef,
}: editorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const editorLanguage = useAppSelector((state) => state.language);
  const roomSlug = useAppSelector((state) => state.roomSlug);
  const initialCode = useAppSelector((state) => state.initcode);
  const initialLanguage = useAppSelector((state) => state.language);
  // Cleanup any active ResizeObserver on unmount
  useEffect(() => {
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    monacoRef.current.editor.setModelLanguage(model, editorLanguage);
  }, [editorLanguage]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-lg"
    >
      <Editor
        height="100%"
        defaultLanguage={initialLanguage}
        defaultValue={initialCode}
        theme="vs-dark" // built-in theme (dark mode)
        loading={<Spinner className="size-8" />}
        options={{
          fontSize: 14,
          minimap: { enabled: false }, // hide minimap for cleaner UI
          wordWrap: "on",
          automaticLayout: true, // responsive resizing
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;
          // Ensure the editor always matches the flex container size,
          // including when the sidebar opens/closes (see microsoft/monaco-editor#1482)
          if (containerRef.current && typeof ResizeObserver !== "undefined") {
            const containerEl = containerRef.current;

            const resize = () => {
              const rect = containerEl.getBoundingClientRect();
              editor.layout({
                width: rect.width,
                height: rect.height,
              });
            };

            // Initial layout
            resize();

            const observer = new ResizeObserver(() => resize());
            observer.observe(containerEl);
            resizeObserverRef.current = observer;
          }

          editor.onDidChangeModelContent(() => {
            if (isRemoteUpdateRef.current) return;
            const editorCode = editor.getValue();
            const messageBody = {
              type: "chat",
              roomId: roomSlug,
              message: editorCode,
            };
            wsRef.current?.send(JSON.stringify(messageBody));
          });
        }}
      />
    </div>
  );
};

export default EditorComponent;
