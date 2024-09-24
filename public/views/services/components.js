import { useState, useRef, createElement, useEffect } from "react";
import { useRouter } from 'next/router';
import { Fragment } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Helper =  dynamic(() => import('./helper'), { ssr: false });

import Head from "next/head";
import Highlight from 'react-highlight'
import Image from "next/image"; 

 
const AdCompaignBox = dynamic(() => import("./../services/ad_campaign"), {
    ssr: false,
});

import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from 'react-share';

function ServerOffline() {
  return (
    <>
      <Head>
        <title>500: Server Offline</title>
      </Head>
      <div className="error-500">
        <h1>500</h1>
        <h2>Server Offline</h2>
        <p>When the server goes offline, it disrupts access to the website. This issue can stem from various causes, including maintenance, technical failures, or unexpected traffic spikes.</p>
      </div>
    </>
  );
}

function SearchComponent ({searchType}) {
    
    var [query, setQuery] = useState('');
    var [is_pressed, setIsPressed] = useState(false);
 
    const router = useRouter();

    var sendRequest = (e) => {
        e.preventDefault(); 
        setIsPressed(true);
        setTimeout(() => {
          setIsPressed(false);
          router.push(`/search?q=${query}`)
        }, 3000)
        
    }

    // seach components 
    var render = (
      <form className="search-form" style={{marginTop: '25px'}}>
          <input onChange={e => setQuery(e.target.value)} value={query} type="text" placeholder="What are you looking for?" />
          <button onClick={sendRequest} className="btn third-btn radius-5 custom-header-btn">
            {is_pressed?<span className='loader'></span>: 'Search'}
          </button>
      </form>
    );

    // sidebar seach components 
    if( searchType == 'sidebar' ) {
      render = (
        <form className="form-group form-1" action="/" method="get">
            <input onChange={e => setQuery(e.target.value)} value={query} type="text" placeholder="Search in our tutorials" />
            <button onClick={sendRequest} type="submit">
                {is_pressed?<span className='loader black-loader'></span>: <span className="flexbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" className="stroke-color" stroke="#33363F" strokeWidth="2" />
                        <path d="M20 20L17 17" className="stroke-color" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>}
                
            </button>
        </form>
      );
    }

    return render;

}

function AdCompaignBoxOld({ position, data, classes }) {

  const adRef = useRef(null);

  if (!data) {
    return null;
  }

  const index = data.findIndex(x => x.position === position);
  if (index === -1) {
    return null;
  }

  useEffect(() => {
    if (!adRef.current) return;

    const box = data[index].code;
    adRef.current.innerHTML = box;
    
    const scripts = adRef.current.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      script.parentNode.replaceChild(newScript, script);
    });
  }, [data, index]);

  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';

  return <div className={combinedClasses} ref={adRef}></div>;
};

 



