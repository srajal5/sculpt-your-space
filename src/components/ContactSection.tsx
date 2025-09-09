
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [emailjsConfig, setEmailjsConfig] = useState({
    serviceId: localStorage.getItem('emailjs_service_id') || '',
    templateId: localStorage.getItem('emailjs_template_id') || '',
    publicKey: localStorage.getItem('emailjs_public_key') || '',
  });
  const [showConfig, setShowConfig] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailjsConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
    localStorage.setItem(`emailjs_${name}`, value);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      toast({
        title: "EmailJS Configuration Required",
        description: "Please configure your EmailJS credentials first.",
        variant: "destructive",
      });
      setShowConfig(true);
      return;
    }
    
    setLoading(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'Srajalpuri55@gmail.com',
      };
      
      await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, templateParams, emailjsConfig.publicKey);
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('EmailJS error:', error);
      
      let errorMessage = "Please try again later.";
      if (error?.text?.includes("Public Key is invalid") || error?.status === 400) {
        errorMessage = "Invalid EmailJS credentials. Please check your Service ID, Template ID, and Public Key.";
        setShowConfig(true);
      } else if (error?.text) {
        errorMessage = error.text;
      }
      
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive",
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
            {showConfig && (
              <Card className="p-6 glassmorphism border-white/5 mb-6">
                <h3 className="font-medium mb-4">EmailJS Configuration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get your credentials from <a href="https://dashboard.emailjs.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">EmailJS Dashboard</a>
                </p>
                <div className="space-y-4">
                  <Input
                    name="serviceId"
                    placeholder="Service ID"
                    value={emailjsConfig.serviceId}
                    onChange={handleConfigChange}
                    className="bg-secondary/20 border-white/5"
                  />
                  <Input
                    name="templateId"
                    placeholder="Template ID"
                    value={emailjsConfig.templateId}
                    onChange={handleConfigChange}
                    className="bg-secondary/20 border-white/5"
                  />
                  <Input
                    name="publicKey"
                    placeholder="Public Key"
                    value={emailjsConfig.publicKey}
                    onChange={handleConfigChange}
                    className="bg-secondary/20 border-white/5"
                  />
                  <Button 
                    onClick={() => setShowConfig(false)}
                    className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0"
                  >
                    Save Configuration
                  </Button>
                </div>
              </Card>
            )}
            
            <Card className="p-6 glassmorphism border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Send Message</h3>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfig(!showConfig)}
                  className="text-xs"
                >
                  {showConfig ? 'Hide' : 'Setup'} EmailJS
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
