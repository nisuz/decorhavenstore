
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, Bot } from 'lucide-react';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [discordWebhook, setDiscordWebhook] = useState('');
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDiscord = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // In a real app, you would save this to your backend/database
      // For demo, just show a success toast
      
      // Test the webhook with a test message
      const response = await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '✅ Notification Test',
            description: 'Your Discord webhook is configured correctly!',
            color: 0x00ff00
          }]
        })
      });
      
      if (response.ok) {
        // Save to localStorage for demo purposes
        localStorage.setItem('discordWebhook', discordWebhook);
        
        toast({
          title: "Discord Webhook Saved",
          description: "Your Discord webhook has been configured successfully.",
        });
      } else {
        toast({
          title: "Invalid Webhook",
          description: "Please check your Discord webhook URL and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Saving Webhook",
        description: "An error occurred. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Test the Telegram bot and chat ID
      const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: '✅ *Notification Test*\nYour Telegram bot is configured correctly!',
          parse_mode: 'Markdown'
        })
      });
      
      const data = await response.json();
      
      if (data.ok) {
        // Save to localStorage for demo purposes
        localStorage.setItem('telegramBotToken', telegramBotToken);
        localStorage.setItem('telegramChatId', telegramChatId);
        
        toast({
          title: "Telegram Bot Saved",
          description: "Your Telegram notification settings have been configured successfully.",
        });
      } else {
        toast({
          title: "Invalid Bot Settings",
          description: data.description || "Please check your Telegram bot token and chat ID.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Saving Telegram Settings",
        description: "An error occurred. Please check your bot token and chat ID.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discord Notifications
          </CardTitle>
          <CardDescription>
            Configure a Discord webhook to receive order notifications.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSaveDiscord}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
              <Input
                id="discord-webhook"
                placeholder="https://discord.com/api/webhooks/..."
                value={discordWebhook}
                onChange={(e) => setDiscordWebhook(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                You can create a webhook URL in your Discord server settings under "Integrations" &gt; "Webhooks".
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving}>
              <Send className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Discord Webhook'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Telegram Notifications
          </CardTitle>
          <CardDescription>
            Configure a Telegram bot to receive order notifications.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSaveTelegram}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telegram-bot-token">Telegram Bot Token</Label>
              <Input
                id="telegram-bot-token"
                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                value={telegramBotToken}
                onChange={(e) => setTelegramBotToken(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Create a bot with @BotFather on Telegram and paste the token here.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telegram-chat-id">Telegram Chat ID</Label>
              <Input
                id="telegram-chat-id"
                placeholder="-1001234567890"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                This is the ID of the chat where notifications will be sent. You can get this from @userinfobot.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving}>
              <Send className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Telegram Settings'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NotificationSettings;