var GenerateTutorialContent_tab = ({ data, upcoming, built_url, ad_camp }) => {
  // Split the data by the delimiter "|"
  const parts = data.split('|').map(part => part.trim());

  // Process the parts to create the appropriate elements
  return (
    <>
      {parts.map((part, index) => {
        // YouTube shortcode
        if (part.startsWith('[youtube')) {
          const src = part.match(/src="([^"]+)"/)[1];
          return (
            <Fragment key={index}>
                <div className="mt-25">
                  <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                </div>

                <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={'after_youtube_video_content_1'}/> 
            </Fragment>
          );
        }
        // Headline shortcodes from h1 to h6
        else if (part.match(/^\[h[1-6]/)) {
          const tag = part.match(/^\[h([1-6])/)[1];
          const content = part.replace(/^\[h[1-6]\]/, '').trim();
          const TagName = `h${tag}`;
          return <TagName key={index} className="tutorial-subheadline">{Helper.decodeHtmlEntities(content)}</TagName>;
        }
        // Chapters and posts shortcode
        else if (part.startsWith('[chapters-posts]')) {
          if(upcoming != undefined )
            return <TutorialLinks key={index} ad_camp={ad_camp} built_url={built_url} upcoming={upcoming} />;
        } 
        // Default case: plain paragraph
        else {
          return (
            <p key={index} className="tutorial-description text-center">
              {part}
            </p>
          );
        }
      })}

      <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={'after_tutorial_description_1'}/>
    </>
  );
}

var FeedBackBlock = ({data_id, data_title, feeadback_title }) => {

  feeadback_title = feeadback_title == undefined ? 'Did you find this tutorial useful?': feeadback_title;
  const textareaRef = useRef(null);

  var [feedback, feedback_change] = useState({
    thumb: null, 
    comment: '', 
    data_id: data_id,
    data_title: data_title
  });

  

  const [isDisabled, setIsDisabled] = useState(false);
  var [data, data_change] = useState({
    is_pressed: false, 
    message: "",
    type: "", // error, success 
    exposed: 'none-display',
    press_type: 'comment',
    hide_form: 'hide'
  })

  // functions  
  var changed_data_callback = (obj) => {
      var old_objec = {...data};
      var __keys = Object.keys(obj);
      __keys.map(x => {
          old_objec[x] = obj[x]
      }); 
      data_change(old_objec);
  } 

  var changed_feedback_callback = (obj) => {
      var old_objec = {...feedback};
      var __keys = Object.keys(obj);
      __keys.map(x => {
          old_objec[x] = obj[x]
      }); 
       
      feedback_change(old_objec);
  } 

  var submit_feedback = async (e, presstype ) => {
  
      e.preventDefault();  
      
      changed_data_callback({
        press_type: presstype,
        is_pressed: true
      })
      
      // console.log(feedback);
      var res = await Helper.sendRequest({
        api: "comments/create-update",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(feedback), 
        method: "post"
      }); 

      var response =  await res.json(); 
       
      if( presstype == 'comment' ) {
        
        if( response.is_error ) {
          changed_data_callback({
            message: 'Unable to send your feedback due to an error.',
            type: 'error',
            exposed: '', 
            is_pressed: false
          })

          return;
        }
        
        setIsDisabled(true);
        changed_data_callback({
          message: 'Thank you for your feedback! We will address the issue promptly.',
          type: 'success',
          exposed: '', 
          is_pressed: false
        })

        return;
      }

      if( response.is_error ) {
        changed_data_callback({
          press_type: presstype,
          is_pressed: false
        })
        return; 
      }

      setIsDisabled(true); 
      changed_data_callback({ 
        is_pressed: false,
        hide_form: 'hide'
      })
      
  }

  

  var thumbUpHandler = ( e, press_type ) => {
   

      feedback.thumb= true;

      //console.log(feedback);
      setTimeout(() => submit_feedback(e, press_type), 100);
      e.preventDefault();

  }

  var thumbDownHandler = ( e, press_type ) => {
      
      
      // it only show input text
      changed_feedback_callback({thumb: false }) 
      changed_data_callback({hide_form: ''});

      setTimeout(() => {
        // setIsDisabled(true);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50)

      // submit_feedback(e, press_type)
      e.preventDefault();


  }   


  var ThumbUp = () => (
      <svg height="25" width="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z"/></svg>
  )
  
  var ThumbDown = () => (
      <svg height="25" width="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 576q0 26-19 45t-45 19q-27 0-45.5-19t-18.5-45q0-27 18.5-45.5t45.5-18.5q26 0 45 18.5t19 45.5zm160 512v-640q0-26-19-45t-45-19h-288q-26 0-45 19t-19 45v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22 10 18q18 37 27 57t19 58.5 10 76.5q0 24-.5 39t-5 45-12 50-24 45-40 40.5-60 26-82.5 10.5q-26 0-45-19-20-20-34-50t-19.5-52-12.5-61q-9-42-13.5-60.5t-17.5-48.5-31-48q-33-33-101-120-49-64-101-121t-76-59q-25-2-43-20.5t-18-43.5v-641q0-26 19-44.5t45-19.5q35-1 158-44 77-26 120.5-39.5t121.5-29 144-15.5h129q133 2 197 78 58 69 49 181 39 37 54 94 17 61 0 117 46 61 43 137 0 32-15 76z"/></svg>
  )
  
  return (
      <div className="feedback-block max-1050 update-sider">
          <div className="flexbox direction-row items-center space-between flex-wrap">
              <div className="ptb-10">
                  <h3>{feeadback_title}</h3>
              </div>
              <div className="flexbox direction-row gap-15 ptb-10">
                  

                  <button disabled={isDisabled} style={{padding: 0}} className={`x-thumb-down ${isDisabled ? 'disable-feedback': ''}`} onClick={e => thumbDownHandler(e, "thumb-down")}>
                      
                      {
                        data.is_pressed && data.press_type == 'thumb-down' ?
                        <span className='loader' style={{borderBottomColor: '#f9756e'}}></span> :
                        <ThumbDown/>
                      }  
                      
                  </button>

                  <button disabled={isDisabled} style={{padding: 0}} className={`x-thumb-up ${isDisabled ? 'disable-feedback': ''}`} onClick={e => thumbUpHandler(e, "thumb-up")}>
                      {
                        data.is_pressed && data.press_type == 'thumb-up' ?
                        <span className='loader' style={{borderBottomColor: '#00bec4'}}></span> :
                        <ThumbUp/>
                      }  
                  </button>
              </div>
          </div>
           
          <div className={`feedback-form-block ${data.hide_form}`}> 
              <p className="mb-8" style={{marginBottom: '10px'}}>Your feedback helps us improve our tutorials.</p>
              <textarea
                  ref={textareaRef}
                  onChange={e => changed_feedback_callback({comment: e.target.value})}
                  value={feedback.comment}
                  placeholder="write your feedback here!">
              </textarea>
              <div className={`feedback-response msg-${data.type} ${data.exposed}`}>
                <p>{data.message}</p>
              </div>
              <button disabled={isDisabled} type="submit" onClick={e => submit_feedback(e, "comment")} className="btn third-btn radius-5 custom-header-btn auto-left">
                {
                  data.is_pressed && data.press_type == 'comment' ?
                  <span className='loader'></span> :
                  'Submit'
                }   
              </button>
          </div>
           
      
      </div>
  );

}

function SubscribeComponents ({is_footer, title, description, camp_data, settings }) {

  var main_settings = settings; 
  
  var is_middle = false; 
  if( settings != undefined && settings.banner_image_url == "" ) {
    is_middle = true; 
  }

  var [email, setEmail] = useState('')
  var [result, setRestult] = useState({
      message: '',
      cls: '', // show
      type: '',  // error - success
      is_pressed: false
  });

  var response_results_callback = (obj) => {
      var old_objec = {...result};
      var __keys = Object.keys(obj);
      __keys.map(x => {
          old_objec[x] = obj[x]
      }); 
      setRestult(old_objec);
  } 
 
  var send_data = (e) => {
    
    e.preventDefault();

    response_results_callback({ 
      is_pressed: true
    }); 

    Helper.sendRequest({
      api: 'user/subscribe',
      data: {
        email: email
      },
      method: 'post'
    }).then( async row => {
      
      var res =  await row.json(); 
      var to_be_state = {};
      to_be_state.message= res.data;
      to_be_state.cls= 'show';
      to_be_state.is_pressed= false;

      if( res.is_error ) { 
        to_be_state.type= 'error';
      } else {
        to_be_state.type= 'success';
      }
      //console.log(to_be_state, res)
      response_results_callback(to_be_state);

      setTimeout(() => {
        response_results_callback({
          message: '',
          cls: '',
          type: ''
        });
      }, 3000)

    });


  }
  
  return (
    <>
      {
        is_footer ?
        <h2 className="title">{title}</h2> :
        <h1 className="custom-headline section-head" dangerouslySetInnerHTML={{__html: title}} />  
      }

      {
        is_footer ?
        <p className="font-16 pb-15">{description}</p> :
        <p>{description}</p>  
      }
      
      


      <div style={is_middle ? {margin: "0 auto"}: {}}>
        <div className={`response-msg ${result.cls} ${result.type}`}>{result.message}</div>
          
          {
            is_footer ? '':
            <AdCompaignBox settings={main_settings} position="before_subscribe" data={camp_data}/> 
          }
          
          <form className="set-center form-group set-focus" action="/" method="get"> 
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" />
              <button className="btn primary-btn" type="submit" onClick={send_data}>
                {
                  result.is_pressed ?
                  <span className='loader'></span>: 
                  'Subscribe'
                }
              </button>
          </form>
          {
            is_footer ? '':
            <AdCompaignBox settings={main_settings} position="after_subscribe" data={camp_data}/> 
          }
          
        </div>
    </>
  )
}



var TutorialLinks = ({upcoming, built_url, ad_camp}) => {
  
  var counter_ads = 0;
  var ads_every = upcoming.settings?.ads_between_navs_in_chapters ?upcoming.settings.ads_between_navs_in_chapters: 4;
  return (
      <div className="wrapper chapter-elements max-1150 offset-left offset-right mt-30 flexbox gap-20 flex-wrap content-center"> 
                      
                  
          {
              upcoming.chapters.length ?
              (
                  upcoming.chapters.map(( chapter, k) => {

                      //counter_ads
                      if( k % ads_every == 0) {
                        counter_ads++;
                      }
                       
                      return ( 
                        <Fragment key={chapter._id} > 
                          { (k % ads_every == 0 ) &&  <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={`between_row_ad_${counter_ads}`}/>}
                          <TutorialsList built_url={built_url} data={chapter.posts} chapter_title={chapter.chapter_title} index={k}/>
                        </Fragment>
                       );
                  })
              ) :
              (
                  upcoming.posts.length ?
                      Helper.chunkArray(upcoming.posts, 3 ).map(( posts, k) => {
                          //counter_ads
                          if( k % ads_every == 0) {
                            counter_ads++;
                          }
                          return ( 
                          <Fragment key={k} >
                              { (k % ads_every == 0 ) &&  <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={`between_row_ad_${counter_ads}`}/>}
                              <TutorialsList built_url={built_url} data={posts} index={k}/>
                           </Fragment>
                        );
                      })
                  : ""
              )
          }
          
      </div>
  );
}


var GenerateTutorialContent_2 = ({ data, upcoming, built_url, ad_camp }) => {

  // Split the data by the delimiter "|"
  const parts = data.split('|').map(part => part.trim());

  // Process the parts to create the appropriate elements
  return (
    <>
      {parts.map((part, index) => {
        // YouTube shortcode
        if (part.startsWith('[youtube')) {
          const src = part.match(/src="([^"]+)"/)[1];
          return (
            <Fragment key={index}>
                <div className="mt-25">
                  <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                </div> 
                 <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={'after_youtube_video_content_2'}/>
            </Fragment>
          );
        }
        // Headline shortcodes from h1 to h6
        else if (part.match(/^\[h[1-6]/)) {
          const tag = part.match(/^\[h([1-6])/)[1];
          const content = part.replace(/^\[h[1-6]\]/, '').trim();
          const TagName = `h${tag}`;
          return <TagName key={index} className="tutorial-subheadline">{Helper.decodeHtmlEntities(content)}</TagName>;
        }
        // Chapters and posts shortcode
        else if (part.startsWith('[chapters-posts]')) {
          if(upcoming != undefined )
            return <TutorialLinks ad_camp={ad_camp} key={index} built_url={built_url} upcoming={upcoming} />;
        } 
        // Default case: plain paragraph
        else {
          return (
            <p key={index} className="tutorial-description text-center">
              {part}
            </p>
          );
        }
      })} 
      
      <AdCompaignBox settings={upcoming.settings} classes='wrapper chapter-elements max-1150 offset-left offset-right mt-30 flexbox gap-20 flex-wrap content-center' data={ad_camp} position={'after_tutorial_description_2'}/>
    </>
  );

}

const StyledList = ({ data }) => {
  const { style, items } = data;

  return (
      <div className="list-container">
          {style === 'ordered' ? (
              <ol>
                  {items.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                  ))}
              </ol>
          ) : (
              <ul>
                  {items.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                  ))}
              </ul>
          )}
      </div>
  );
};

