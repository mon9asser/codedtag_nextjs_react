import React, {useEffect, useRef, useState} from 'react'
import {Settings} from "./settings"; 
import axios from 'axios';
import CryptoJS, { RabbitLegacy } from 'crypto-js';
import Highlight from 'react-highlight'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
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

    CustomShareIcon = ({ IconComponent, size, width, height }) => (
      <div style={{ borderRadius: '8px', overflow: 'hidden', width: width, height: height }}>
        <IconComponent size={size} />
      </div>
    );
    
    Breadcrumbs = ({data}) => {
      return (
        <ul className="breadcrumbs">
            {data.map((x, index) => <li key={index} className='sub-title'><Link to={x.url}>{x.title}</Link></li>)}
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
        return <div style={{maxWidth: '95%', margin: '25px auto 55px auto'}}>
        
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

    ArticleContent = ({blocks}) => {
       
      return(
        <>
          {blocks?.map(x => {

            if(x.id != 'header-level-1') {
              
              if( x.type == 'paragraph') {
                return (<p style={{textAlign:x?.data?.alignment}} key={x.id}>{x?.data?.text}</p>)
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
                  React.createElement(`h${Math.min(Math.max(x?.data?.level, 1), 6)}`, {key: x.id, style:{textAlign: x?.data?.alignment }}, x?.data?.text)
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


    TutorialsContent = ({blocks, tutorials}) => {
       
      return(
        <>
          {blocks?.map(x => { 
            if(x.id != 'header-level-1') {
 
              if( x.type == 'paragraph') {
                return (<p style={{textAlign:x?.data?.alignment}} key={x.id}>{x?.data?.text}</p>)
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
                  React.createElement(`h${Math.min(Math.max(x?.data?.level, 1), 6)}`, {key: x.id, style:{textAlign: x?.data?.alignment }}, x?.data?.text)
                )
              } else if (x.type == 'youtubeEmbed') {
                return (<LazyLoadYouTube key={x.id} url={x.data?.url}/>);
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
              } else if (x.type == 'tutorialsList') {
                
                
                if( x.data.selectedValue == '' ) {
                  return; 
                }
                
                var filtered = tutorials.filter(tut => tut.selected_category._id == x.data.selectedValue);
                if( filtered.length ) {
                   
                  return (
                    <div className="row content-center">
                        {
                            filtered.map(item => {  
                                return (
                                  <div key={item._id} className="sm-6 md-4 lg-4 text-center p-all-15">
                                      <div className="tutorial-box">
                                            {
                                              item.tutorial_svg_icon != "" ?
                                              <i className="tutorial-thumbs" style={{background: "#2d4756"}} dangerouslySetInnerHTML={{__html: item.tutorial_svg_icon}} /> : ""
                                            }
                                            
                                            <h3>
                                              <a>{item.tutorial_title}</a>
                                              {
                                                item.duration != "" ?
                                                <span className="subtitle">Duration:- {item.duration}</span> : ""
                                              }                                              
                                            </h3>
                                            <Link className="floating-all" to="/tutorials"></Link>
                                      </div>
                                  </div>
                              );
                            })
                        }
                    </div>
                  )
                  
                  
                    
                }

               // var target_tutorials = tutorials?.filter(tut => )
                /*
                <div className="row content-center">
                
                        <div className="sm-6 md-4 lg-4 text-center p-all-15">
                            <div className="tutorial-box">
                                <i className="tutorial-thumbs" style={{background: "#2d4756"}}>
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect className="fill-color" width="50" height="50" fill="#2D4756" />
                                        <path
                                            d="M12.5625 30V21.2727H16.3295C16.9773 21.2727 17.544 21.4006 18.0298 21.6562C18.5156 21.9119 18.8935 22.2713 19.1634 22.7344C19.4332 23.1974 19.5682 23.7386 19.5682 24.358C19.5682 24.983 19.429 25.5241 19.1506 25.9815C18.875 26.4389 18.4872 26.7912 17.9872 27.0384C17.4901 27.2855 16.9091 27.4091 16.2443 27.4091H13.9943V25.5682H15.767C16.0455 25.5682 16.2827 25.5199 16.4787 25.4233C16.6776 25.3239 16.8295 25.1832 16.9347 25.0014C17.0426 24.8196 17.0966 24.6051 17.0966 24.358C17.0966 24.108 17.0426 23.8949 16.9347 23.7188C16.8295 23.5398 16.6776 23.4034 16.4787 23.3097C16.2827 23.2131 16.0455 23.1648 15.767 23.1648H14.9318V30H12.5625ZM20.4375 30V21.2727H22.8068V24.6818H25.9432V21.2727H28.3125V30H25.9432V26.5909H22.8068V30H20.4375ZM29.4375 30V21.2727H33.2045C33.8523 21.2727 34.419 21.4006 34.9048 21.6562C35.3906 21.9119 35.7685 22.2713 36.0384 22.7344C36.3082 23.1974 36.4432 23.7386 36.4432 24.358C36.4432 24.983 36.304 25.5241 36.0256 25.9815C35.75 26.4389 35.3622 26.7912 34.8622 27.0384C34.3651 27.2855 33.7841 27.4091 33.1193 27.4091H30.8693V25.5682H32.642C32.9205 25.5682 33.1577 25.5199 33.3537 25.4233C33.5526 25.3239 33.7045 25.1832 33.8097 25.0014C33.9176 24.8196 33.9716 24.6051 33.9716 24.358C33.9716 24.108 33.9176 23.8949 33.8097 23.7188C33.7045 23.5398 33.5526 23.4034 33.3537 23.3097C33.1577 23.2131 32.9205 23.1648 32.642 23.1648H31.8068V30H29.4375Z"
                                            fill="white"
                                        />
                                    </svg>
                                </i>
                                <h3><a href="#">PHP Tutorials</a><span className="subtitle">Programming Lanuage</span></h3>
                                <a className="floating-all" href="tutorial.html"></a>
                            </div>
                        </div>
                        
                    </div>
                */
              }

            } 

          })}
        </>
      );     
    }

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

    async sendRequest ({api, method, data, headers, is_create } = null) {

        if( headers === undefined ) {
            headers = {};
        }
        
        if( is_create === undefined ) {
          is_create = false; 
        }

        data["Secret-codedtag-api-key"] = Settings.keys.secret ;
         
        try {
           
           
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
    
    ArticleSidebar = ({type, data, site_url, tutorial_slug, current_post_slug}) => {

      
      var collapsed_item = (e, id) => {
        
        var doc_id = document.querySelector(`#${id}`); 
        console.log(doc_id)
        this.toggleSlide(doc_id);
          
      }

      var posts = [];
      if( type == 'posts' ) {
        if(data.length)
          posts = this.chunkArray(data, 5 ) 
      }

      var chapters = []; 
      if( type == 'chapters' ) {
        if(data.length)
          chapters = this.chunkArray(data, 5 ) 
      } 

      var itemComponents = (
        <>

          {/* Chapters */}
          {type === 'chapters' ? 
            chapters.map( (chapterData, indexer) => (

              <ul key={indexer} className="block-list custom-aside-tuts">

                {chapterData.map(chapter => {
                  var link_url = `${site_url}tutorials/${tutorial_slug}/`;
          
                  return (
                    <React.Fragment key={chapter._id}>
                      {chapter.chapter_title !== "" ? (
                        
                          <li className={`${chapter.posts.length ? 'has-slideitem' : ''}`}>
                            <Link onClick={e => collapsed_item(e, `item-${chapter._id}`)} to="#">{chapter.chapter_title}</Link>
                            {chapter.posts.length ? (
                              <ul id={`item-${chapter._id}`} className="slideitem list-items">
                                {chapter.posts.map(x => (
                                  <li key={x._id}>
                                    <Link className={current_post_slug == x.slug ? 'selected_tab': ''} to={`${link_url}${x.slug}/`}>{x.post_title}</Link>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        
                      ) : (
                        <ul className="block-list custom-aside-tuts list-items">
                          {chapter.posts.map(x => (
                            <li key={x._id}>
                              <Link className={current_post_slug == x.slug ? 'selected_tab': ''} to={`${link_url}${x.slug}/`}>{x.post_title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </React.Fragment>
                  );
                })}

              </ul>

            ))
           
          : ''}
          
          {/* Posts */} 
          {
            (type == 'posts') ?
            posts.map( (x, index) => (
              <ul key={index} className="block-list custom-aside-tuts list-items">
                {
                  x.map(post => {
                    var link_url =  `${site_url}tutorials/${tutorial_slug}/`;
                    return (
                      <React.Fragment key={post._id}>
                        <li key={post._id}>
                          <Link className={current_post_slug == post.slug ? 'selected_tab': ''} to={`/tutorials/${tutorial_slug}/${post.slug}/`}>{post.post_title}</Link>
                        </li>
                      </React.Fragment>
                    );
                  })
                }
              </ul>
            )): ''
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
        
            
            
            changed_feedback_callback({thumb: true }) 
            
            submit_feedback(e, press_type)
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

    GenerateTutorialContent = ({ data, upcoming, built_url }) => {
      // Split the data by the delimiter "|"
      const parts = data.split('|').map(part => part.trim());
    
      // Process the parts to create the appropriate elements
      return (
        <div>
          {parts.map((part, index) => {
            // YouTube shortcode
            if (part.startsWith('[youtube')) {
              const src = part.match(/src="([^"]+)"/)[1];
              return (
                <div key={index} className="mt-25">
                  <LazyLoadYouTube cls="ifram-tut-youtube" url={src} />
                </div>
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
                return <this.TutorialLinks key={index} built_url={built_url} upcoming={upcoming} />;
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
        </div>
      );
    }

    TutorialLinks = ({upcoming, built_url}) => {
      return (
          <div className="wrapper chapter-elements max-1150 offset-left offset-right mt-30 flexbox gap-20 flex-wrap content-center"> 
                          
                      
              {
                  upcoming.chapters.length ?
                  (
                      upcoming.chapters.map(( chapter, k) => {
                          return ( <this.TutorialsList built_url={built_url} key={chapter._id} data={chapter.posts} chapter_title={chapter.chapter_title} index={k}/> );
                      })
                  ) :
                  (
                      upcoming.posts.length ?
                          Helper.chunkArray(upcoming.posts, 3 ).map(( posts, k) => {
                              return ( <this.TutorialsList built_url={built_url} key={k} data={posts} index={k}/> );
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
                      {data.map(x => <li key={x._id}><Link to={`${built_url}${x.slug}/`}>{x.post_title}</Link></li>)} 
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