
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Sparkles, AlertCircle, Info, RefreshCw } from 'lucide-react';

const AIInquiry: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'مرحباً. أنا مساعد توثيق "شاهد غزة". أنا ملتزم تماماً بقاعدة بياناتنا الموثقة للمؤشرات الإنسانية والحوادث المسجلة. كيف يمكنني مساعدتك في فهم البيانات اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a professional human rights documentation assistant for the "Witness Gaza" (شاهد غزة) platform. 
          Your tone must be neutral, factual, and strictly evidence-based. 
          Respond exclusively in Arabic.
          Focus on providing summaries of documented impacts on healthcare, civilian infrastructure, children, and cultural sites. 
          Avoid inflammatory language. 
          Always mention that your insights are based on reports from UN agencies (OCHA, WHO, UNICEF), UNRWA, and independent human rights monitors. 
          If a user asks about political opinions, steer the conversation back to factual humanitarian data and documentation.
          Structure your response clearly with bullet points if applicable.`
        }
      });

      const aiResponse = response.text || "عذراً، لم أتمكن من معالجة هذا الطلب حالياً. يرجى المحاولة مرة أخرى أو السؤال عن مؤشر محدد.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي. يرجى التأكد من أن استفسارك متعلق بالبيانات الإنسانية الموثقة." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedPrompts = [
    "كيف تأثر النظام الصحي؟",
    "ملخص لأضرار البنية التحتية في غزة.",
    "الأثر على المنشآت التعليمية والأطفال.",
    "المواقع الثقافية والتاريخية المتضررة."
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col animate-in fade-in duration-700 text-right">
      <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/5 bg-zinc-900 flex justify-between items-center flex-row-reverse">
          <div className="flex items-center gap-3 flex-row-reverse">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">مساعد التوثيق الذكي</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">مبني على أدلة موثقة</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            <AlertCircle className="w-3 h-3 text-amber-500" />
            <span className="text-[9px] font-bold text-amber-500 uppercase">لأغراض المعلومات فقط</span>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-zinc-100 text-black' 
                : 'bg-white/5 text-zinc-300 border border-white/5'
              }`}>
                {msg.content.split('\n').map((line, idx) => (
                  <p key={idx} className={line.trim() === '' ? 'h-2' : 'mb-1'}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-end">
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-3 flex-row-reverse">
                <RefreshCw className="w-4 h-4 text-zinc-500 animate-spin" />
                <span className="text-xs text-zinc-500">جاري استخراج الأدلة الموثقة...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="p-4 border-t border-white/5 bg-zinc-900/50 flex gap-2 overflow-x-auto no-scrollbar flex-row-reverse">
           {suggestedPrompts.map((prompt, i) => (
             <button 
                key={i} 
                onClick={() => setInput(prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
             >
               {prompt}
             </button>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-zinc-900">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل عن مؤشرات محددة، البنية التحتية، أو الأثر الإنساني..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 transition-all pl-12 text-right"
              dir="rtl"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg disabled:opacity-50 disabled:bg-zinc-700 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <p className="text-[9px] text-zinc-600 text-right">المساعد يستخدم نماذج لغوية كبيرة. تأكد دائماً من مراجعة بطاقات الأدلة الأساسية.</p>
            <Info className="w-3 h-3 text-zinc-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInquiry;
