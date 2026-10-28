import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// --- Utility Function & Radix Primitives ---
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "relative z-50 max-w-[280px] rounded-md px-2 py-1 text-xs shadow-md select-none transition-all duration-150",
          "bg-[#1f2328] text-white dark:bg-[#21262d] dark:text-gray-100 border border-neutral-700/50",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {props.children}
        {showArrow && (
          <TooltipPrimitive.Arrow className="-my-px fill-[#1f2328] dark:fill-[#21262d]" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-70 bg-black/60 backdrop-blur-sm transition-all duration-200",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-70 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-none duration-300",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      <div className="relative bg-white dark:bg-(--dark-bg) rounded-[28px] overflow-hidden shadow-2xl p-1.5 border border-neutral-200 dark:border-neutral-700/60">
        {children}
        <DialogPrimitive.Close
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 dark:bg-black/70 p-1.5 hover:bg-black/80 dark:hover:bg-black/90 transition-all cursor-pointer text-white"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// --- SVG Icon Components ---
const PlusIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SendIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MicIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
  </svg>
);

const FileIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const FolderIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const SpinnerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("animate-spin", props.className)}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// --- File helpers ---
export function formatFileSize(bytes = 0) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const n = bytes / 1024 ** i;
  return `${n >= 10 || i === 0 ? Math.round(n) : n.toFixed(1)} ${units[i]}`;
}

const FILE_TYPES = {
  pdf: { label: "PDF", color: "bg-red-500" },
  doc: { label: "DOC", color: "bg-blue-600" },
  docx: { label: "DOCX", color: "bg-blue-600" },
  xls: { label: "XLS", color: "bg-emerald-600" },
  xlsx: { label: "XLSX", color: "bg-emerald-600" },
  csv: { label: "CSV", color: "bg-emerald-600" },
  ppt: { label: "PPT", color: "bg-orange-500" },
  pptx: { label: "PPTX", color: "bg-orange-500" },
  txt: { label: "TXT", color: "bg-neutral-500" },
  md: { label: "MD", color: "bg-neutral-600" },
  json: { label: "JSON", color: "bg-amber-500" },
  zip: { label: "ZIP", color: "bg-purple-500" },
};

export function getFileTypeInfo(name = "") {
  const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  if (FILE_TYPES[ext]) return FILE_TYPES[ext];
  if (["js", "jsx", "ts", "tsx", "css", "html", "py", "java", "c", "cpp", "go", "rs"].includes(ext)) {
    return { label: ext.toUpperCase(), color: "bg-sky-600" };
  }
  return { label: (ext || "FILE").slice(0, 4).toUpperCase(), color: "bg-neutral-500" };
}

// Only show the loader if the upload is actually slow (avoids flicker on fast reads)
function useDelayedFlag(active, delay = 300) {
  const [flag, setFlag] = React.useState(false);
  React.useEffect(() => {
    if (!active) {
      setFlag(false);
      return undefined;
    }
    const id = setTimeout(() => setFlag(true), delay);
    return () => clearTimeout(id);
  }, [active, delay]);
  return flag;
}

/**
 * FileCard - ChatGPT/Claude-style attachment card: type badge, name, type + size,
 * and a loading indicator while the file is still being processed.
 */
