

import "@/app/globals.css";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../services/helper";
import Header from "./../parts/header";
import Footer from "./../parts/footer"; 
import Link from "next/link";
import Script from "next/script";
/*import dynamic from "next/dynamic"; 
const AdCompaignBox = dynamic(() => import("./../services/ad_campaign"), {
    ssr: false,
});
*/
import AdCompaignBox from "./../services/ad_campaign";
import { 
    SubscribeComponents,
    ServerOffline
} from "./../services/components"; 
import { notFound } from "next/navigation";

export default function Home({upcoming}){
     
    if(!upcoming) {
        return <ServerOffline/>
    }
    
    var jsonLdContent = `
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "CodedTag",
                "url": "${upcoming?.site_url}",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "${upcoming?.site_url}search?q={search_result}",
                    "query-input": "required name=search_result"
                },
                "sameAs": [${upcoming?.settings?.social_links}],
                "author": {
                    "@type": "Person",
                    "name": "Montasser Mossallem"
                },
                "description": "${upcoming?.settings?.site_meta_description}",
                "publisher": {
                    "@type": "Organization",
                    "name": "${upcoming?.settings?.site_name}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${upcoming?.settings?.site_logo}"
                    }
                }
            }
    `;

    var TutorialsSection = () => {
        return (
            <>
                <div className="header-section text-center">
                    
                    <h2 className="custom-headline section-head text-center mb-25 mt-25">{upcoming.settings?.homepage_section_title}</h2>
                    <p>{upcoming.settings?.homepage_section_description}</p>
                </div>
                
                <div className="row content-center">
                    
                    {
                        upcoming.tutorials?.length ? (
                            upcoming.tutorials.map(tutorial => {
                                return (
                                    <div key={tutorial._id} className="sm-6 md-4 lg-4 text-center p-all-15">
                                        <div className="tutorial-box">
                                            
                                            {
                                                tutorial?.tutorial_svg_icon != ''? 
                                                    <i className="tutorial-thumbs" dangerouslySetInnerHTML={{__html: tutorial?.tutorial_svg_icon}}/>
                                                : ""
                                            }
                                            
                                            <h3>
                                                <Link href={`${upcoming.site_url}tutorials/${tutorial.slug}/`}>{tutorial.tutorial_title}</Link>
                                                
                                                {
                                                    tutorial?.selected_category?.name != ''? 
                                                    <span className="subtitle">{tutorial?.selected_category?.name}</span>: 
                                                    ""
                                                }
                                                
                                            </h3>
                                            <Link className="floating-all" href={`${upcoming.site_url}tutorials/${tutorial.slug}/`}></Link>
                                        </div>
                                    </div>
                                )
                            })
                        ): (
                            
                            //upcoming.latest_posts.length
                            <>
                                {/*<ul className="latest-post-list">
                                   {
                                    upcoming.latest_posts.map(x => { 
                                        var href = `${upcoming.site_url}tutorials/${x.tutorial.slug}/`;
                                        if(x.selected_tab && x.selected_tab._id != 'root') {
                                            href =`${href}t/${x.selected_tab.slug}/` 
                                        }
                                        href= `${href}${x.slug}/`;
                                        
                                        return (
                                            <li key={x._id}>
                                                <Link href={href}>
                                                    <div className='post-thum'>
                                                        <Image alt={x.meta_title} src={x.article_thumbnail_url} width="90" height="195" />
                                                    </div>
                                                    <div className='post-data'>
                                                        <h3>{x.meta_title}</h3>
                                                        <span>{Helper.formatDate(x.updated_date)}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                   }
                                </ul>*/}
                            </>
                        )
                    }

                    

                </div>
            </>
        );
    }

    var SiteFeaturesSection = () => {
        return (
            <div className="row content-center">
                {
                    upcoming.settings.site_name == "" ?"": <h2 className="custom-headline section-head text-center mb-25 mt-25">Why {upcoming.settings.site_name} ?</h2>
                } 
                <div className='row items-center content-center'>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span className='flexbox items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 8C5 5.17157 5 3.75736 5.87868 2.87868C6.75736 2 8.17157 2 11 2H13C15.8284 2 17.2426 2 18.1213 2.87868C19 3.75736 19 5.17157 19 8V16C19 18.8284 19 20.2426 18.1213 21.1213C17.2426 22 15.8284 22 13 22H11C8.17157 22 6.75736 22 5.87868 21.1213C5 20.2426 5 18.8284 5 16V8Z" stroke="#ffff" strokeWidth="1.5"></path> <path opacity="0.5" d="M5 4.07617C4.02491 4.17208 3.36857 4.38885 2.87868 4.87873C2 5.75741 2 7.17163 2 10.0001V14.0001C2 16.8285 2 18.2427 2.87868 19.1214C3.36857 19.6113 4.02491 19.828 5 19.9239" stroke="#ffff" strokeWidth="1.5"></path> <path opacity="0.5" d="M19 4.07617C19.9751 4.17208 20.6314 4.38885 21.1213 4.87873C22 5.75741 22 7.17163 22 10.0001V14.0001C22 16.8285 22 18.2427 21.1213 19.1214C20.6314 19.6113 19.9751 19.828 19 19.9239" stroke="#ffff" strokeWidth="1.5"></path> <path opacity="0.7" d="M9 13H15" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M9 9H15" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"></path> <path opacity="0.4" d="M9 17H12" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                            </span>
                            
                        </div>
                        <h5>Free Tutorials</h5>
                    </div>
                    {
                        ( upcoming.settings.site_name != "" && upcoming.settings?.site_name?.toLowerCase()?.indexOf("codedtag") != -1 ) ?
                        <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                            <div className="codedtag-icon">
                                <span className='flexbox bg2 items-center content-center'>
                                    <svg className='flexbox' width="40px" height="40px" fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 1.6437 32.5493 L 8.3327 32.5493 C 8.9491 32.5493 9.5198 32.1840 9.6796 31.5220 L 10.3417 28.5770 L 13.5606 43.4845 C 13.8574 44.8543 16.0946 44.8543 16.3001 43.4617 L 19.0852 25.1526 L 22.3498 53.3924 C 22.5553 55.0818 24.9752 55.0589 25.1122 53.3924 L 28.1256 19.7192 L 31.1163 53.3696 C 31.2761 55.0818 33.6731 55.0818 33.8786 53.3696 L 37.1432 25.1526 L 39.9512 43.4845 C 40.1566 44.8771 42.3711 44.8771 42.6909 43.4845 L 45.8641 28.7596 L 46.5486 31.5220 C 46.7543 32.2753 47.2794 32.5493 47.8956 32.5493 L 54.3795 32.5493 C 55.2926 32.5493 56.0000 31.8416 56.0000 30.9512 C 56.0000 30.0609 55.2926 29.3304 54.3795 29.3304 L 48.9004 29.3304 L 47.0741 22.2533 C 46.6632 20.7237 44.6770 20.7237 44.3572 22.2533 L 41.5264 35.5856 L 38.3075 14.5598 C 38.0564 12.8933 35.7506 12.9390 35.5451 14.5827 L 32.6687 39.5351 L 29.5182 3.9214 C 29.3812 2.2092 26.8700 2.2092 26.7102 3.9214 L 23.5598 39.5351 L 20.6833 14.5827 C 20.5007 12.8933 18.1949 12.8933 17.9210 14.5598 L 14.7020 35.5856 L 11.8940 22.2533 C 11.5744 20.8379 9.5426 20.8379 9.1545 22.2533 L 7.3282 29.3304 L 1.6437 29.3304 C .7305 29.3304 0 30.0609 0 30.9512 C 0 31.8416 .7305 32.5493 1.6437 32.5493 Z"></path></g></svg>
                                </span>
                                
                            </div>
                            <h5>Free Online Compilers</h5>
                        </div>
                        :""

                    }
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span width='30px' className='bg3 flexbox items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.26022 2H16.7302C17.3802 2 17.9602 2.02003 18.4802 2.09003C21.2502 2.40003 22.0002 3.70001 22.0002 7.26001V13.58C22.0002 17.14 21.2502 18.44 18.4802 18.75C17.9602 18.82 17.3902 18.84 16.7302 18.84H7.26022C6.61022 18.84 6.03022 18.82 5.51022 18.75C2.74022 18.44 1.99023 17.14 1.99023 13.58V7.26001C1.99023 3.70001 2.74022 2.40003 5.51022 2.09003C6.03022 2.02003 6.61022 2 7.26022 2Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M13.5801 8.31982H17.2601" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M6.74023 14.1099H6.76022H17.2702" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M7 22H17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M7.1947 8.2998H7.20368" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="0.4" d="M10.4945 8.2998H10.5035" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </span> 
                        </div>
                        <h5>Solving Problems</h5>
                    </div>
                    <div className='center-icons sm-6 md-3 lg-3 text-center p-all-15'>
                        <div className="codedtag-icon">
                            <span className='flexbox bg4 items-center content-center'>
                                <svg className='flexbox' width="40px" height="40px" fill="#f5f5f5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002" xmlSpace="preserve" stroke="#f5f5f5"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <rect x="406.324" y="145.007" transform="matrix(0.9808 -0.1951 0.1951 0.9808 -50.3631 87.2844)" width="23.173" height="308.599"></rect> </g> </g> <g> <g> <rect x="458.948" y="134.53" transform="matrix(0.9808 -0.1951 0.1951 0.9808 -47.3079 97.3498)" width="23.173" height="308.599"></rect> </g> </g> <g> <g> <path d="M0,99.049V457.58h77.646V99.049H0z M54.065,422.886H23.582V133.744h30.482V422.886z"></path> </g> </g> <g> <g> <rect x="108.132" y="219.882" width="98.347" height="237.692"></rect> </g> </g> <g> <g> <path d="M108.128,54.422v14.145v120.837h98.343V60.972v-6.55H108.128z M182.275,160.792h-49.949v-30.482h49.949V160.792z M182.275,113.516h-49.949V83.034h49.949V113.516z"></path> </g> </g> <g> <g> <path d="M236.955,457.58h108.191V91.454H236.955V457.58z M255.335,351.716h71.43v30.482h-71.43V351.716z M255.335,398.99h71.43 v30.482h-71.43V398.99z"></path> </g> </g> </g></svg>
                            </span> 
                        </div>
                        <h5>Books and Resources</h5>
                    </div>
                </div>
            </div>
        );
    }
     
    const header_content = parse(upcoming.settings.header)
    const footer_content = parse(upcoming.settings.footer)
    return (
       <>
            <Head>
                <title>{upcoming.settings.site_meta_title}</title>
                <meta name="description" content={upcoming.settings.site_meta_description}/>
                <link rel="canonical" href={upcoming.site_url}/>
 
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={upcoming.settings.site_meta_title}/>
                <meta property="og:description" content={upcoming.settings.site_meta_description}/>
                <meta property="og:url" content={upcoming.site_url}/>
                <meta property="og:site_name" content={upcoming.settings.site_name}/> 
                
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta property="og:image" content={upcoming.settings.site_thumbnail_url} />
                <meta name="twitter:image" content={upcoming.settings.site_thumbnail_url}/>
                <script
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{ __html: jsonLdContent }}
                />
                {header_content}  
                
            </Head>
            <Header 
                settings={upcoming.settings}
                menus={{
                    nav_left: upcoming.nav_left, 
                    nav_right: upcoming.nav_right
                }}
            />

            <section className="hero white-bg hero">
                <div className="wrapper-no-padding offset-left offset-right">
                    <div className="banner-gray">
                        <div className="row offset-left offset-right max-1172 mlr--30 ptb-50 section-subscribe">
                            <div className={`lg-7 md-7 sm-12 flexbox content-center items-start column-direction p-all-30 ${upcoming.settings.banner_image_url == "" ? 'offset-left offset-right text-center': ''}`}>                                      
                                
                                <AdCompaignBox settings={upcoming.settings} position="before_title" data={upcoming.ads}/> 

                                <SubscribeComponents  
                                    camp_data={upcoming.ads}
                                    is_footer={false}
                                    settings={upcoming.settings}
                                    title={upcoming.settings?.banner_site_title}
                                    description={upcoming.settings?.banner_site_description}
                                />
                                
                            </div>
                            
                            {
                                upcoming.settings.banner_image_url == "" ? "" : 
                                <div className="lg-5 md-5 sm-12 flexbox content-center items-center column-direction p-all-15">
                                    <figure> 
                                        <Image
                                            crossOrigin="anonymous"
                                            className={'half'}
                                            alt={upcoming.settings.banner_site_title}
                                            height={200} 
                                            width={320}
                                            src={upcoming.settings.banner_image_url}  
                                        /> 
                                    </figure>
                                </div> 
                            }
                            
                            
                        </div>
                    </div>
                    <div className="feature-block">
                        <div className="max-1172 offset-left offset-right row plr-15 mlr--30 ptb-50 section-tutorials">
                            <AdCompaignBox settings={upcoming.settings} position="before_section_2" data={upcoming.ads}/> 
                            <SiteFeaturesSection/>
                            <AdCompaignBox settings={upcoming.settings} position="after_section_2" data={upcoming.ads}/> 
                        </div>
                    </div>
                    <div className="row offset-left offset-right plr-15 mlr--30 ptb-50 max-1172">
                        <AdCompaignBox settings={upcoming.settings} position="before_section_3" data={upcoming.ads}/> 
                        <TutorialsSection/>
                        <AdCompaignBox settings={upcoming.settings} position="after_section_3" data={upcoming.ads}/>
                    </div> 
                </div>
            </section> 

            <Footer 
                settings={upcoming.settings}
                menus={{
                    company_links: upcoming.company_links,
                    follow_links: upcoming.follow_links,
                    nav_links: upcoming.nav_links, 
                }}
            />

            {footer_content}
       </>
    )
}