const ResponsiveTable = ({ data }) => {
  const { withHeadings, content } = data;

  return (
      <div className="table-container">
          <table className="table">
              <thead>
                  {withHeadings && (
                      <tr>
                          {content[0].map((heading, index) => (
                              <th key={index}>{Helper.decodeHtmlEntities(heading)}</th>
                          ))}
                      </tr>
                  )}
              </thead>
              <tbody>
                  {content.slice(withHeadings ? 1 : 0).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                              <td key={cellIndex} data-label={withHeadings ? content[0][cellIndex] : `Column ${cellIndex + 1}`} dangerouslySetInnerHTML={{__html: Helper.decodeHtmlEntities(cell)}}/>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}; 

var TutorialsList = ({ index, data, chapter_title, built_url }) => {
  
  return ( 
     
      <div className="container white-grey-bg category-container update-chpt">
           
           {
              chapter_title != undefined && chapter_title != '' ?
              <>
                  <span className="cats-number">{Helper.produceNumber(index)}</span>
                  <h2 className="category-headline">{chapter_title}</h2>
              </> : <span className="cats-number">{Helper.produceNumber(index)}</span>
           } 
           <div className="chapter-cont">
              <ul className="tuts-categ">
                  {data.map(x => <li key={x._id}><Link href={`${built_url}${x.slug}/`}>{ Helper.decodeHtmlEntities(x.post_title)}</Link></li>)} 
              </ul>
           </div>
      </div>

  );
}

function TutorialsContent({ blocks, tutorials, ad_camp, settings }){
  // console.log(ad_camp);
   var header_count = 0;
   var end_section = 0;

   return (
     <Fragment>
       {blocks?.map(( x, ind ) => {
         if (x.id !== 'header-level-1') { 
            
           switch (x.type) {
             case 'paragraph':
               return (
                 <p
                   key={x.id}
                   style={{ textAlign: x?.data?.alignment }}
                   dangerouslySetInnerHTML={{ __html: x?.data?.text }}
                 />
               );
             case 'code':
               return (
                 <Highlight key={x.id} className={x?.data?.language_type}>
                   {x?.data?.value}
                 </Highlight>
               );
             case 'image':
               return (
                 <figure key={x.id}>
                   <Image
                     className={x?.data?.stretched ? 'full' : ''}//half
                     alt={x?.data?.caption}
                     height={250}
                     src={x?.data?.file?.url}
                     width={x?.data?.file?.width}
                   />
                 </figure>
               );
             case 'header':
               header_count += 1;

               return <Fragment key={`${x.id}-block-header`}>
               <AdCompaignBox settings={settings}
                 key={`${x.id}-ad-before`}
                 position={`before_section_title_${header_count}`}
                 data={ad_camp}
               />
               {createElement(
                 `h${Math.min(Math.max(x?.data?.level, 1), 6)}`,
                 { key: `${x.id}-heading`, style: { textAlign: x?.data?.alignment } },
                 Helper.decodeHtmlEntities(x?.data?.text)
               )}
               <AdCompaignBox settings={settings}
                 key={`${x.id}-ad-after`}
                 position={`after_section_title_${header_count}`}
                 data={ad_camp}
               />
             </Fragment>;
             case 'youtubeEmbed':
               return <LazyLoadYouTube key={x.id} url={x.data?.url} />;
             case 'delimiter':
               return <hr key={x.id} />;
             case 'raw':
               return (
                 <Highlight key={x.id} className={'html'}>
                   {x?.data?.html}
                 </Highlight>
               );
             case 'table':
               return <ResponsiveTable key={x.id} data={x.data} />;
             case 'list':
               return <StyledList key={x.id} data={x.data} />;
             case 'tutorialsList':
               if (x.data.selectedValue === '') {
                 return null;
               }
               const filtered = tutorials.filter(
                 tut => tut.selected_category.id === x.data.selectedValue
               );
               if (filtered.length) {
                 end_section += 1;
                 return (
                   <Fragment key={`frage-box-${x.id}`}>

                     <div className="row mlr--15" key={x.id}>
                       {filtered.map(item => (
                         <div
                           key={item._id}
                           className="sm-6 md-4 lg-4 text-center p-all-15"
                         >
                           <div className="tutorial-box">
                             {item.tutorial_svg_icon !== '' && (
                               <i
                                 className="tutorial-thumbs"
                                 style={{ background: '#2d4756' }}
                                 dangerouslySetInnerHTML={{
                                   __html: item.tutorial_svg_icon,
                                 }}
                               />
                             )}
                             <h3>
                               <span>{item.tutorial_title}</span>
                               {item.duration !== '' && (
                                 <span className="subtitle">
                                   Duration:- {item.duration}
                                 </span>
                               )}
                             </h3>
                             <Link
                               className="floating-all"
                               href={`/tutorials/${item.slug}/`}
                             ></Link>
                           </div>
                         </div>
                       ))}
                     </div>

                     <AdCompaignBox settings={settings}
                       key={`${x.id}-ad-end-of-section`}
                       position={`end_of_category_section_${end_section}`}
                       data={ad_camp}
                     />

                   </Fragment>
                 );
               }
               return null;
             default:
               return null;
           }


           

         }
         return null;
       })}
     </Fragment>
   );
}


var LazyLoadYouTube = ({ url, width = '560', height = '315', cls='' }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const iframeRef = useRef();

  useEffect(() => {
      const observer = new IntersectionObserver(
          (entries) => {
              if (entries[0].isIntersecting) {
                  setIsIntersecting(true);
                  observer.disconnect();
              }
          },
          {
              rootMargin: '0px 0px 200px 0px' // Adjust this value as needed
          }
      );

      if (iframeRef.current) {
          observer.observe(iframeRef.current);
      }

      return () => {
          if (iframeRef.current) {
              observer.unobserve(iframeRef.current);
          }
      };
  }, []);

  return (
      <div ref={iframeRef} style={{ minHeight: height, minWidth: width }}>
          {isIntersecting ? (
              <iframe
                  className={cls}
                  width={width}
                  height={height}
                  src={`${url}`} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
              ></iframe>
          ) : (
              <div style={{ minHeight: height, minWidth: width, backgroundColor: '#000' }}></div>
          )}
      </div>
  );
}

var GenerateTutorialContent_1 = ({ data, upcoming, built_url, ad_camp }) => {
  // Split the data by the delimiter "|"
  const parts = data.split('|').map(part => part.trim());

  // Process the parts to create the appropriate elements
  return (
    <>
      {parts.map((part, index) => {
        // YouTube shortcode
        if (part.startsWith('[youtube')) {
          const src = part.match(/src="([^"]+)"/)[1];
          return (
            <Fragment key={index}>
                <div className="mt-25">
                  <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                </div>

                 <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={'after_youtube_video_content_1'}/> 
            </Fragment>
          );
        }
        // Headline shortcodes from h1 to h6
        else if (part.match(/^\[h[1-6]/)) {
          const tag = part.match(/^\[h([1-6])/)[1];
          const content = part.replace(/^\[h[1-6]\]/, '').trim();
          const TagName = `h${tag}`;
          return <TagName key={index} className="tutorial-subheadline">{Helper.decodeHtmlEntities(content)}</TagName>;
        }
        // Chapters and posts shortcode
        else if (part.startsWith('[chapters-posts]')) {
          if(upcoming != undefined )
            return <TutorialLinks key={index} ad_camp={ad_camp} built_url={built_url} upcoming={upcoming} />;
        } 
        // Default case: plain paragraph
        else {
          return (
            <p key={index} className="tutorial-description text-center">
              {part}
            </p>
          );
        }
      })}

       <AdCompaignBox settings={upcoming.settings} data={ad_camp} position={'after_tutorial_description_1'}/>
    </>
  );
}


var CustomShareIcon = ({ IconComponent, size, width, height }) => (
  <div style={{ borderRadius: '8px', overflow: 'hidden', width: width, height: height }}>
    <IconComponent size={size} />
  </div>
);

var SocialShare = ({platforms, url, title, radius, size, width, height}) => {
  if( size == undefined ) {
    size = 32;
  }

  if( width == undefined ) {
    width = '32px';
  }
  if( height == undefined ) {
    height = '32px';
  }
  return platforms.split(',').map((platform, index) => {
    const trimmedPlatform = platform.trim().toLowerCase();
    switch (trimmedPlatform) {
      case 'email':
        return (
          <EmailShareButton key={index} url={url} subject={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={EmailIcon} /> : <EmailIcon width={width} height={height} size={size} round />}
          </EmailShareButton>
        );
      case 'facebook':
        return (
          <FacebookShareButton key={index} url={url} quote={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={FacebookIcon} /> : <FacebookIcon width={width} height={height} size={size} round />}
          </FacebookShareButton>
        );
      case 'gab':
        return (
          <GabShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={GabIcon} /> : <GabIcon width={width} height={height} size={size} round />}
          </GabShareButton>
        );
      case 'hatena':
        return (
          <HatenaShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={HatenaIcon} /> : <HatenaIcon width={width} height={height} size={size} round />}
          </HatenaShareButton>
        );
      case 'instapaper':
        return (
          <InstapaperShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={InstapaperIcon} /> : <InstapaperIcon width={width} height={height} size={size} round />}
          </InstapaperShareButton>
        );
      case 'line':
        return (
          <LineShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={LineIcon} /> : <LineIcon width={width} height={height} size={size} round />}
          </LineShareButton>
        );
      case 'linkedin':
        return (
          <LinkedinShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={LinkedinIcon} /> : <LinkedinIcon width={width} height={height} size={size} round />}
          </LinkedinShareButton>
        );
      case 'livejournal':
        return (
          <LivejournalShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={LivejournalIcon} /> : <LivejournalIcon width={width} height={height} size={size} round />}
          </LivejournalShareButton>
        );
      case 'mailru':
        return (
          <MailruShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={MailruIcon} /> : <MailruIcon width={width} height={height} size={size} round />}
          </MailruShareButton>
        );
      case 'ok':
        return (
          <OKShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={OKIcon} /> : <OKIcon width={width} height={height} size={size} round />}
          </OKShareButton>
        );
      case 'pinterest':
        return (
          <PinterestShareButton key={index} url={url} media={url} description={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={PinterestIcon} /> : <PinterestIcon width={width} height={height} size={size} round />}
          </PinterestShareButton>
        );
      case 'pocket':
        return (
          <PocketShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={PocketIcon} /> : <PocketIcon width={width} height={height} size={size} round />}
          </PocketShareButton>
        );
      case 'reddit':
        return (
          <RedditShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={RedditIcon} /> : <RedditIcon width={width} height={height} size={size} round />}
          </RedditShareButton>
        );
      case 'telegram':
        return (
          <TelegramShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={TelegramIcon} /> : <TelegramIcon width={width} height={height} size={size} round />}
          </TelegramShareButton>
        );
      case 'tumblr':
        return (
          <TumblrShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={TumblrIcon} /> : <TumblrIcon width={width} height={height} size={size} round />}
          </TumblrShareButton>
        );
      case 'twitter':
        return (
          <TwitterShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={TwitterIcon} /> : <TwitterIcon width={width} height={height} size={size} round />}
          </TwitterShareButton>
        );
      case 'viber':
        return (
          <ViberShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={ViberIcon} /> : <ViberIcon width={width} height={height} size={size} round />}
          </ViberShareButton>
        );
      case 'vk':
        return (
          <VKShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={VKIcon} /> : <VKIcon width={width} height={height} size={size} round />}
          </VKShareButton>
        );
      case 'whatsapp':
        return (
          <WhatsappShareButton key={index} url={url} title={title} separator=":: " className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={WhatsappIcon} /> : <WhatsappIcon width={width} height={height} size={size} round />}
          </WhatsappShareButton>
        );
      case 'workplace':
        return (
          <WorkplaceShareButton key={index} url={url} title={title} className="social-share-button">
            {radius ? <CustomShareIcon width={width} height={height} size={size} IconComponent={WorkplaceIcon} /> : <WorkplaceIcon width={width} height={height} size={size} round />}
          </WorkplaceShareButton>
        );
      default:
        return null;
    }
  });
}


