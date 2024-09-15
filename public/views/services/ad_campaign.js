import { useEffect } from "react";
import Adsense from '@ctrl/react-adsense';

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