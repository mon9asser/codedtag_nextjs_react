import { useEffect } from "react";
 
export default function AdCompaignBox({ position, data, classes, settings }) {
  
    useEffect(() => {
      if (adsbygoogle && !adsbygoogle.loaded)
        (adsbygoogle = window.adsbygoogle || []).push({});
    }, []);
  
  
    if (!data || !data.length) {
      return null;
    }
  
    const index = data.findIndex((x) => x.position === position);
    if (index === -1) {
      return null;
    }
  
    const campaignBox = data[index].code;
    const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';  
    return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: campaignBox }} />;
    
  }