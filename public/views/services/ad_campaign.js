import { useEffect } from "react";
 
export default function AdCompaignBox({ position, data, classes, settings }) {
    
    /*
    sponser_type ( html or object )
    sponser_data
      style
      data_ad_client
      data_ad_slot
      data_ad_format
      data_full_width_responsive
  */
    if (!data || !data.length) {
      return null;
    }
  
    const index = data.findIndex((x) => x.position === position);
    if (index === -1) {
      return null;
    }
  
    var campaignBox = data[index].code;
        campaignBox = `
          {
            sponser_type: 'object',
            sponser_data: {
                style: 'display:block; text-align:center;',
                data_ad_client: 'xxxx',
                data_ad_layout: 'xxxx',
                data_ad_slot: 'xxxx',
                data_ad_format: 'xxxx',
                data_full_width_responsive: 
            }
          }
        `

      return <b></b>;
    //const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';  
    //return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: campaignBox }} />;
    
  }