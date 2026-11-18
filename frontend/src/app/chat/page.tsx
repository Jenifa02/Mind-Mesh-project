
"use client";

import { useState } from "react";

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSendMessage(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    // Prevent empty messages
    if (!trimmedMessage) {
      return;
    }

    // Create the user's message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: trimmedMessage,
      sender: "user",
    };

    // Temporary AI reply for testing
    const aiMessage: ChatMessage = {
      id: Date.now() + 1,
      text: `You said: ${trimmedMessage}`,
      sender: "ai",
    };

    // Add both messages in order
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      aiMessage,
    ]);

    // Clear the input box
    setMessage("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <section className="flex h-[80vh] min-h-[400px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        {/* Chat Header */}
        <header className="border-b border-slate-200 bg-indigo-600 px-6 py-4 text-white">
          <h1 className="text-xl font-bold">
            MindMesh AI Chat
          </h1>

          <p className="mt-1 text-sm text-indigo-100">
            Your AI teammate is ready to help
          </p>
        </header>

        {/* Message Display Area */}
        <div
          className="flex-1 space-y-4 overflow-y-auto p-6"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.length === 0 ? (
            <p className="text-center text-sm text-slate-400">
              Your conversation will appear here.
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] break-words rounded-2xl px-4 py-3 ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-900"
                  }`}
                >
                  <p className="mb-1 text-xs font-semibold">
                    {msg.sender === "user"
                      ? "You"
                      : "AI Teammate"}
                  </p>

                  <p className="whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="flex gap-3 border-t border-slate-200 p-4"
        >
          <input
            type="text"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Type your message..."
            aria-label="Type your message"
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
