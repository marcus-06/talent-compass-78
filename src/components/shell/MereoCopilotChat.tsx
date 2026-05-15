import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Send, 
  History, 
  MessageSquare, 
  Plus,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MereoCopilotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const suggestions = [
    "Risco Turnover",
    "Atraso OKRs",
    "Gaps Sucessão",
    "Adesão Treinamento"
  ];

  const history = [
    { id: 1, title: "Análise de Turnover Q1", date: "Hoje" },
    { id: 2, title: "Status OKR Tecnologia", date: "Ontem" },
    { id: 3, title: "Planejamento Sucessão", date: "2 dias atrás" },
  ];

  return (
    <>
      {/* Floating Button with Pulse */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition-all hover:scale-110 active:scale-95",
          !isOpen && "animate-[subtle-pulse_3s_infinite]"
        )}
        aria-label="Abrir Mereo Copilot"
      >
        <Sparkles className="h-7 w-7" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes subtle-pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(234, 88, 12, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); }
          }
        `}} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-background/20 backdrop-blur-[2px] animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Lateral Chat Sidebar (Drawer) */}
      <div className={cn(
        "fixed right-0 top-0 bottom-0 z-[70] flex h-screen bg-card shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out border-l border-border",
        isOpen ? "translate-x-0" : "translate-x-full",
        showHistory ? "w-[600px]" : "w-[450px]"
      )}>
        {/* History Sidebar - Embedded inside the drawer */}
        <div className={cn(
          "flex flex-col border-r border-border bg-muted/10 transition-all duration-300 overflow-hidden",
          showHistory ? "w-64" : "w-0"
        )}>
          <div className="flex items-center justify-between p-5 border-b border-border min-w-[250px]">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <History className="h-3.5 w-3.5" />
              Histórico
            </span>
            <button className="rounded-lg p-1 hover:bg-muted text-muted-foreground">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 min-w-[250px]">
            {history.map((item) => (
              <button 
                key={item.id}
                className="w-full rounded-xl p-3 text-left transition-all hover:bg-card hover:shadow-sm group mb-1 border border-transparent hover:border-border"
              >
                <p className="text-sm font-semibold truncate text-foreground group-hover:text-accent">{item.title}</p>
                <p className="text-[10px] text-muted-foreground">{item.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col relative min-w-[350px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border p-5 bg-card/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="group flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-accent hover:text-white transition-all"
                title={showHistory ? "Ocultar histórico" : "Ver histórico"}
              >
                <History className="h-4 w-4" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg shadow-accent/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Mereo Copilot</h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">IA Ativa</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-muted text-muted-foreground transition-all hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="rounded-2xl rounded-tl-none border border-border bg-muted/20 p-5 shadow-sm max-w-[90%]">
                <p className="text-sm leading-relaxed text-foreground">
                  Olá! Como seu **Mereo Copilot**, estou pronto para analisar dados e gerar insights estratégicos.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Como posso apoiar sua tomada de decisão hoje?
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-5 border-t border-border bg-muted/5 sticky bottom-0">
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestions.map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => setInputValue(suggestion)}
                  className="rounded-full border border-border bg-card px-3.5 py-2 text-[11px] font-semibold text-muted-foreground transition-all hover:border-accent hover:text-accent hover:shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escreva sua pergunta..."
                className="w-full resize-none rounded-2xl border border-border bg-background p-4 pr-14 text-sm transition-all focus:border-accent/40 focus:outline-none focus:ring-4 focus:ring-accent/5 shadow-sm"
                rows={2}
              />
              <button 
                className="absolute right-3 bottom-3 rounded-xl bg-accent p-3 text-white shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-[10px] text-center text-muted-foreground">
              Mereo Copilot pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
