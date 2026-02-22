import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { projectName, twitterHandle, communityLink, package: pkg, contact } = req.body;

  // Validate inputs
  if (!projectName || !twitterHandle || !communityLink || !pkg || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send email to admin via Resend
    const { data, error } = await resend.emails.send({
      from: 'bookings@sapphires.com',
      to: ADMIN_EMAIL,
      subject: `New Booking Request: ${projectName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #117cb4;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Project Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${projectName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Twitter Handle:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${twitterHandle}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Link:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="${communityLink}">${communityLink}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Package:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${pkg}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Contact:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${contact}</td>
            </tr>
          </table>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is an automated booking notification from SAPPHIRES.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }

    return res.status(200).json({ success: true, messageId: data?.id });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
