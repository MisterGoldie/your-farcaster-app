import axios from 'axios';

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function createFrame(content: string) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            ${content}
        </head>
        <body></body>
        </html>
    `;
}

export async function validateWithNeynar(messageBytes: string) {
    try {
        const response = await axios.post(
            'https://api.neynar.com/v2/farcaster/frame/validate',
            { message_bytes_in_hex: messageBytes },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api_key': process.env.NEYNAR_API_KEY
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error validating with Neynar:', error);
        throw error;
    }
}