var ArticleContentSingle = ({blocks, helper}) => {
      
  var subheadings = blocks.filter(x => x.type == 'header' && x.id != 'header-level-1' ).map(x => ({
    href: Helper.generate_slugs(x?.data?.text),
    title: x?.data?.text
  }));

  var settings = null, ads = null; 
  if( helper != undefined ) {
    settings = helper.settings;
    ads = helper.ads;
  }
  
  if( ads == null ) ads = [];

  var words_every = settings?.ads_between_texts_every_words? settings.ads_between_texts_every_words: 500;

  var text_counter = 0;
  var ad_counter = 0;
  return(
    <>
      {blocks?.map((x, index) => {

        
        if(x.id != 'header-level-1') {
           
          // return <TableOfContent/>

          if( x.type == 'paragraph') { 
            
            text_counter += x.words_counts
            

            var ad_campaign_element = '';
            if( text_counter >= words_every ) {
              ad_counter++; 
              ad_campaign_element =  <AdCompaignBox settings={settings} data={ads} position={`inside_content_${ad_counter}`}/>;
              text_counter = 0;
            }
            
            return (
              <Fragment key={x.id}> 
                <p style={{textAlign:x?.data?.alignment}} dangerouslySetInnerHTML={{__html: x?.data?.text}}/>
                { ad_campaign_element }
                {
                  index == 1 && subheadings.length ? <TableOfContent data={subheadings}/>: ""
                }
                
              </Fragment>
            )
          } else if (x.type == 'code' ) {
            return (
              <Highlight key={x.id} className={x?.data?.language_type}>
                {x?.data?.value}
              </Highlight>
            )
          } else if (x.type == 'image') {
            return (
              <figure key={x.id}> 
                    <Image
                        className={x?.data?.stretched ? 'full': ''}//half
                        alt={x?.data?.caption}
                        height={250}
                        src={x?.data?.file?.url} // use normal <img> attributes as props
                        width={x?.data?.file?.width} /> 
              </figure>
            )
          } else if (x.type == 'header') { 

            return ( 
              createElement(`h${Math.min(Math.max(x?.data?.level, 1), 6)}`, {key: x.id, id:Helper.generate_slugs(`section-${x?.data?.text}`), style:{textAlign: x?.data?.alignment }}, Helper.decodeHtmlEntities(x?.data?.text))
            )

          } else if (x.type == 'youtubeEmbed') {
            return (<LazyLoadYouTube key={x.id} url={x.data?.url} height='500'/>);
          } else if (x.type == 'delimiter') {
            return (<hr key={x.id} />)
          } else if (x.type == 'raw') {
            return (
              <Highlight key={x.id} className={'html'}>
                {x?.data?.html}
              </Highlight>
            )
          } else if (x.type == 'table') {
            return <ResponsiveTable key={x.id} data={x.data} />
          } else if (x.type == 'list') {
            return <StyledList key={x.id} data={x.data} />
          } else if (x.type == 'customImage') {
             
            return (
              <figure key={x.id}> 
                    <Image
                        className={x?.data?.stretched ? 'full': ''}//half
                        alt={x?.data?.alt}
                        height={320}
                        src={x?.data?.url} // use normal <img> attributes as props
                        width={400} /> 
              </figure>
            )
          }

        } 

      })}
    </>
  );     
}

