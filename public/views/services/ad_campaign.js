export default function AdCompaignBox({ position, data, classes, settings }) {
  
    useEffect(() => {
      
      const intervalId = setInterval(() => {
        try {
          if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error pushing ads: ", err);
          clearInterval(intervalId); // Clear interval in case of errors
        }
      }, 100);
  
      return () => clearInterval(intervalId); // Cleanup on unmount
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