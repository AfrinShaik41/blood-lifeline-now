import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  "Am I eligible to donate?",
  "What blood groups are compatible?",
  "How does Rapid Blood work?",
  "Emergency blood needed",
];

const botResponses: Record<string, string> = {
  "am i eligible to donate?":
    "You're likely eligible to donate blood if you're between 18-65 years old, weigh at least 50kg, are in good health, and haven't donated in the last 56 days. Certain medications or recent travel may affect eligibility. Would you like more specific information?",
  "what blood groups are compatible?":
    "Blood compatibility depends on the recipient's blood type:\n• O- is the universal donor\n• AB+ can receive from all types\n• Type-specific matching is always preferred\n• For emergencies, O- is safest when type is unknown",
  "how does rapid blood work?":
    "Rapid Blood connects you with nearby blood banks and donors in real-time. Simply:\n1. Enter your required blood group\n2. Share your location\n3. View available blood banks sorted by distance\n4. Contact or navigate directly\n\nFor emergencies, use our Emergency Mode for priority assistance!",
  "emergency blood needed":
    "For immediate assistance:\n1. Call our emergency line: 1800-123-4567\n2. Use Emergency Mode on our platform\n3. We'll alert nearest blood banks and available donors\n\nStay calm - help is on the way! 🩸",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm BloodBot 🩸 How can I help you today? You can ask about blood donation eligibility, compatibility, or how Rapid Blood works.",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase().trim();
      let response =
        botResponses[lowerText] ||
        "I'm here to help with blood donation queries. You can ask about eligibility, blood group compatibility, how Rapid Blood works, or emergency procedures. For immediate help, please call 1800-123-4567.";

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="gradient-hero text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold">BloodBot</h3>
              <p className="text-xs text-white/80">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                  message.isBot
                    ? "bg-secondary text-foreground rounded-tl-md"
                    : "bg-primary text-primary-foreground rounded-tr-md"
                }`}
              >
                {message.text}
              </div>
              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
