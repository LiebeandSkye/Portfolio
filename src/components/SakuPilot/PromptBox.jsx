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
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-200",
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
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-none duration-300",
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
        textarea.style.height = `${Math.max(newHeight, 48)}px`;
      }
    }, [value]);

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
        if (hasValue && !isThinking && onSend) {
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
    const hasValue = Boolean(value?.trim().length > 0 || attachments.length > 0);

    return (
      <div
        onClick={handleContainerClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col rounded-[28px] p-2 shadow-sm transition-all",
          "bg-white border border-(--border-light) dark:bg-(--dark-bg)",
          "focus-within:border-(--sucess) focus-within:ring-1 focus-within:ring-(--sucess)",
          isDragOver && "border-blue-500 bg-blue-50/50 dark:bg-neutral-800/80 ring-2 ring-blue-500/20",
          "cursor-text relative",
          className
        )}
      >
        {/* Hidden file input supporting images & documents */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
          accept=".txt,.md,.json,.csv,.js,.jsx,.ts,.tsx,.css,.html,.py,.pdf,image/*"
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
          <div className="flex flex-wrap items-center gap-2 px-2 pt-1 pb-1.5 border-b border-black/5 dark:border-white/5 mb-1">
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

            {/* Document attachments pills */}
            {documentAttachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 text-xs text-neutral-800 dark:text-neutral-200"
              >
                <FileIcon className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span className="max-w-[140px] truncate font-medium text-[11px]">{file.name}</span>
                {onRemoveAttachment && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveAttachment(file.id);
                    }}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label={`Remove ${file.name}`}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}

            {/* Image attachments thumbnail cards */}
            {imageAttachments.map((img) => (
              <div
                key={img.id}
                className="relative group shrink-0 rounded-[1rem] p-0.5"
              >
                <button
                  type="button"
                  className="transition-transform hover:scale-105 cursor-pointer block focus-visible:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDialogImage(img);
                  }}
                  title="Click to view full image"
                >
                  <img
                    src={img.previewUrl || img.url}
                    alt={img.name || "Preview"}
                    className="h-14 w-14 rounded-[1rem] object-cover border border-black/10 dark:border-white/10 shadow-xs"
                  />
                </button>
                {onRemoveAttachment && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveAttachment(img.id);
                    }}
                    className="absolute top-1.5 right-1.5 z-10 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black/60 dark:bg-black/70 text-white transition-all hover:bg-black/90 cursor-pointer"
                    aria-label={`Remove ${img.name}`}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                )}
              </div>
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
          className="github-scrollbar w-full resize-none border-0 bg-transparent px-3 py-2 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-300 focus:ring-0 focus-visible:outline-none min-h-[48px] text-sm leading-6"
          {...props}
        />

        {/* Bottom toolbar */}
        <div className="mt-0.5 p-1 pt-0">
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center gap-2">
              {/* Attach button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
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

              {/* Right-aligned buttons container (Mic + Send) */}
              <div className="ml-auto flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
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
                      onClick={() => onSend?.()}
                      disabled={!hasValue || isThinking}
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
            </div>
          </TooltipProvider>
        </div>
      </div>
    );
  }
);

PromptBox.displayName = "PromptBox";
export default PromptBox;
