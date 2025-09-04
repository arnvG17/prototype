export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-3 max-w-[80%]">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}