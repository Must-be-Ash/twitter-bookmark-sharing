import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendWeeklyNewsletter(to: string, from: string, content: string) {
  const msg = {
    to,
    from,
    subject: 'Your Weekly Twitter Bookmarks',
    html: content,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}