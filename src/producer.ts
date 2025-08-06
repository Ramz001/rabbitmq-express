import amqp from 'amqplib';

export const runProducer = async (): Promise<void> => {
  const connection = await amqp.connect('amqp://guest:admin@localhost');
  const channel = await connection.createChannel();

  const sendMessage = async (queue: string, message: string): Promise<void> => {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to ${queue}: ${message}`);
  };

  const sendNotification = async (queue: string, payload: any): Promise<void> => {
    const message = JSON.stringify(payload);
    await sendMessage(queue, message);
  };

  // Example usage
  const emailPayload = {
    to: 'receiver@example.com',
    from: 'sender@example.com',
    subject: 'Sample Email',
    body: 'This is a sample email notification',
  };
  await sendNotification('email-queue', emailPayload);

  const smsPayload = {
    phoneNumber: '1234567890',
    message: 'This is a sample SMS notification',
  };
  await sendNotification('sms-queue', smsPayload);

  await channel.close();
  await connection.close();
};