
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send, Eye, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
    
    try {
      // Save message locally
      const savedMessage = saveMessage(formData);
      
      // Create mailto link and try to open it
      const mailtoLink = createMailtoLink(formData);
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Try to open email client
      window.location.href = mailtoLink;
      
      toast({
        title: "Message saved!",
        description: "Opening your email client... Message also saved locally.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message saved",
        description: "Couldn't open email client, but your message is saved locally.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="contact" className="section py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="p-5 glassmorphism border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">Srajalpuri55@gmail.com</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-5 glassmorphism border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Lucknow, Uttar pradesh, India</p>
                  </div>
                </div>
              </Card>
              
              <div className="p-5 glassmorphism border-white/5 rounded-lg">
                <h3 className="font-medium mb-3">Follow Me</h3>
                <div className="flex gap-3">
                  {['github', 'twitter', 'linkedin', 'instagram'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <span className="w-5 h-5 text-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {showMessages && (
              <Card className="p-6 glassmorphism border-white/5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Saved Messages ({messages.length})</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowMessages(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {messages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No messages yet</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-3 bg-secondary/20 rounded-lg border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium">{msg.subject}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(msg.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          From: {msg.name} ({msg.email})
                        </div>
                        <div className="text-sm">{msg.message}</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}
            
            <Card className="p-6 glassmorphism border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Send Message</h3>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMessages(!showMessages)}
                  className="text-xs flex items-center gap-2"
                >
                  <Eye className="w-3 h-3" />
                  {showMessages ? 'Hide' : 'View'} Messages
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-secondary/20 border-white/5"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-secondary/20 border-white/5"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-secondary/20 border-white/5"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-secondary/20 border-white/5 min-h-[150px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 flex items-center gap-2"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
