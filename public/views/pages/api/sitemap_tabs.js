import { Helper } from '../../services/helper';
import Config from '../../services/config';

export default async function handler(req, res) {
  try {
    // Using your custom Helper.sendRequest to fetch the JSON data
    const reqs = await Helper.sendRequest({
      api: 'sitemap_tabs', // Path relative to the base URL in Helper
      method: 'get', 
    });
    
    var response = await reqs.json();

    if (!response.urlset || !Array.isArray(response.urlset)) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }

    // Convert JSON to XML
    const xmlData = response.urlset.map(urlData => {
      return `
        <url>
          <loc>${urlData.loc}</loc> 
          <changefreq>${urlData.changefreq}</changefreq>
          <priority>${urlData.priority}</priority>
        </url> 
      `;
    }).join("");

    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${xmlData}
      </urlset>
    `;

    // Set the response header to XML
    res.setHeader('Content-Type', 'application/xml');
    // Send the XML data as the response
    return res.send(sitemap.trim());
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    // Handle errors
    res.status(500).send('Error fetching sitemap');
  }
}