export async function getServerSideProps(context) {

   
    try {
            var request = await Helper.sendRequest({
                api: "home-page/get",
                method: "get",
                data: {} 
            })
        
          if (!request.ok) {
              throw new Error('Server is offline');
          }
      
          var upcoming = {};
        
          if( request.status == 200) {
        
              var json = await request.json(); 
              
              var site_url = json.data.settings.site_address;
              if(site_url) {
                    var url_array = site_url.split('/');
                    if( url_array[url_array.length - 1] != '' ) {
                        site_url = site_url + '/';
                    }
              } 
              
              json.data.settings.site_address = site_url;
        
              if( json.data.settings.site_meta_title != '' ) {
                json.data.settings.site_meta_title = `${json.data.settings.site_meta_title} ${json.data.settings.beside_post_title}`;
              }
              
              // prepare lists from menu 
              var nav_left = json.data.menus?.filter( x=> x.menu_name === "main_menu")
              var nav_right = json.data.menus?.filter( x=> x.menu_name === 'main_nav_right');
              var company_links = json.data.menus?.filter( x=> x.menu_name === "company_nav_links")
              var follow_links = json.data.menus?.filter( x=> x.menu_name === 'follow_nav_links');
              var nav_links = json.data.menus?.filter( x=> x.menu_name === 'tags_nav_links');
              
              var posts = json.data.posts.filter(x => x.post_type == 0);
              if(posts.length) {
                posts = posts.slice(-6)
              }

               
              
              upcoming = {
                //latest_posts: posts,
                tutorials: json.data.tutorials,
                // posts: json.data.posts,              
                settings: json.data.settings,
                nav_right,
                nav_left,
                company_links,
                follow_links,
                nav_links,
                site_url,
                // menus: json.data.menus,              
                ads: json.data.ads
              };
        
          }
          
          return {
            props: {upcoming}
          }
    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
  
}
    