var NextPrevPagination = ({site_url, tutorial_slug, type, data, current_post_slug}) => {
     
      
  var posts = data; 
  if(type == 'chapters') {
    posts = data.map(x => x.posts).flat();
  }

  // get current index;
  var index = posts.findIndex( x => x.slug == current_post_slug );

  
  var nex_index = index + 1;
  var prev_index = index - 1;


  var next = posts[nex_index];
  var prev = posts[prev_index]
  
  var next_link = next == undefined ? '':`${site_url}tutorials/${tutorial_slug}/${next.slug}/`;
  var prev_link = prev == undefined ? '':`${site_url}tutorials/${tutorial_slug}/${prev.slug}/`;

  return (
    <div className="flexbox space-between pagination">
        
        {
          
          ( prev == undefined ) ? '':
        
        <Link href={prev_link} className="flexbox direction-row items-center hover-to-left">
            <i className="left-arrow-pagin"></i>
            <span>
                <span className="d-none d-sm-block">{Helper.decodeHtmlEntities(prev.post_title)}</span> 
                <span className="d-block d-sm-none">Prev</span> 
            </span>
        </Link> 
        } 

        {
          
          ( next == undefined ) ? '':
          <Link href={next_link} className="flexbox direction-row items-center hover-to-right auto-right">
              <span>
                  <span className="d-none d-sm-block">{Helper.decodeHtmlEntities(next.post_title)}</span> 
                  <span className="d-block d-sm-none">Next</span>
              </span>
              <i className="right-arrow-pagin"></i>
          </Link> 
        }
    </div>
  );
}

