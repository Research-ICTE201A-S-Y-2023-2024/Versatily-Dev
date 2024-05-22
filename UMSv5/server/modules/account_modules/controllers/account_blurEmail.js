import { jwtDecode } from "jwt-decode";

// Function to blur the email
const blurEmailReceived = (email) => {
    // Split the email into parts before and after the '@' symbol
    const [firstPart, secondPart] = email.split('@');
    
    // Replace all characters in the first part except the first two with 'x'
    const blurredFirstPart = firstPart.substring(0, 2) + 'x'.repeat(firstPart.length - 2);
    
    // Reassemble the email and return it
    return blurredFirstPart + '@' + secondPart;
}

export const blurEmail = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);

        // Extract the email from the decoded token
        const { email } = decodedToken;

        // Blur the email
        const blurredEmail = blurEmailReceived(email);

        // Return the blurred email in the response
        res.json({ blurredEmail });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};