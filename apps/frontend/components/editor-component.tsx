import { useAppSelector } from "@/redux/hooks";
import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";
import { useDebounce } from "@uidotdev/usehooks";

import active4d from "@/public/themes/Active4D.json";
import allHallowseve from "@/public/themes/All Hallows Eve.json";
import amy from "@/public/themes/Amy.json";
import birdsofParadise from "@/public/themes/Birds of Paradise.json";
import blackboard from "@/public/themes/Blackboard.json";
import brillianceBlack from "@/public/themes/Brilliance Black.json";
import brillianceDull from "@/public/themes/Brilliance Dull.json";
import chromeDevtools from "@/public/themes/Chrome DevTools.json";
import cloudsMidnight from "@/public/themes/Clouds Midnight.json";
import clouds from "@/public/themes/Clouds.json";
import cobalt from "@/public/themes/Cobalt.json";
import cobalt2 from "@/public/themes/Cobalt2.json";
import dawn from "@/public/themes/Dawn.json";
import dracula from "@/public/themes/Dracula.json";
import dreamweaver from "@/public/themes/Dreamweaver.json";
import eiffel from "@/public/themes/Eiffel.json";
import espressoLibre from "@/public/themes/Espresso Libre.json";
import githubDark from "@/public/themes/GitHub Dark.json";
import githubLight from "@/public/themes/GitHub Light.json";
import github from "@/public/themes/GitHub.json";
import idle from "@/public/themes/IDLE.json";
import katzenmilch from "@/public/themes/Katzenmilch.json";
import kuroirTheme from "@/public/themes/Kuroir Theme.json";
import lazy from "@/public/themes/LAZY.json";
import magicwbAmiga from "@/public/themes/MagicWB (Amiga).json";
import merbivoreSoft from "@/public/themes/Merbivore Soft.json";
import merbivore from "@/public/themes/Merbivore.json";
import monokaiBright from "@/public/themes/Monokai Bright.json";
import monokai from "@/public/themes/Monokai.json";
import nightOwl from "@/public/themes/Night Owl.json";
import nord from "@/public/themes/Nord.json";
import oceanicNext from "@/public/themes/Oceanic Next.json";
import pastelsOnDark from "@/public/themes/Pastels on Dark.json";
import slushAndPoppies from "@/public/themes/Slush and Poppies.json";
import solarizedDark from "@/public/themes/Solarized-dark.json";
import solarizedLight from "@/public/themes/Solarized-light.json";
import spacecadet from "@/public/themes/SpaceCadet.json";
import sunburst from "@/public/themes/Sunburst.json";
import textmateMacClassic from "@/public/themes/Textmate (Mac Classic).json";
import tomorrowNightBlue from "@/public/themes/Tomorrow-Night-Blue.json";
import tomorrowNightBright from "@/public/themes/Tomorrow-Night-Bright.json";
import tomorrowNightEighties from "@/public/themes/Tomorrow-Night-Eighties.json";
import tomorrowNight from "@/public/themes/Tomorrow-Night.json";
import tomorrow from "@/public/themes/Tomorrow.json";
import twilight from "@/public/themes/Twilight.json";
import upstreamSunburst from "@/public/themes/Upstream Sunburst.json";
import vibrantInk from "@/public/themes/Vibrant Ink.json";
import xcodeDefault from "@/public/themes/Xcode_default.json";
import zenburnesque from "@/public/themes/Zenburnesque.json";
import iplastic from "@/public/themes/iPlastic.json";
import idlefingers from "@/public/themes/idleFingers.json";
import krtheme from "@/public/themes/krTheme.json";
import monoindustrial from "@/public/themes/monoindustrial.json";

import allThemes from "@/public/themes/themelist.json";
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
  const editorLanguage = useAppSelector(
    (state) => state.editorSettings.language
  );
  const roomSlug = useAppSelector((state) => state.roomSlug);
  const initialCode = useAppSelector((state) => state.initcode);
  const editorSettings = useAppSelector((state) => state.editorSettings);
  const [editorCode, setEditorCode] = useState("");
  const debouncedEditorCode = useDebounce(editorCode, 300);
const themes = {
  active4d: active4d,
  allHallowseve: allHallowseve,
  amy: amy,
  birdsofParadise: birdsofParadise,
  blackboard: blackboard,
  brillianceBlack: brillianceBlack,
  brillianceDull: brillianceDull,
  chromeDevtools: chromeDevtools,
  cloudsMidnight: cloudsMidnight,
  clouds: clouds,
  cobalt: cobalt,
  cobalt2: cobalt2,
  dawn: dawn,
  dracula: dracula,
  dreamweaver: dreamweaver,
  eiffel: eiffel,
  espressoLibre: espressoLibre,
  githubDark: githubDark,
  githubLight: githubLight,
  github: github,
  idle: idle,
  katzenmilch: katzenmilch,
  kuroirTheme: kuroirTheme,
  lazy: lazy,
  magicwbAmiga: magicwbAmiga,
  merbivoreSoft: merbivoreSoft,
  merbivore: merbivore,
  monokaiBright: monokaiBright,
  monokai: monokai,
  nightOwl: nightOwl,
  nord: nord,
  oceanicNext: oceanicNext,
  pastelsOnDark: pastelsOnDark,
  slushAndPoppies: slushAndPoppies,
  solarizedDark: solarizedDark,
  solarizedLight: solarizedLight,
  spacecadet: spacecadet,
  sunburst: sunburst,
  textmateMacClassic: textmateMacClassic,
  tomorrowNightBlue: tomorrowNightBlue,
  tomorrowNightBright: tomorrowNightBright,
  tomorrowNightEighties: tomorrowNightEighties,
  tomorrowNight: tomorrowNight,
  tomorrow: tomorrow,
  twilight: twilight,
  upstreamSunburst: upstreamSunburst,
  vibrantInk: vibrantInk,
  xcodeDefault: xcodeDefault,
  zenburnesque: zenburnesque,
  iplastic: iplastic,
  idlefingers: idlefingers,
  krtheme: krtheme,
  monoindustrial: monoindustrial,
};



  const handleEditorWillMount = (monaco: any) => {
    Object.entries(themes).forEach(([name, theme]) => {
      // console.log(name,theme);
      monaco.editor.defineTheme(name, theme);
    });
    // monaco.editor.defineTheme("monokai-bright", monokaiBright);
    // monaco.editor.defineTheme("night-owl", nightOwl);
    // monaco.editor.defineTheme("monokai", monokai);
  };

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

  // Debounced Code
  useEffect(() => {
    console.log("Here in Debounced UseEffect()");
    if (wsRef.current?.readyState == WebSocket.OPEN) {
      const messageBody = {
        type: "chat",
        roomId: roomSlug,
        message: debouncedEditorCode,
      };
      wsRef.current?.send(JSON.stringify(messageBody));
    }
  }, [debouncedEditorCode]);
  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-lg"
    >
      <Editor
        height="100%"
        defaultLanguage={editorSettings.language}
        defaultValue={initialCode}
        theme={editorSettings.theme} // built-in theme (dark mode)
        loading={<Spinner className="size-8" />}
        beforeMount={handleEditorWillMount} // Register theme here
        options={{
          fontSize: editorSettings.fontSize,
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
            const editorCodeValue = editor.getValue();
            setEditorCode(editorCodeValue);
            // const messageBody = {
            //   type: "chat",
            //   roomId: roomSlug,
            //   message: editorCode,
            // };
            // wsRef.current?.send(JSON.stringify(messageBody));
          });
        }}
      />
    </div>
  );
};

export default EditorComponent;