var Breadcrumbs = ({data}) => {
  return (
    <ul className="breadcrumbs">
        {data.map((x, index) => <li key={index} className='sub-title'><Link href={x.url}>{Helper.decodeHtmlEntities(x.title)}</Link></li>)}
    </ul>
  );
}

var ArticleSidebar = ({type, data, site_url, tutorial_slug, current_post_slug, tab_slug, helper}) => {

  var settings = null, ads = []; 
  if( helper != undefined ) {
    ads = helper.ads
    settings = helper.settings
  } 

  var collapsed_item = (e, id) => {
    
    e.preventDefault();

    var doc_id = document.querySelector(`#item-${id}`); 
    var anchor = document.querySelector(`#anchor-${id}`); 
    

    if( doc_id.classList.contains('expanded') ) {
      anchor.classList.remove('expanded-a')
      doc_id.classList.remove('expanded'); 
    } else {
      doc_id.classList.add('expanded');
      anchor.classList.add('expanded-a')
    }
      
  }

  var posts = [];
  if( type == 'posts' ) {
    if(data.length)
      posts = Helper.chunkArray(data, settings.ads_between_navs_every_list ) 
  }

  var chapters = []; 
  if( type == 'chapters' ) {
    if(data.length)
      chapters = Helper.chunkArray(data, settings.ads_between_navs_every_list ) 
  } 

  var elem_list = 0;


  
  var itemComponents = (
    <>

      {/* Chapters */}
      {type === 'chapters' ? 
        // split chapters according to ads 
         

        chapters.map( (chapterData, indexer) => {
          
          elem_list++;

          return (
            <Fragment key={indexer}>
              <ul key={indexer} className="block-list custom-aside-tuts">

                {chapterData.map(chapter => {
                  var link_url = `${site_url}tutorials/${tutorial_slug}/`;
                  if( tab_slug != undefined ) {
                    link_url = `${link_url}t/${tab_slug}/`
                  }
                  
                  var is_expaned = chapter.posts.findIndex( x => x.slug == current_post_slug) != -1;

                  return (
                    <Fragment key={chapter._id}>
                      {chapter.chapter_title !== "" ? (

                        <>
                          <li className={`${chapter.posts.length ? 'has-slideitem' : ''}`}>
                            <Link className={` ${is_expaned ? 'expanded-a': ''}`} id={`anchor-${chapter._id}`} onClick={e => collapsed_item(e, `${chapter._id}`)} href="#">{chapter.chapter_title}</Link>
                            {chapter.posts.length ? (
                              <ul id={`item-${chapter._id}`} className={`collapsible list-items ${is_expaned ? 'expanded': ''}`}>
                                {chapter.posts.map(x => (
                                  <li key={x._id}>
                                    <Link className={current_post_slug == x.slug ? 'selected_tab': ''} href={`${link_url}${x.slug}/`}>{Helper.decodeHtmlEntities(x.post_title)}</Link>
                                  </li>
                                ))} 
                                
                              </ul>
                            ) : null}
                          </li> 
                        </>
                        
                      ) : (
                        <li>
                          <ul className="block-list custom-aside-tuts list-items">
                            {chapter.posts.map(x => (
                              <li key={x._id}>
                                <Link className={current_post_slug == x.slug ? 'selected_tab': ''} href={`${link_url}${x.slug}/`}>{Helper.decodeHtmlEntities(x.post_title)}</Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Fragment>
                  );
                })}

              </ul>
               
               <AdCompaignBox settings={settings} data={ads} position={`in_sidebar_${elem_list}`}/>
                
            </Fragment>
          )

        })
       
      : ''}
      
      {/* Posts */} 
      {
        (type == 'posts') ?
        posts.map( (x, index) =>{
          
          if(  x.length >= settings.ads_between_navs_every_list )
            elem_list++;

          return  (
            <Fragment key={index} >
              <ul className="block-list custom-aside-tuts list-items">
                {
                  x.map(post => {

                    var link_url =  `${site_url}tutorials/${tutorial_slug}/`; 
                    if( tab_slug != undefined ) {
                      link_url = `${link_url}t/${tab_slug}/`
                    }
                    
                    return (
                      <Fragment key={post._id}>
                        <li key={post._id}>
                          <Link className={current_post_slug == post.slug ? 'selected_tab': ''} href={`${link_url}${post.slug}/`}>{Helper.decodeHtmlEntities(post.post_title)}</Link>
                        </li>
                      </Fragment>
                    );
                  })
                }
              </ul>

              {
                x.length >= settings.ads_between_navs_every_list ?  <AdCompaignBox settings={settings} data={ads} position={`in_sidebar_${elem_list}`}/>: ''
              }
            </Fragment>
          )
        }): ''
      }
    </>
  );
  

  
  return (itemComponents);
}

const TableOfContent = ({ data }) => {
  const [expandorCheckbox, setExpandorCheckbox] = useState(false);

  useEffect(() => {
    const expandCollapseTblContent = () => {
      const id = document.querySelector('#article-tbl-of-content');
      const handler = document.querySelector('#table-of-content-toggler');

      if (id?.classList.contains('expanded')) {
        id.classList.remove('expanded');
        handler.classList.remove('tbl-arrow');
      } else {
        id?.classList.add('expanded');
        handler?.classList.add('tbl-arrow');
      }
    };

    const handler = document.querySelector('#table-of-content-toggler');
    if (handler) {
      handler.addEventListener('click', expandCollapseTblContent);
    }

    return () => {
      if (handler) {
        handler.removeEventListener('click', expandCollapseTblContent);
      }
    };
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    
    const targetElement = document.querySelector( '#section-'+ href);
      
    if (targetElement) { 
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id='article-tbl-of-content'
      className={`content-tble-mobile-block tble-content ${expandorCheckbox ? 'expanded' : ''}`}
    >
      <ul className='block-list custom-aside-tuts list-items'>
        <li className='has-slideitem' style={{ background: '#f9f9f9' }}>
          <b className='content-table-head-title'>Table of Content</b>
          <ul className='slideitem' style={{ display: 'block' }}>
            {data.map((x, index) => (
              <li key={index}>
                <a
                  href={x.href ? '#section-' + Helper.decodeHtmlEntities(x.href) : '#'}
                  onClick={(e) => handleSmoothScroll(e, x.href)}
                >
                  {Helper.decodeHtmlEntities(x.title)}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <label
        className={'tble-content-handler expander'}
        id='table-of-content-toggler'
      ></label>
    </div>
  );
};

var ArticleContent = ({blocks}) => {
      
  var subheadings = blocks.filter(x => x.type == 'header' && x.id != 'header-level-1' ).map(x => ({
    href: Helper.generate_slugs(x?.data?.text),
    title: x?.data?.text
  }));

  return(
    <>
      {blocks?.map((x, index) => {

       

        if(x.id != 'header-level-1') {
           
          // return <TableOfContent/>

          if( x.type == 'paragraph') {
            return (
              <Fragment key={x.id}>
                <p style={{textAlign:x?.data?.alignment}} dangerouslySetInnerHTML={{__html: x?.data?.text}}/>
                {
                  index == 1 && subheadings.length ? <TableOfContent data={subheadings}/>: ""
                }
              </Fragment>
            )
          } else if (x.type == 'code' ) {
            return (
              <Highlight key={x.id} className={x?.data?.language_type}>
                {x?.data?.value}
              </Highlight>
            )
          } else if (x.type == 'image') {
            return (
              <figure key={x.id}> 
                    <Image
                        className={x?.data?.stretched ? 'full': ''} //half
                        alt={x?.data?.caption}
                        height={250}
                        src={x?.data?.file?.url} // use normal <img> attributes as props
                        width={x?.data?.file?.width} /> 
              </figure>
            )
          } else if (x.type == 'header') { 

            return ( 
              createElement(`h${Math.min(Math.max(x?.data?.level, 1), 6)}`, {key: x.id, id:Helper.generate_slugs(`section-${x?.data?.text}`), style:{textAlign: x?.data?.alignment }}, Helper.decodeHtmlEntities(x?.data?.text))
            )

          } else if (x.type == 'youtubeEmbed') {
            return (<LazyLoadYouTube key={x.id} url={x.data?.url} height='500'/>);
          } else if (x.type == 'delimiter') {
            return (<hr key={x.id} />)
          } else if (x.type == 'raw') {
            return (
              <Highlight key={x.id} className={'html'}>
                {x?.data?.html}
              </Highlight>
            )
          } else if (x.type == 'table') {
            return <ResponsiveTable key={x.id} data={x.data} />
          } else if (x.type == 'list') {
            return <StyledList key={x.id} data={x.data} />
          } else if (x.type == 'customImage') {
             
            return (
              <figure key={x.id}> 
                    <Image
                        className={x?.data?.stretched ? 'full': ''}//half
                        alt={x?.data?.alt}
                        height={320}
                        src={x?.data?.url} // use normal <img> attributes as props
                        width={400} /> 
              </figure>
            )
          }

        } 

      })}
    </>
  );     
}
/*
var TableOfContent = ({data}) => {

  var [expandor_checkbox, expandor_checkbox_change] = useState(false);
  var expand_collapse_tbl_content = () => {
      var id = document.querySelector('#article-tbl-of-content');
      var handler = document.querySelector('#table-of-content-toggler');

      if(id.classList.contains('expanded')) {
          id.classList.remove('expanded')
          handler.classList.remove('tbl-arrow')
      } else {
          id.classList.add('expanded')
          handler.classList.add('tbl-arrow')
      }
  } 
  return (
    <div id='article-tbl-of-content' className={`content-tble-mobile-block tble-content ${expandor_checkbox ? 'expanded': ''}`}>
        <ul className="block-list custom-aside-tuts list-items">
            <li className="has-slideitem" style={{background: "#f9f9f9"}}>
                <b className='content-table-head-title'>Table of Content</b>
                <ul className="slideitem" style={{display: "block"}}>
                  {data.map((x, index) => <li key={index}><Link href={x.href == undefined ? '#': x.href} smooth={'true'} duration={500}>{x.title}</Link></li>)} 
                </ul>
            </li>
        </ul>
        <label className={"tble-content-handler expander"} id='table-of-content-toggler' onClick={expand_collapse_tbl_content}></label>
    </div>
  )
}*/
export {
  SearchComponent, 
  SubscribeComponents,
  TutorialsContent,
  ServerOffline,
  GenerateTutorialContent_1,
  GenerateTutorialContent_2,
  SocialShare,
  FeedBackBlock,
  ArticleSidebar,
  Breadcrumbs,
  NextPrevPagination,
  ArticleContentSingle,
  ArticleContent,
  GenerateTutorialContent_tab
}