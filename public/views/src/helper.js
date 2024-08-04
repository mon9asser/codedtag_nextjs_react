import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Settings} from "./settings"; 
import axios from 'axios';
import CryptoJS, { RabbitLegacy } from 'crypto-js';
import Highlight from 'react-highlight'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import { Link as RouterLink, useNavigate} from 'react-router-dom';

import { Helmet } from 'react-helmet';

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
                              <th key={index}>{heading}</th>
                          ))}
                      </tr>
                  )}
              </thead>
              <tbody>
                  {content.slice(withHeadings ? 1 : 0).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                              <td key={cellIndex} data-label={withHeadings ? content[0][cellIndex] : `Column ${cellIndex + 1}`}>
                                  {cell}
                              </td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}; 

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


class HelperData {
  

  AdCompaignBox = ({ position, data, classes }) => {
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
  
  
  
  SearchComponent = ({searchType}) => {
    
    var [query, setQuery] = React.useState('');
    var [is_pressed, setIsPressed] = React.useState(false);
 
    var navigate = useNavigate();

    var sendRequest = (e) => {
        e.preventDefault(); 
        setIsPressed(true);
        setTimeout(() => {
          setIsPressed(false);
          navigate(`/search?q=${query}`)
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

  renderElements = (elements) => {

    if( elements == undefined ) {
      return [];
    }
    return elements.map((element, index) => {
        const { type, props } = element;
        
        // Handle script elements separately
        if (type === 'script') {
            const script = document.createElement('script');
            Object.keys(props).forEach(key => {
                script.setAttribute(key, props[key]);
            });
            script.textContent = props.children;
            document.body.appendChild(script);
            return null; // Return null to not render script as React element
        }

        // If children exist and is a string, wrap it in an array
        if (props.children && typeof props.children === 'string') {
            props.children = [props.children];
        }

        return React.createElement(type, { ...props, key: index });
    });

  }

  renderHelmetElements = (elements) => {
      
    if( elements == undefined ) {
      return []
    }

    return elements.map((element, index) => {
        const { type, props } = element;
        return React.createElement(type, { ...props, key: index });
    });
  };

  DynamicHelmet = ({ elements }) => {
      return (
          <Helmet>
              {this.renderHelmetElements(elements)}
          </Helmet>
      );    
  };

    SubscribeComponents = ({is_footer, title, description, camp_data }) => {
         
        var [email, setEmail] = React.useState('')
        var [result, setRestult] = React.useState({
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
          }).then( res => {

            var to_be_state = {};
            to_be_state.message= res.data;
            to_be_state.cls= 'show';
            to_be_state.is_pressed= false;

            if( res.is_error ) { 
              to_be_state.type= 'error';
            } else {
              to_be_state.type= 'success';
            }
            console.log(to_be_state, res)
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
            
            
            <div>
              <div className={`response-msg ${result.cls} ${result.type}`}>{result.message}</div>
                <this.AdCompaignBox position="before_subscribe" data={camp_data}/> 
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
                <this.AdCompaignBox position="after_subscribe" data={camp_data}/> 
            </div>
          </>
        )
    }
   
    NextPrevPagination = ({site_url, tutorial_slug, type, data, current_post_slug}) => {
     
      
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
            
            <RouterLink to={prev_link} className="flexbox direction-row items-center hover-to-left">
                <i className="left-arrow-pagin"></i>
                <span>
                    <span className="d-none d-sm-block">{prev.post_title}</span> 
                    <span className="d-block d-sm-none">Prev</span> 
                </span>
            </RouterLink> 
            } 

            {
              
              ( next == undefined ) ? '':
              <RouterLink to={next_link} className="flexbox direction-row items-center hover-to-right auto-right">
                  <span>
                      <span className="d-none d-sm-block">{next.post_title}</span> 
                      <span className="d-block d-sm-none">Next</span>
                  </span>
                  <i className="right-arrow-pagin"></i>
              </RouterLink> 
            }
        </div>
      );
    }                        
    TableOfContent = ({data}) => {

      var [expandor_checkbox, expandor_checkbox_change] = React.useState(false);
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
                      {data.map((x, index) => <li key={index}><Link to={x.href} smooth={true} duration={500}>{x.title}</Link></li>)} 
                    </ul>
                </li>
            </ul>
            <label className={"tble-content-handler expander"} id='table-of-content-toggler' onClick={expand_collapse_tbl_content}></label>
        </div>
      )
    }

    CustomShareIcon = ({ IconComponent, size, width, height }) => (
      <div style={{ borderRadius: '8px', overflow: 'hidden', width: width, height: height }}>
        <IconComponent size={size} />
      </div>
    );
    
    Breadcrumbs = ({data}) => {
      return (
        <ul className="breadcrumbs">
            {data.map((x, index) => <li key={index} className='sub-title'><RouterLink to={x.url}>{x.title}</RouterLink></li>)}
        </ul>
      );
    }
  
    SocialShare = ({platforms, url, title, radius, size, width, height}) => {
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
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={EmailIcon} /> : <EmailIcon width={width} height={height} size={size} round />}
              </EmailShareButton>
            );
          case 'facebook':
            return (
              <FacebookShareButton key={index} url={url} quote={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={FacebookIcon} /> : <FacebookIcon width={width} height={height} size={size} round />}
              </FacebookShareButton>
            );
          case 'gab':
            return (
              <GabShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={GabIcon} /> : <GabIcon width={width} height={height} size={size} round />}
              </GabShareButton>
            );
          case 'hatena':
            return (
              <HatenaShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={HatenaIcon} /> : <HatenaIcon width={width} height={height} size={size} round />}
              </HatenaShareButton>
            );
          case 'instapaper':
            return (
              <InstapaperShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={InstapaperIcon} /> : <InstapaperIcon width={width} height={height} size={size} round />}
              </InstapaperShareButton>
            );
          case 'line':
            return (
              <LineShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={LineIcon} /> : <LineIcon width={width} height={height} size={size} round />}
              </LineShareButton>
            );
          case 'linkedin':
            return (
              <LinkedinShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={LinkedinIcon} /> : <LinkedinIcon width={width} height={height} size={size} round />}
              </LinkedinShareButton>
            );
          case 'livejournal':
            return (
              <LivejournalShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={LivejournalIcon} /> : <LivejournalIcon width={width} height={height} size={size} round />}
              </LivejournalShareButton>
            );
          case 'mailru':
            return (
              <MailruShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={MailruIcon} /> : <MailruIcon width={width} height={height} size={size} round />}
              </MailruShareButton>
            );
          case 'ok':
            return (
              <OKShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={OKIcon} /> : <OKIcon width={width} height={height} size={size} round />}
              </OKShareButton>
            );
          case 'pinterest':
            return (
              <PinterestShareButton key={index} url={url} media={url} description={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={PinterestIcon} /> : <PinterestIcon width={width} height={height} size={size} round />}
              </PinterestShareButton>
            );
          case 'pocket':
            return (
              <PocketShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={PocketIcon} /> : <PocketIcon width={width} height={height} size={size} round />}
              </PocketShareButton>
            );
          case 'reddit':
            return (
              <RedditShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={RedditIcon} /> : <RedditIcon width={width} height={height} size={size} round />}
              </RedditShareButton>
            );
          case 'telegram':
            return (
              <TelegramShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={TelegramIcon} /> : <TelegramIcon width={width} height={height} size={size} round />}
              </TelegramShareButton>
            );
          case 'tumblr':
            return (
              <TumblrShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={TumblrIcon} /> : <TumblrIcon width={width} height={height} size={size} round />}
              </TumblrShareButton>
            );
          case 'twitter':
            return (
              <TwitterShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={TwitterIcon} /> : <TwitterIcon width={width} height={height} size={size} round />}
              </TwitterShareButton>
            );
          case 'viber':
            return (
              <ViberShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={ViberIcon} /> : <ViberIcon width={width} height={height} size={size} round />}
              </ViberShareButton>
            );
          case 'vk':
            return (
              <VKShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={VKIcon} /> : <VKIcon width={width} height={height} size={size} round />}
              </VKShareButton>
            );
          case 'whatsapp':
            return (
              <WhatsappShareButton key={index} url={url} title={title} separator=":: " className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={WhatsappIcon} /> : <WhatsappIcon width={width} height={height} size={size} round />}
              </WhatsappShareButton>
            );
          case 'workplace':
            return (
              <WorkplaceShareButton key={index} url={url} title={title} className="social-share-button">
                {radius ? <this.CustomShareIcon width={width} height={height} size={size} IconComponent={WorkplaceIcon} /> : <WorkplaceIcon width={width} height={height} size={size} round />}
              </WorkplaceShareButton>
            );
          default:
            return null;
        }
      });
    }
    PreLoader = ({type, lines, columns, is_full }) => {

      let element = <span className="loader loader-dark"></span>;
      var col = columns == undefined ? false: columns;
      var full = is_full == undefined ? false: is_full;
      if (type === 'text') {
        const elementLines = [];
        for (let i = 0; i < lines; i++) {
          elementLines.push(<div key={i} className="placeholder-text-loader mt-13"></div>);
        }

        if( col ) 
            element = <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>{elementLines}</div>;
          else 
            element = <div className="mt-20">{elementLines}</div>;
      } else if ('article') {
        return <div className='max-1172' style={{margin: '25px auto 55px auto'}}>
        
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"250px"}}></div>
            <div className="mt-13 flexbox gap-20" style={{flexBasis: "75%", height:"250px"}}>
              <div className='placeholder-text-loader' style={{flexBasis: "50%", height:"250px"}}></div>
              <div className='placeholder-text-loader' style={{flexBasis: "50%", height:"250px"}}></div>
            </div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
          <div className="mt-20 columns-loader flexbox content-center gap-20 flex-wrap" style={{flexBasis: full ? "100%": "30%"}}>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "20%", height:"20px"}}></div>
            <div className="placeholder-text-loader mt-13" style={{flexBasis: "75%", height:"20px"}}></div>
          </div>
        </div>
      }

      return element;

      
    }

    generate_slugs = (text) => {
      return text
        .toLowerCase()          // Convert all characters to lowercase
        .replace(/\s+/g, '-')   // Replace all spaces with hyphens
        .replace(/[^\w-]+/g, ''); // Remove all non-word characters except hyphens
    }

    formated_published_date = (isoString) => {
      const date = new Date(isoString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      const textValue = date.toLocaleDateString('en-US', options);
      const datetimeValue = date.toISOString();

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
 
      
      return {
          value: datetimeValue,
          text: `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
      };
    }


    ArticleContent = ({blocks}) => {
      
      var subheadings = blocks.filter(x => x.type == 'header' && x.id != 'header-level-1' ).map(x => ({
        href: this.generate_slugs(x?.data?.text),
        title: x?.data?.text
      }));

      return(
        <>
          {blocks?.map((x, index) => {

            if(x.id != 'header-level-1') {
               
              // return <this.TableOfContent/>

              if( x.type == 'paragraph') {
                return (
                  <React.Fragment key={x.id}>
                    <p style={{textAlign:x?.data?.alignment}} dangerouslySetInnerHTML={{__html: x?.data?.text}}/>
                    {
                      index == 1 && subheadings.length ? <this.TableOfContent data={subheadings}/>: ""
                    }
                  </React.Fragment>
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
                        <LazyLoadImage
                            className={x?.data?.stretched ? 'full': 'half'}
                            alt={x?.data?.caption}
                            height={'auto'}
                            src={x?.data?.file?.url} // use normal <img> attributes as props
                            width={x?.data?.file?.width} /> 
                  </figure>
                )
              } else if (x.type == 'header') { 

                return ( 
                  React.createElement(`h${Math.min(Math.max(x?.data?.level, 1), 6)}`, {key: x.id, name:this.generate_slugs(x?.data?.text), style:{textAlign: x?.data?.alignment }}, x?.data?.text)
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
              } 

            } 

          })}
        </>
      );     
    }



    ArticleContentSingle = ({blocks, helper}) => {
      
      var subheadings = blocks.filter(x => x.type == 'header' && x.id != 'header-level-1' ).map(x => ({
        href: this.generate_slugs(x?.data?.text),
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
               
              // return <this.TableOfContent/>

              if( x.type == 'paragraph') { 
                
                text_counter += x.words_counts
                

                var ad_campaign_element = '';
                if( text_counter >= words_every ) {
                  ad_counter++; 
                  ad_campaign_element = <Helper.AdCompaignBox data={ads} position={`inside_content_${ad_counter}`}/>;
                  text_counter = 0;
                }
                
                return (
                  <React.Fragment key={x.id}> 
                    <p style={{textAlign:x?.data?.alignment}} dangerouslySetInnerHTML={{__html: x?.data?.text}}/>
                    { ad_campaign_element }
                    {
                      index == 1 && subheadings.length ? <this.TableOfContent data={subheadings}/>: ""
                    }
                    
                  </React.Fragment>
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
                        <LazyLoadImage
                            className={x?.data?.stretched ? 'full': 'half'}
                            alt={x?.data?.caption}
                            height={'auto'}
                            src={x?.data?.file?.url} // use normal <img> attributes as props
                            width={x?.data?.file?.width} /> 
                  </figure>
                )
              } else if (x.type == 'header') { 

                return ( 
                  React.createElement(`h${Math.min(Math.max(x?.data?.level, 1), 6)}`, {key: x.id, name:this.generate_slugs(x?.data?.text), style:{textAlign: x?.data?.alignment }}, x?.data?.text)
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
              } 

            } 

          })}
        </>
      );     
    }



    TutorialsContent = ({ blocks, tutorials, ad_camp }) => {
      console.log(ad_camp);
      var header_count = 0;
      var end_section = 0;

      return (
        <React.Fragment>
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
                      <LazyLoadImage
                        className={x?.data?.stretched ? 'full' : 'half'}
                        alt={x?.data?.caption}
                        height={'auto'}
                        src={x?.data?.file?.url}
                        width={x?.data?.file?.width}
                      />
                    </figure>
                  );
                case 'header':
                  header_count += 1;

                  return <React.Fragment key={`${x.id}-block-header`}>
                  <this.AdCompaignBox
                    key={`${x.id}-ad-before`}
                    position={`before_section_title_${header_count}`}
                    data={ad_camp}
                  />
                  {React.createElement(
                    `h${Math.min(Math.max(x?.data?.level, 1), 6)}`,
                    { key: `${x.id}-heading`, style: { textAlign: x?.data?.alignment } },
                    x?.data?.text
                  )}
                  <this.AdCompaignBox
                    key={`${x.id}-ad-after`}
                    position={`after_section_title_${header_count}`}
                    data={ad_camp}
                  />
                </React.Fragment>;
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
                      <React.Fragment key={`frage-box-${x.id}`}>

                        <div className="row content-center" key={x.id}>
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
                                <RouterLink
                                  className="floating-all"
                                  to={`/tutorials/${item.slug}/`}
                                ></RouterLink>
                              </div>
                            </div>
                          ))}
                        </div>

                        <this.AdCompaignBox
                          key={`${x.id}-ad-end-of-section`}
                          position={`end_of_category_section_${end_section}`}
                          data={ad_camp}
                        />

                      </React.Fragment>
                    );
                  }
                  return null;
                default:
                  return null;
              }


              

            }
            return null;
          })}
        </React.Fragment>
      );
    };
    

    validateEmail(email){
       // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    formatDate = (dateString) => {

        const date = new Date(dateString);
 

        // Format the date components separately
        const day = date.getDate();
        const month = date.toLocaleString('en-GB', { month: 'long' });
        const year = date.getFullYear();

        // Combine them with a comma
        const formattedDate = `${day} ${month}, ${year}`;
        
        return formattedDate;

    };

    generateJsonLdWebPage = (url, pageTitle, siteId, imageUrl, datePublished, dateModified, description, breadcrumbItems) => {
        // Constructing the JSON-LD object
        const jsonLdObject = {
            "@context": "https://schema.org",
            "@graph": [{
                "@type": "WebPage",
                "@id": url,
                "url": url,
                "name": pageTitle,
                "isPartOf": {
                    "@id": siteId
                },
                "primaryImageOfPage": {
                    "@id": url + "/#primaryimage"
                },
                "image": {
                    "@id": url + "/#primaryimage"
                },
                "thumbnailUrl": imageUrl,
                "datePublished": datePublished,
                "dateModified": dateModified,
                "description": description,
                "breadcrumb": {
                    "@id": url + "/#breadcrumb"
                },
                "inLanguage": "en-US",
                "potentialAction": [{
                    "@type": "ReadAction",
                    "target": [url]
                }]
            }, {
                "@type": "ImageObject",
                "inLanguage": "en-US",
                "@id": url + "/#primaryimage",
                "url": imageUrl,
                "contentUrl": imageUrl
            }, {
                "@type": "BreadcrumbList",
                "@id": url + "/#breadcrumb",
                "itemListElement": breadcrumbItems.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.name,
                    "item": item.url
                }))
            }, {
                "@type": "WebSite",
                "@id": siteId,
                "url": siteId,
                "name": "CodedTag", // Replace with actual site name if dynamic
                "description": "Unlock the world of coding for free! With online platforms, interactive tutorials, and coding communities, learn at your own pace and explore limitless possibilities. Start your coding journey now! #LearnToCode #FreeResources",
                "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": siteId + "?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }],
                "inLanguage": "en-US"
            }]
        };
    
        return jsonLdObject;
    }
 
    formatNumber(numer) {
        var num = parseInt(numer); 
        if (num >= 1000000000000) {
            return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
        } else if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        } /*else if (num >= 100) {
          return num + 'h';
      }*/ else {
          
            return num.toString();
        }
    }
    generateObjectId() {
        var timestamp = (Math.floor(new Date().getTime() / 1000)).toString(16);
        var randomPart = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        });
        return timestamp + randomPart;
    }

  
    async logut () { 

      await localStorage.clear();
      var session = await localStorage.getItem("session")
      if( session == null ) {
        return true; 
      }

      return false;

    }

    async checkUserCapabilities(pageName) {
      
      // session data 
      var session = JSON.parse(localStorage.getItem("session"));
       
      if( session === null || session.token === undefined || session.token === "" ) {
        return {
          redirect_to: "",
          is_accessed: false
        }; 
      }
      
      // passed check caps by request = settings
      var reqs = await this.sendRequest({
          api: "user/capabilities",
          method: "post",
          data: {
            token: session.token,
            page: pageName
          }
      })
      
      if( reqs.is_error ) { 
        return {
          redirect_to: reqs.redirect_to,
          is_accessed: false
        }; 
      }
      
      return {
        redirect_to: reqs.redirect_to,
        is_accessed: true
      }; 

    }
    
    async generateToken(user_browser) {
       
      var request = await axios({
        method: 'get',
        url: `${Settings.server.api}/hash-request`, 
        headers: {
          'api_keys': 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132', 
          'agent': user_browser
        }
      });

      return request.data;
    }
    
    async sendRequest ({api, method, data, headers, is_create } = null) {

        var generate_token = await this.generateToken(navigator.userAgent)
        if( generate_token.is_error ) {
          return; 
        }

        var token = generate_token.data;
          
        if( headers === undefined ) {
            headers = {};
        }
         
        headers["authorization"] = token;
        headers["api_keys"] = 'qwe#r$s%s&d*r!w*e((f))d-f`werh14445`4rt5`4ert5`4rt31645k132v132';
        
        if( is_create === undefined ) {
          is_create = false; 
        }

        data["Secret-codedtag-api-key"] = Settings.keys.secret ;
          
          
          var session = localStorage.getItem("session"); 
           
          var additional = {}; 
          if( session != null ) {

            session = JSON.parse(session)

            // updated data 
            additional = {
              updated_date: Date.now(),
              updated_by: {
                id: session.id,
                name: session.full_name,
                email: session.email,
                thumbnail: session.thumbnail,
              }
            };
            
            // created data 
            if(is_create) { 
                additional.created_date= Date.now();
                additional.created_by = {
                  id: session.id,
                  name: session.full_name,
                  email: session.email,
                  thumbnail: session.thumbnail,
                }
            }

          }
          
          if(data.data_array != undefined ) {
            data.data_array = data.data_array.map( x => {
              return {
                ...x, ...additional
              }
            })
          } else {
            data = {...data, ...additional}
          }

          
          var reqs = await axios({
            method: method,
            url: `${Settings.server.api}/${api}`,
            data: data,
            headers: {
              'CT-public-api-key': Settings.keys.public,
              ...headers
            }
          });
          
          try {
          if( reqs.status === 200 ) {
              return reqs.data;
          } else { 
              return {
                data: [],
                message: reqs.message || "Something went wrong, try later",
                is_error: true 
              }
          }
    
        } catch (error) {  
          
          return  {
              data: [],
              message: error?.response?.data?.message || "Something went wrong, try later",
              is_error: true 
          }
        } 
         
    }

    getGravatarUrl(email, size = 200) {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = CryptoJS.SHA256(trimmedEmail).toString();
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
    }

    randomizer = () => {
      
      // Generate a random number between 0 and 999999
      const randomNumber = Math.floor(Math.random() * 1000000);
      
      // Convert the number to a string and pad with leading zeros if necessary
      const paddedNumber = randomNumber.toString().padStart(6, '0');
      
      return paddedNumber;

    } 

    initMethods () {
          
        // slide Items 
        this.slideitems();
        
    }


    slideDownElem = (elem, duration = 200) => {
         
        elem.style.display = 'block';  // Make the element visible
        let startHeight = 0;
        let endHeight = elem.scrollHeight;  // Get the natural height of the element
    
        elem.style.height = startHeight + 'px';  // Start animation from 0 height
    
        let startTime = Date.now();  // Get the start time
    
        function animate() {
            let elapsedTime = Date.now() - startTime;
            let nextHeight = Math.min(endHeight, (elapsedTime / duration) * endHeight);
            elem.style.height = nextHeight + 'px';  // Update the height
    
            if (nextHeight < endHeight) {
                requestAnimationFrame(animate);  // Continue the animation
            } else {
                elem.style.height = null;  // Clear the inline height style
            }
        }
    
        requestAnimationFrame(animate);  // Start the animation
    }
    
    slideUpElem = (elem, duration = 200) => {
        let startHeight = elem.scrollHeight;
        let endHeight = 0;
    
        let startTime = Date.now();
    
        function animate() {
            let elapsedTime = Date.now() - startTime;
            let nextHeight = Math.max(endHeight, startHeight - (elapsedTime / duration) * startHeight);
            elem.style.height = nextHeight + 'px';
    
            if (nextHeight > endHeight) {
                requestAnimationFrame(animate);
            } else {
                elem.style.display = 'none';  // Hide the element
                elem.style.height = null;  // Clear the inline height style
            }
        }
    
        requestAnimationFrame(animate);
    }
    
    toggleSlide(elem) {
        let myList = elem;
        
        if (window.getComputedStyle(myList).display === 'none') {
            this.slideDownElem(myList);
        } else {
            this.slideUpElem(myList);
        }
    }
    

    slideitems = () => {

        var _this = this; 

        var items = document.querySelectorAll("li.has-slideitem");
         
        if( !items.length ) {
            return; 
        }

        items.forEach((item, index) => {
            var elem = Array.from(item.childNodes).filter(item => item.tagName.toLowerCase() == "a");
            if( ! elem.length ) {
                return; 
            }

            elem[0].addEventListener("click", function(e){

                this.classList.toggle("active")

                e.preventDefault();
                
                var ul = this.nextElementSibling;
                ul.style.overflow = "hidden";
                _this.toggleSlide(ul);

            });

        });

    }

    chunkArray(array, chunkSize) {
      if (chunkSize <= 0) {
        throw new Error("No Posts found!");
      }
      
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
      }
      
      return result;
    }
    
    ArticleSidebar = ({type, data, site_url, tutorial_slug, current_post_slug, tab_slug, helper}) => {

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
          posts = this.chunkArray(data, settings.ads_between_navs_every_list ) 
      }

      var chapters = []; 
      if( type == 'chapters' ) {
        if(data.length)
          chapters = this.chunkArray(data, settings.ads_between_navs_every_list ) 
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
                <React.Fragment key={indexer}>
                  <ul key={indexer} className="block-list custom-aside-tuts">

                    {chapterData.map(chapter => {
                      var link_url = `${site_url}tutorials/${tutorial_slug}/`;
                      if( tab_slug != undefined ) {
                        link_url = `${link_url}t/${tab_slug}/`
                      }
                      
                      var is_expaned = chapter.posts.findIndex( x => x.slug == current_post_slug) != -1;

                      return (
                        <React.Fragment key={chapter._id}>
                          {chapter.chapter_title !== "" ? (

                            <>
                              <li className={`${chapter.posts.length ? 'has-slideitem' : ''}`}>
                                <RouterLink className={` ${is_expaned ? 'expanded-a': ''}`} id={`anchor-${chapter._id}`} onClick={e => collapsed_item(e, `${chapter._id}`)} to="#">{chapter.chapter_title}</RouterLink>
                                {chapter.posts.length ? (
                                  <ul id={`item-${chapter._id}`} className={`collapsible list-items ${is_expaned ? 'expanded': ''}`}>
                                    {chapter.posts.map(x => (
                                      <li key={x._id}>
                                        <RouterLink className={current_post_slug == x.slug ? 'selected_tab': ''} to={`${link_url}${x.slug}/`}>{x.post_title}</RouterLink>
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
                                    <RouterLink className={current_post_slug == x.slug ? 'selected_tab': ''} to={`${link_url}${x.slug}/`}>{x.post_title}</RouterLink>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          )}
                        </React.Fragment>
                      );
                    })}

                  </ul>
                   
                  <this.AdCompaignBox data={ads} position={`in_sidebar_${elem_list}`}/>
                    
                </React.Fragment>
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
                <React.Fragment key={index} >
                  <ul className="block-list custom-aside-tuts list-items">
                    {
                      x.map(post => {

                        var link_url =  `${site_url}tutorials/${tutorial_slug}/`; 
                        if( tab_slug != undefined ) {
                          link_url = `${link_url}t/${tab_slug}/`
                        }
                        
                        return (
                          <React.Fragment key={post._id}>
                            <li key={post._id}>
                              <RouterLink className={current_post_slug == post.slug ? 'selected_tab': ''} to={`${link_url}${post.slug}/`}>{post.post_title}</RouterLink>
                            </li>
                          </React.Fragment>
                        );
                      })
                    }
                  </ul>
  
                  {
                    x.length >= settings.ads_between_navs_every_list ? <this.AdCompaignBox data={ads} position={`in_sidebar_${elem_list}`}/>: ''
                  }
                </React.Fragment>
              )
            }): ''
          }
        </>
      );
      

      
      return (itemComponents);
    }

    FeedBackBlock = ({data_id, data_title, feeadback_title }) => {

        feeadback_title = feeadback_title == undefined ? 'Did you find this tutorial useful?': feeadback_title;
        const textareaRef = useRef(null);

        var [feedback, feedback_change] = React.useState({
          thumb: null, 
          comment: '', 
          data_id: data_id,
          data_title: data_title
        });

        const [isDisabled, setIsDisabled] = useState(false);
        var [data, data_change] = React.useState({
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
            console.log(feedback);
            var response = await this.sendRequest({
              api: "comments/create-update",
              data: feedback, 
              method: "post"
            }); 
            
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

            console.log(feedback);
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

    GenerateTutorialContent_1 = ({ data, upcoming, built_url, ad_camp }) => {
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
                <React.Fragment key={index}>
                    <div className="mt-25">
                      <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                    </div>

                    <this.AdCompaignBox data={ad_camp} position={'after_youtube_video_content_1'}/> 
                </React.Fragment>
              );
            }
            // Headline shortcodes from h1 to h6
            else if (part.match(/^\[h[1-6]/)) {
              const tag = part.match(/^\[h([1-6])/)[1];
              const content = part.replace(/^\[h[1-6]\]/, '').trim();
              const TagName = `h${tag}`;
              return <TagName key={index} className="tutorial-subheadline">{content}</TagName>;
            }
            // Chapters and posts shortcode
            else if (part.startsWith('[chapters-posts]')) {
              if(upcoming != undefined )
                return <this.TutorialLinks key={index} ad_camp={ad_camp} built_url={built_url} upcoming={upcoming} />;
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
 
          <this.AdCompaignBox data={ad_camp} position={'after_tutorial_description_1'}/>
        </>
      );
    }

    GenerateTutorialContent_2 = ({ data, upcoming, built_url, ad_camp }) => {
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
                <React.Fragment key={index}>
                    <div className="mt-25">
                      <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                    </div> 
                    <this.AdCompaignBox data={ad_camp} position={'after_youtube_video_content_2'}/>
                </React.Fragment>
              );
            }
            // Headline shortcodes from h1 to h6
            else if (part.match(/^\[h[1-6]/)) {
              const tag = part.match(/^\[h([1-6])/)[1];
              const content = part.replace(/^\[h[1-6]\]/, '').trim();
              const TagName = `h${tag}`;
              return <TagName key={index} className="tutorial-subheadline">{content}</TagName>;
            }
            // Chapters and posts shortcode
            else if (part.startsWith('[chapters-posts]')) {
              if(upcoming != undefined )
                return <this.TutorialLinks ad_camp={ad_camp} key={index} built_url={built_url} upcoming={upcoming} />;
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
          
          <this.AdCompaignBox classes='wrapper chapter-elements max-1150 offset-left offset-right mt-30 flexbox gap-20 flex-wrap content-center' data={ad_camp} position={'after_tutorial_description_2'}/>
        </>
      );
    }

    GenerateTutorialContent_tab = ({ data, upcoming, built_url, ad_camp }) => {
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
                <React.Fragment key={index}>
                    <div className="mt-25">
                      <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                    </div>

                    <this.AdCompaignBox data={ad_camp} position={'after_youtube_video_content_1'}/> 
                </React.Fragment>
              );
            }
            // Headline shortcodes from h1 to h6
            else if (part.match(/^\[h[1-6]/)) {
              const tag = part.match(/^\[h([1-6])/)[1];
              const content = part.replace(/^\[h[1-6]\]/, '').trim();
              const TagName = `h${tag}`;
              return <TagName key={index} className="tutorial-subheadline">{content}</TagName>;
            }
            // Chapters and posts shortcode
            else if (part.startsWith('[chapters-posts]')) {
              if(upcoming != undefined )
                return <this.TutorialLinks key={index} ad_camp={ad_camp} built_url={built_url} upcoming={upcoming} />;
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
 
          <this.AdCompaignBox data={ad_camp} position={'after_tutorial_description_1'}/>
        </>
      );
    }

    TutorialLinks = ({upcoming, built_url, ad_camp}) => {

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
                            <React.Fragment key={chapter._id} > 
                              { (k % ads_every == 0 ) && <this.AdCompaignBox data={ad_camp} position={`between_row_ad_${counter_ads}`}/>}
                              <this.TutorialsList built_url={built_url} data={chapter.posts} chapter_title={chapter.chapter_title} index={k}/>
                            </React.Fragment>
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
                              <React.Fragment key={k} >
                                  { (k % ads_every == 0 ) && <this.AdCompaignBox data={ad_camp} position={`between_row_ad_${counter_ads}`}/>}
                                  <this.TutorialsList built_url={built_url} data={posts} index={k}/>
                               </React.Fragment>
                            );
                          })
                      : ""
                  )
              }
              
          </div>
      );
  }

  TutorialsList = ({ index, data, chapter_title, built_url }) => {
      
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
                      {data.map(x => <li key={x._id}><RouterLink to={`${built_url}${x.slug}/`}>{x.post_title}</RouterLink></li>)} 
                  </ul>
               </div>
          </div>

      );
  }

  
    produceNumber = (number) => {
      
      var num = number + 1;

      var string = `0${num}`
      if( num > 10 ) {
        string = `${num}`
      }
      
      return string;

    }
     
}

var Helper = new HelperData(); 

export {
  Helper 
}