export function FileCard({ file, onRemove, className }) {
  const info = getFileTypeInfo(file.name);
  const isUploading = file.status === "uploading";
  const isError = file.status === "error";
  const showLoader = useDelayedFlag(isUploading);
  const progress = Math.round(file.progress || 0);

  return (
    <div
      className={cn(
        "group relative flex w-[220px] max-w-full items-center gap-2.5 overflow-hidden rounded-2xl border p-2 pr-3",
        "border-neutral-200 bg-neutral-50 dark:border-neutral-700/80 dark:bg-neutral-800/70",
        isError && "border-red-500/40",
        className
      )}
    >
      <div className={cn("relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white", isError ? "bg-red-500" : info.color)}>
        {showLoader ? (
          <SpinnerIcon className="h-5 w-5" />
        ) : (
          <FileIcon className="h-5 w-5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-neutral-900 dark:text-neutral-100" title={file.name}>{file.name}</p>
        <p className={cn("text-[11px]", isError ? "text-red-500" : "text-neutral-500 dark:text-neutral-400")}>
          {isError
            ? "Upload failed"
            : showLoader
              ? `Uploading… ${progress}%`
              : `${info.label} · ${formatFileSize(file.size)}`}
        </p>
      </div>
      {showLoader && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/5 dark:bg-white/10">
          <div className="h-full bg-blue-500 transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      )}
      {onRemove && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(file.id);
          }}
          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer max-md:opacity-100"
          aria-label={`Remove ${file.name}`}
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function ImageThumb({ img, onRemove, onPreview }) {
  const isUploading = img.status === "uploading" || !(img.previewUrl || img.url);
  const showLoader = useDelayedFlag(isUploading);
  return (
    <div className="relative group shrink-0 rounded-[1rem] p-0.5" title={`${img.name} · ${formatFileSize(img.size)}`}>
      <button
        type="button"
        disabled={isUploading}
        className="block cursor-pointer transition-transform hover:scale-105 focus-visible:outline-none disabled:cursor-default disabled:hover:scale-100"
        onClick={(e) => {
          e.stopPropagation();
          onPreview(img);
        }}
      >
        {img.previewUrl || img.url ? (
          <img
            src={img.previewUrl || img.url}
            alt={img.name || "Preview"}
            className="h-14 w-14 rounded-[1rem] border border-black/10 object-cover shadow-xs dark:border-white/10"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] border border-black/10 bg-neutral-100 text-neutral-500 dark:border-white/10 dark:bg-neutral-800">
            {showLoader && <SpinnerIcon className="h-5 w-5" />}
          </div>
        )}
      </button>
      {onRemove && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(img.id);
          }}
          className="absolute top-1.5 right-1.5 z-10 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/90 cursor-pointer dark:bg-black/70"
          aria-label={`Remove ${img.name}`}
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

/**
 * PromptBox Component
 * Custom chat input with file & image attachment support, full-size image modal,
 * auto-resizing textarea, voice input, and GitHub-style responsive theme styling.
 */
export const PromptBox = React.forwardRef(
  (
    {
      className,
      value: valueProp,
      onChange,
      onSend,
      attachments = [],
      onAttachFiles,
      onRemoveAttachment,
      projectContext,
      onRemoveProject,
      isThinking = false,
      placeholder = "Message SakuPilot...",
      ...props
    },
    ref
  ) => {
    const internalTextareaRef = React.useRef(null);
    const fileInputRef = React.useRef(null);
    const [internalValue, setInternalValue] = React.useState("");
    const [selectedDialogImage, setSelectedDialogImage] = React.useState(null);
    const [isListening, setIsListening] = React.useState(false);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const recognitionRef = React.useRef(null);

    // Forward ref to internal textarea
    React.useImperativeHandle(ref, () => internalTextareaRef.current);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;

    // Auto resize textarea
    React.useLayoutEffect(() => {
      const textarea = internalTextareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${Math.max(newHeight, isFocused || value ? 48 : 40)}px`;
      }
    }, [value, isFocused]);

    // Setup speech recognition
    React.useEffect(() => {
      const SpeechRecognition =
        typeof window !== "undefined" &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            const nextValue = value ? `${value} ${transcript}` : transcript;
            if (isControlled && onChange) {
              onChange({ target: { value: nextValue } });
            } else {
              setInternalValue(nextValue);
            }
          }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }

      return () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch {
            // ignore
          }
        }
      };
    }, [isControlled, onChange, value]);

    const handleToggleSpeech = () => {
      if (!recognitionRef.current) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch {
          setIsListening(false);
        }
      }
    };

    const handleInputChange = (e) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange) onChange(e);
    };

    const handlePlusClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileInputChange = (event) => {
      const files = Array.from(event.target.files || []);
      if (files.length > 0 && onAttachFiles) {
        onAttachFiles(files);
      }
      event.target.value = "";
    };

    const handlePaste = (event) => {
      if (event.clipboardData?.files?.length > 0 && onAttachFiles) {
        const files = Array.from(event.clipboardData.files);
        onAttachFiles(files);
      }
      if (props.onPaste) props.onPaste(event);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer?.files?.length > 0 && onAttachFiles) {
        const files = Array.from(e.dataTransfer.files);
        onAttachFiles(files);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (canSend && onSend) {
          onSend();
        }
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };

    const handleContainerClick = (e) => {
      if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT" && !e.target.closest("button")) {
        internalTextareaRef.current?.focus();
      }
    };

    const imageAttachments = attachments.filter((att) => att.kind === "image" || att.previewUrl);
    const documentAttachments = attachments.filter((att) => att.kind !== "image" && !att.previewUrl);
    const hasUploading = attachments.some((att) => att.status === "uploading");
    const hasValue = Boolean(value?.trim().length > 0 || attachments.length > 0);
    const canSend = hasValue && !isThinking && !hasUploading;
    // Compact single-row layout when idle & empty; expands on focus or when it has content
    const hasContent = Boolean(value?.length > 0 || attachments.length > 0 || projectContext);
    const isExpanded = isFocused || hasContent || isListening;

    // Animate the height + fade the contents whenever the box expands/collapses
    const innerRef = React.useRef(null);
    const mountedRef = React.useRef(false);
    const [boxHeight, setBoxHeight] = React.useState(null);

    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el || typeof ResizeObserver === "undefined") return undefined;
      const update = () => setBoxHeight(el.offsetHeight);
      update();
      const observer = new ResizeObserver(update);
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true;
        return undefined;
      }
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion) {
        Array.from(innerRef.current?.children || []).forEach((child, i) => {
          child.animate?.(
            [
              { opacity: 0.2, transform: isExpanded ? "translateY(6px)" : "translateY(-4px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 260, delay: i * 30, easing: "cubic-bezier(0.32, 0.72, 0, 1)", fill: "backwards" }
          );
        });
      }
      return undefined;
    }, [isExpanded]);

    return (
      <div
        onClick={handleContainerClick}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false);
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          height: boxHeight ?? "auto",
          transition: "height 260ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        className={cn(
          "overflow-hidden rounded-[28px] shadow-sm transition-[border-color,box-shadow,background-color] duration-200",
          "bg-white border border-(--border-light) dark:bg-(--dark-bg)",
          "focus-within:border-(--sucess) focus-within:ring-1 focus-within:ring-(--sucess)",
          isDragOver && "border-blue-500 bg-blue-50/50 dark:bg-neutral-800/80 ring-2 ring-blue-500/20",
          "cursor-text relative",
          className
        )}
      >
       <div
        ref={innerRef}
        style={
          isExpanded
            ? { gridTemplateColumns: "1fr auto", gridTemplateAreas: '"tray tray" "input input" "plus actions"' }
            : { gridTemplateColumns: "auto 1fr auto", gridTemplateAreas: '"plus input actions"' }
        }
        className="grid items-center p-2"
       >
        {/* Hidden file input supporting images & documents */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
          accept=".txt,.md,.json,.csv,.js,.jsx,.ts,.tsx,.css,.html,.py,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
        />

        {/* Dialog for full-size image preview */}
        <Dialog
          open={Boolean(selectedDialogImage)}
          onOpenChange={(open) => !open && setSelectedDialogImage(null)}
        >
          <DialogContent>
            {selectedDialogImage && (
              <img
                src={selectedDialogImage.previewUrl || selectedDialogImage.url}
                alt={selectedDialogImage.name || "Full size preview"}
                className="w-full max-h-[85vh] object-contain rounded-[24px]"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Top Tray: Project Context & Attachments (Images and Documents) */}
        {(projectContext || attachments.length > 0) && (
          <div style={{ gridArea: "tray" }} className="flex flex-wrap items-center gap-2 px-2 pt-1 pb-1.5 border-b border-black/5 dark:border-white/5 mb-1">
            {/* Active Project context pill */}
            {projectContext && (
              <div className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 px-2.5 py-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
                <FolderIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="max-w-[200px] truncate">{projectContext.title}</span>
                {onRemoveProject && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProject();
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-blue-500/20 text-blue-600 dark:text-blue-300 transition-colors cursor-pointer"
                    aria-label="Remove project context"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* Document attachments cards */}
            {documentAttachments.map((file) => (
              <FileCard key={file.id} file={file} onRemove={onRemoveAttachment} />
            ))}

            {/* Image attachments thumbnail cards */}
            {imageAttachments.map((img) => (
              <ImageThumb key={img.id} img={img} onRemove={onRemoveAttachment} onPreview={setSelectedDialogImage} />
            ))}
          </div>
        )}

        {/* Textarea input */}
        <textarea
          ref={internalTextareaRef}
          rows={1}
          value={value}
          onChange={handleInputChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "github-scrollbar w-full resize-none border-0 bg-transparent px-3 py-2 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-300 focus:ring-0 focus-visible:outline-none text-sm leading-6",
            isExpanded ? "min-h-[48px]" : "min-h-[40px]"
          )}
          style={{ gridArea: "input" }}
          {...props}
        />

        {/* Toolbar (inline in compact mode, bottom row when expanded) */}
        <TooltipProvider delayDuration={100}>
          <div style={{ gridArea: "plus" }} className={cn("flex items-center", isExpanded && "p-1 pt-0.5")}>
              {/* Attach button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handlePlusClick}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-foreground dark:text-white transition-colors hover:bg-black/5 dark:hover:bg-[#515151] focus-visible:outline-none cursor-pointer"
                  >
                    <PlusIcon className="h-6 w-6" />
                    <span className="sr-only">Attach files</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow={true}>
                  <p>Attach image or file</p>
                </TooltipContent>
              </Tooltip>
          </div>

          {/* Right-aligned buttons container (Mic + Send) */}
          <div style={{ gridArea: "actions" }} className={cn("flex items-center gap-2", isExpanded && "p-1 pt-0.5")}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleToggleSpeech}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none cursor-pointer",
                        isListening
                          ? "bg-red-500/15 text-red-500 animate-pulse"
                          : "text-foreground dark:text-white hover:bg-black/5 dark:hover:bg-[#515151]"
                      )}
                    >
                      <MicIcon className="h-5 w-5" />
                      <span className="sr-only">Record voice</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow={true}>
                    <p>{isListening ? "Listening... click to stop" : "Record voice"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onSend?.()}
                      disabled={!canSend}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 disabled:bg-black/40 dark:disabled:bg-[#515151] cursor-pointer disabled:cursor-not-allowed"
                    >
                      <SendIcon className="h-6 w-6 text-bold" />
                      <span className="sr-only">Send message</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow={true}>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
          </div>
        </TooltipProvider>
       </div>
      </div>
    );
  }
);

PromptBox.displayName = "PromptBox";
export default PromptBox;
