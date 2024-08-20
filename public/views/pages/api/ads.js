import { Helper } from '../../services/helper';

export default async function handler(req, res) {
  try {
    // Using your custom Helper.sendRequest to fetch the JSON data
    const reqs = await Helper.sendRequest({
      api: '/ads', // Path relative to the base URL in Helper
      method: 'get',
    });

    var response = await reqs.json();

    if (!response.success || !response.data || typeof response.data.content !== 'string') {
      return res.status(400).json({ error: "Invalid JSON format" });
    }

    // Set the response header to plain text
    res.setHeader('Content-Type', 'text/plain');
    // Send the ads.txt content as the response
    return res.send(response.data.content);
  } catch (error) {
    console.error('Error fetching ads.txt content:', error);
    // Handle errors
    res.status(500).send('Error fetching ads.txt content');
  }
}
