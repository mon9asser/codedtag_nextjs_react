import { Helper } from '../../services/helper';

export default async function handler(req, res) {
    
    // Using your custom Helper.sendRequest to fetch the JSON data
    const reqs = await Helper.sendRequest({
        api: '/site_options', // Path relative to the base URL in Helper
        method: 'get',
    });

};