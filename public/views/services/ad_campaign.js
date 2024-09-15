import { useEffect, useState } from "react"; 

/*

function AdCompaignBoxOld({ position, data, classes, settings }) {
    
  
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
              "sponser_type": "object",
              "sponser_data": {
                "style": "display:block; text-align:center;",
                "data-ad-client": "xxxx",
                "data-ad-layout": "xxxx",
                "data-ad-slot": "xxxx",
                "data-ad-format": "xxxx",
                "data-full-width-responsive": true
              }
            }
          `
        var props_data = null;
      try {
        props_data = JSON.parse(campaignBox);
      } catch (error) {
        return <i style={{background: '#f7e4e1', border: '1px solid red', color: 'red', width:'100%', height: '50px', display:'flex', flexDirection:'rows', justifyContent: 'center', alignItems:'center'}}>Sponsor ad box.</i>; 
      }
  
      const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';
  
      if( props_data.sponser_type == 'object' ) {
          return <ins class="adsbygoogle" {...props_data.sponser_data}></ins>
      }
        
      return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: props_data.sponser_data }} />;
      
  }

*/


/*
export default function AdCompaignBox({ position, data, classes, settings }) {
  if (!data || !data.length) {
    return null;
  }

  const index = data.findIndex((x) => x.position === position);
  if (index === -1) {
    return null;
  }

  var campaignBox = data[index].code; 
  var props_data = null;
  try {
    props_data = JSON.parse(campaignBox);
  } catch (error) {
    return (
      <i
        style={{
          background: '#f7e4e1',
          border: '1px solid red',
          color: 'red',
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Sponsor ad box.
      </i>
    );
  }

  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';

  if (props_data.sponser_type === 'object') {
    const { style, ...otherProps } = props_data.sponser_data;

    // Convert style string to a React-compatible object with camelCase properties
    const styleObject = {};
    style.split(';').forEach((item) => {
      const [property, value] = item.split(':');
      if (property && value) {
        const camelCaseProperty = property.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styleObject[camelCaseProperty] = value.trim();
      }
    });

    const dataAttributes = Object.keys(otherProps).reduce((acc, key) => {
      if (key.startsWith('data-')) {
        acc[key] = otherProps[key];
      }
      return acc;
    }, {});

    return <div className={combinedClasses}><ins className="adsbygoogle" style={styleObject} {...dataAttributes}></ins></div>;
  }

  return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: props_data.sponser_data }} />;
}
*/


export default function AdCompaignBox({ position, data, classes, settings }) {
   
  const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);
  
  if (!data || !data.length) {
    return null;
  }

  const index = data.findIndex((x) => x.position === position);
  if (index === -1) {
    return null;
  }
  
  useEffect(() => {
    
   
    if( props_data.sponser_type === 'object' ) {

      if( !settings.google_ads.enabled  ) { 
        return;
      } 

      // Check if the AdSense script is already present by id
      const isAdSenseScriptPresent = document.getElementById('adsbygoogle-script-tag');
      
      // Check if window.adsbygoogle is available (script fully loaded)
      const isAdSenseInitialized = typeof window !== 'undefined' && window.adsbygoogle;
      
      if (!isAdSenseScriptPresent || !isAdSenseInitialized) {
        const script = document.createElement('script');
              script.id = 'adsbygoogle-script-tag';
              script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google_ads.field}`;
              script.async = true;
              script.crossOrigin = 'anonymous';
              script.onload = () => {
                // Now that the script has loaded, check again if window.adsbygoogle is available
                if (typeof window.adsbygoogle !== 'undefined') {
                  setIsAdSenseLoaded(true);
                }
              };
              document.body.appendChild(script); 
      } else {
        setIsAdSenseLoaded(true);
      }
    
    }

  }, [])
  
  var campaignBox = data[index].code; 
  var props_data = null;
  try {
    props_data = JSON.parse(campaignBox);
  } catch (error) {
    return (
      <i
        style={{
          background: '#f7e4e1',
          border: '1px solid red',
          color: 'red',
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Sponsor ad box.
      </i>
    );
  }

  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';

  if (props_data.sponser_type === 'object') {

    if( !settings.google_ads.enabled  ) { 
      return null;
    } 

    const { style, ...otherProps } = props_data.sponser_data;

    // Convert style string to a React-compatible object with camelCase properties
    const styleObject = {};
    style.split(';').forEach((item) => {
      const [property, value] = item.split(':');
      if (property && value) {
        const camelCaseProperty = property.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styleObject[camelCaseProperty] = value.trim();
      }
    });

    const dataAttributes = Object.keys(otherProps).reduce((acc, key) => {
      if (key.startsWith('data-')) {
        acc[key] = otherProps[key];
      }
      return acc;
    }, {});

    return (
      <div className={combinedClasses}>
        <ins className="adsbygoogle" style={styleObject} {...dataAttributes}></ins>
        {isAdSenseLoaded && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
            }}
          />
        )}
      </div>
    ); 
  }

  return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: props_data.sponser_data }} />;
}



/*
export default function AdCompaignBox({ position, data, classes, settings }) {
  if (!data || !data.length) {
    return null;
  }

  const index = data.findIndex((x) => x.position === position);
  if (index === -1) {
    return null;
  }

  var campaignBox = data[index].code; 
  var props_data = null;
  try {
    props_data = JSON.parse(campaignBox);
  } catch (error) {
    return (
      <i
        style={{
          background: '#f7e4e1',
          border: '1px solid red',
          color: 'red',
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'rows',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Sponsor ad box.
      </i>
    );
  }

  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';

  if (props_data.sponser_type === 'object') {
    
    const { style, ...otherProps } = props_data.sponser_data;

    // Convert style string to a React-compatible object with camelCase properties
    const styleObject = {};
    style.split(';').forEach((item) => {
      const [property, value] = item.split(':');
      if (property && value) {
        const camelCaseProperty = property.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styleObject[camelCaseProperty] = value.trim();
      }
    });

    // Extract the last part after the '-' from data-* attributes and map them to Adsense props
    const dataAttributes = Object.keys(otherProps).reduce((acc, key) => {
      if (key.startsWith('data-')) {
        const propKey = key.split('-').pop(); // Extract the last part after '-'
        acc[propKey] = otherProps[key]; // Map the last slug to the prop
      }
      return acc;
    }, {});
     
    return <div className={combinedClasses}>
      <Adsense style={styleObject} {...dataAttributes} />
    </div>;
  }

  return <div className={combinedClasses} dangerouslySetInnerHTML={{ __html: props_data.sponser_data }} />;
}

*/