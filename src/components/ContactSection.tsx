import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/animation/MagneticButton';
import { TextReveal, Reveal } from '@/components/animation/TextReveal';
import { Mail, MapPin, Send, Eye, X, CheckCircle2, Sparkles, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('contact_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
    return newMessage;
  };

  const createMailtoLink = (data: typeof formData) => {
    const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    return `mailto:Srajalpuri55@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save message locally first so no data is lost
    saveMessage(formData);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    // Graceful fallback if EmailJS variables are unconfigured
    const isUnconfigured = !serviceId || serviceId.includes('your_') ||
      !templateId || templateId.includes('your_') ||
      !publicKey || publicKey.includes('your_');

    if (isUnconfigured) {
      try {
        const mailtoLink = createMailtoLink(formData);
        await new Promise(resolve => setTimeout(resolve, 500));
        window.location.href = mailtoLink;

        toast({
          title: "Message saved locally!",
          description: "Opening mail client fallback. Message saved in your local messages.",
        });

        setSubmittedSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        toast({
          title: "Message saved",
          description: "Saved in local messages.",
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    // Dispatch via real EmailJS client
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Srajal',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Message Transmitted!",
        description: "Thank you! Your message has been sent successfully.",
      });

      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.warn('EmailJS Send Warning (400 Bad Request / Unconfigured credentials):', error);
      
      // Fallback to mailto link & local storage confirmation so user message is never lost
      const mailtoLink = createMailtoLink(formData);
      window.location.href = mailtoLink;

      toast({
        title: "Message Saved Locally!",
        description: "EmailJS API key/service needs setup. Opening mail client fallback — your message is safely stored in local messages.",
      });

      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const socialNodes = [
    { name: 'EMAIL', href: 'mailto:Srajalpuri55@gmail.com', icon: <Mail className="w-5 h-5 text-neon-purple" />, value: 'Srajalpuri55@gmail.com' },
    { name: 'GITHUB', href: 'https://github.com/srajal5', icon: <Github className="w-5 h-5 text-neon-blue" />, value: '@srajal5' },
    { name: 'LINKEDIN', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5 text-neon-pink" />, value: 'Srajal Puri' },
    { name: 'TWITTER', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5 text-primary" />, value: '@srajal' },
  ];

  return (
    <section id="contact" className="section py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <Reveal direction="down">
            <span className="px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-neon-pink uppercase bg-neon-pink/10 border border-neon-pink/20 rounded-full">
              Transmission Channel
            </span>
          </Reveal>

          <div className="flex justify-center">
            <TextReveal
              text="Let's Build Something"
              as="h2"
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            />
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="text-muted-foreground/80 font-light max-w-lg mx-auto text-base md:text-lg">
              Have an AI project, full-stack collaboration, or engineering opportunity in mind? Send a direct transmission below.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Communication Network Nodes */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-blue" />
              Communication Network
            </h3>

            <div className="space-y-4">
              {socialNodes.map((node) => (
                <motion.a
                  key={node.name}
                  href={node.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="block p-5 rounded-2xl glassmorphism border-white/10 hover:border-neon-purple/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-neon-purple/10 group-hover:border-neon-purple/30 transition-colors">
                      {node.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold uppercase text-muted-foreground/80 tracking-wider">
                        {node.name}
                      </div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-neon-purple transition-colors">
                        {node.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="p-6 rounded-2xl glassmorphism border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <span className="text-sm font-bold text-foreground">Location & Timezone</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Pune, Maharashtra, India • IST (UTC +5:30)
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form & Saved Messages View */}
          <div className="lg:col-span-7 space-y-6">
            {/* View Local Messages Toggle */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMessages(!showMessages)}
                className="text-xs flex items-center gap-2 border-white/10 bg-white/5 hover:bg-white/10 font-mono"
              >
                <Eye className="w-3.5 h-3.5" />
                {showMessages ? 'Hide' : 'View'} Saved Messages ({messages.length})
              </Button>
            </div>

            {/* Saved Messages Drawer */}
            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="p-6 glassmorphism border-white/15 mb-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-foreground text-sm uppercase font-mono">
                        Saved Local Messages ({messages.length})
                      </h4>
                      <Button variant="ghost" size="sm" onClick={() => setShowMessages(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {messages.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-6 font-mono">No messages saved yet.</p>
                    ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {messages.map((msg) => (
                          <div key={msg.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                            <div className="flex justify-between text-xs font-mono font-bold text-foreground">
                              <span>{msg.subject}</span>
                              <span className="text-muted-foreground">{new Date(msg.timestamp).toLocaleDateString()}</span>
                            </div>
                            <div className="text-[11px] text-neon-blue font-mono">From: {msg.name} ({msg.email})</div>
                            <p className="text-xs text-muted-foreground font-light pt-1">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transmission Form */}
            <Card className="p-6 sm:p-8 glassmorphism border-white/15 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submittedSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center mx-auto text-neon-purple shadow-[0_0_25px_rgba(155,135,245,0.4)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-foreground">Message Transmitted</h4>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto font-light">
                        Thank you! Your message has been safely received. I will get back to you shortly.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSubmittedSuccess(false)}
                      className="border-white/15 bg-white/5"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Your Name</label>
                        <Input
                          name="name"
                          placeholder="Srajal Puri"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white/5 border-white/10 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple rounded-xl text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Your Email</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="srajal@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/5 border-white/10 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple rounded-xl text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Subject</label>
                      <Input
                        name="subject"
                        placeholder="AI Project / Full-Stack Collaboration Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple rounded-xl text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold uppercase text-muted-foreground">Message</label>
                      <Textarea
                        name="message"
                        placeholder="Tell me about your project goals, scope, or idea..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple rounded-xl text-sm min-h-[140px]"
                        required
                      />
                    </div>

                    <MagneticButton magneticStrength={0.2} className="w-full">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 font-bold py-6 rounded-xl shadow-[0_0_20px_rgba(155,135,245,0.3)] hover:shadow-[0_0_30px_rgba(155,135,245,0.6)] flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          'Transmitting Message...'
                        ) : (
                          <>
                            Send Message Transmission <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
