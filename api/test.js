export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Return environment variable status (without exposing actual values)
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: {
      EMAIL_USER_SET: !!process.env.EMAIL_USER,
      EMAIL_PASS_SET: !!process.env.EMAIL_PASS,
      NODE_ENV: process.env.NODE_ENV || 'development'
    },
    message: 'Test endpoint working. Check environment variables status above.'
  });
}
