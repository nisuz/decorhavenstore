
import { Order } from '@/types';

/**
 * Service to handle sending notifications to various channels
 */
export const notificationService = {
  /**
   * Send an order notification to Discord via webhook
   * @param order The order details to send
   * @param webhookUrl The Discord webhook URL
   */
  sendToDiscord: async (order: Order, webhookUrl: string): Promise<boolean> => {
    try {
      // Format the order data for Discord
      const embed = {
        title: `🎉 New Order #${order.id}`,
        color: 0x00ff00, // Green color
        fields: [
          {
            name: '👤 Customer',
            value: `Name: ${order.userId}`
          },
          {
            name: '📞 Contact',
            value: `Phone: ${order.billingAddress?.phone || 'N/A'}`
          },
          {
            name: '🏠 Delivery Address',
            value: `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.postalCode}, ${order.deliveryAddress.country}`
          },
          {
            name: '💰 Total Amount',
            value: `$${order.totalAmount.toFixed(2)}`
          },
          {
            name: '💳 Payment Method',
            value: order.paymentMethod.toUpperCase()
          },
          {
            name: '📦 Items',
            value: order.items.map(item => `${item.name} x${item.quantity} ($${item.price.toFixed(2)} each)`).join('\n')
          }
        ],
        timestamp: new Date().toISOString()
      };

      // Send to Discord webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Discord notification error:', error);
      return false;
    }
  },

  /**
   * Send an order notification to Telegram via bot API
   * @param order The order details to send
   * @param botToken The Telegram bot token
   * @param chatId The Telegram chat ID to send to
   */
  sendToTelegram: async (order: Order, botToken: string, chatId: string): Promise<boolean> => {
    try {
      // Format the message for Telegram
      const message = `
🎉 *NEW ORDER #${order.id}*

👤 *Customer*: ${order.userId}
📞 *Contact*: ${order.billingAddress?.phone || 'N/A'}

🏠 *Delivery Address*:
${order.deliveryAddress.street},
${order.deliveryAddress.city}, ${order.deliveryAddress.state}
${order.deliveryAddress.postalCode}, ${order.deliveryAddress.country}

💰 *Total Amount*: $${order.totalAmount.toFixed(2)}
💳 *Payment Method*: ${order.paymentMethod.toUpperCase()}

📦 *Items*:
${order.items.map(item => `- ${item.name} x${item.quantity} ($${item.price.toFixed(2)} each)`).join('\n')}

🕒 *Order Time*: ${new Date().toLocaleString()}
      `;

      // Send to Telegram
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error('Telegram notification error:', error);
      return false;
    }
  }
};
