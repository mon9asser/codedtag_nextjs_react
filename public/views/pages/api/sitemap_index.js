import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {
    // Using your custom Helper.sendRequest to fetch the JSON data
    const reqs = await Helper.sendRequest({
      api: 'sitemap_index', // Path relative to the base URL in Helper
      method: 'get',
    });
    
    var response = await reqs.json();

    if (!response.sitemapindex || !Array.isArray(response.sitemapindex)) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }

    // Convert JSON to XML
    const xmlData = response.sitemapindex.map(sitemap => {
      return `
        <sitemap>
          <loc>${sitemap.loc}</loc>
        </sitemap>
      `;
    }).join("");

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${xmlData}
      </sitemapindex>`;

    // Set the response header to XML
    res.setHeader('Content-Type', 'application/xml');
    // Send the XML data as the response
    return res.send(sitemapIndex.trim());
  } catch (error) {
    console.error('Error fetching sitemap index:', error);
    // Handle errors
    res.status(500).send('Error fetching sitemap index');
  }
}
