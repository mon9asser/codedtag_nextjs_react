
import StickyBox from "react-sticky-box";
import {Helper} from "./../../../services/helper"
import Header from "./../../../parts/header";
import Footer from "./../../../parts/footer"; 
  
/*import dynamic from "next/dynamic"; 
const AdCompaignBox = dynamic(() => import("./../../../services/ad_campaign"), {
    ssr: false,
});*/
import AdCompaignBox from "./../../../services/ad_campaign";
import { 
    ArticleSidebar,
    Breadcrumbs, 
    ArticleContentSingle,
    NextPrevPagination,
    SocialShare,
    FeedBackBlock,
    ServerOffline
} from "./../../../services/components"
import parse from 'html-react-parser' 
import Head from "next/head"; 
 
export default function Post ({upcoming}) {
    

    
    if(!upcoming) {
        return <ServerOffline/>
    }

     
    var image = ''

    if( upcoming ) {
        // head definations 
        image = upcoming?.post?.blocks?.filter(x => x.type == 'image');
        if( image.length == 0) {
            image = ''
        } else {
            image = image[0].data.file.url 
        }
    }

   

    var json_data_var = `
                        {
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "headline": "${upcoming?.post?.post_title}",   
                            "author": {
                                "@type": "Organization",
                                "name": "${upcoming?.settings?.site_name}"  
                            },
                            "datePublished": "${upcoming?.post?.created_date}",   
                            "dateModified": "${upcoming?.post?.updated_date}",   
                            "description": "${upcoming?.post?.meta_description}",   
                            "publisher": {
                                "@type": "Organization",
                                "name": "${upcoming?.settings?.site_name}",  
                                "logo": {
                                "@type": "ImageObject",
                                "url": "${upcoming?.settings?.site_logo}"  
                                }
                            },
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "${upcoming?.site_url}tutorials/${upcoming?.tutorial?.slug}/${upcoming?.post?.slug}/"   
                            },
                            "url": "${upcoming?.site_url}tutorials/${upcoming?.tutorial?.slug}/${upcoming?.post?.slug}/",  
                            "articleSection": "${upcoming?.tutorial?.tag}",   
                            "keywords": "${upcoming?.post?.keyphrase}",  
                            "image": "${image}",  
                            "breadcrumb": {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "${upcoming?.site_url}"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Tutorials",
                                        "item": "${upcoming?.site_url}tutorials/"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "${upcoming?.tutorial?.tutorial_title}",
                                        "item": "${upcoming?.site_url}tutorials/${upcoming?.tutorial?.slug}/"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 4,
                                        "name": "${upcoming?.post?.post_title}",
                                        "item": "${upcoming?.site_url}tutorials/${upcoming?.tutorial?.slug}/${upcoming?.post?.slug}/"
                                    }
                                ]
                            }
                            }
                `;

    var content_header = upcoming?upcoming.settings.header: ''
    var content_footer = upcoming?upcoming.settings.footer: ''
    const header_content = parse(content_header)
    const footer_content = parse(content_footer)
    
    var ArticleComponents = () => {

        return (
            <main className="wrapper max-1150 offset-left offset-right ptb-50">
                    <div className="row mlr--20">
                        
                        {
                            upcoming?.tutorial.options.sidebar_content != 'none' ?
                            <div className="md-4 md-1-half plr-20 main-sidebar flex-order-2-md">
                                <StickyBox offsetTop={85} offsetBottom={20}>
                                    
                                     <AdCompaignBox settings={upcoming.settings} data={upcoming?.ads} position={'before_sidebar'} />
                                    
                                    {
                                        upcoming?.tutorial.options.sidebar_content == 'chapters' && upcoming?.chapters.length != 0 ?
                                        <ArticleSidebar helper={{ads: upcoming?.ads, settings:upcoming?.settings}} site_url={upcoming?.site_url} tutorial_slug={upcoming?.tutorial.slug} type='chapters' data={upcoming?.chapters} current_post_slug={upcoming?.post.slug}/> 
                                        : <ArticleSidebar helper={{ads: upcoming?.ads, settings:upcoming?.settings}} site_url={upcoming?.site_url} tutorial_slug={upcoming?.tutorial.slug} type='posts' data={upcoming?.posts} current_post_slug={upcoming?.post.slug}/> 
                                    }
                                    
                                    
                                </StickyBox>
                            </div> : ''
                        }
                        
                            
                        <div className={`plr-20 md-2-content main-content flex-order-1-md ${upcoming?.tutorial.options.sidebar_content == 'none'?'md-9 auto-sides': 'md-8'}`}>
                            <div className="max-1150 offset-left offset-right demove-ads">
                                
                                 <AdCompaignBox settings={upcoming.settings} data={upcoming?.ads} position={'before_title'}/>

                                <header className="flexbox content-center column-direction mb-30">
                                    
                                    

                                    <div className="flexbox items-center">
                                        <Breadcrumbs
                                            data={[
                                                {
                                                    title: upcoming?.tutorial.selected_category.name,
                                                    url: upcoming?.site_url + 'tutorials/',
                                                },
                                                {
                                                    title: upcoming?.tutorial.tutorial_title,
                                                    url: upcoming?.site_url + 'tutorials/' + upcoming?.tutorial.slug + '/'
                                                }
                                            ]}
                                        /> 
                                    </div>
                                    
                                    <h1 className="tutorial-headline mt-h">{Helper.decodeHtmlEntities(upcoming?.post.post_title)}</h1>
                                    <i className="modified-date">
                                    Last updated on <time dateTime={Helper.formated_published_date(upcoming?.post.updated_date).value}>{Helper.formated_published_date(upcoming?.post.updated_date).text}</time>
                                    </i>
                                </header> 

                                 <AdCompaignBox settings={upcoming.settings} data={upcoming?.ads} position={'after_title'}/>

                                <div className="lg-2-content tutorial-content content-section">
                                    <ArticleContentSingle helper={{ads: upcoming?.ads, settings: upcoming?.settings}} blocks={upcoming?.post.blocks}/>
                                </div>

                            </div> 
                            
                            

                            {
                                upcoming?.posts?.length > 1 ? 
                                (
                                    <>
                                        <div className="separator-div"></div> 
                                        {
                                            upcoming?.tutorial.options.sidebar_content == 'chapters' && upcoming?.chapters.length != 0 ?
                                            <NextPrevPagination site_url={upcoming?.site_url} tutorial_slug={upcoming?.tutorial.slug} type='chapters' data={upcoming?.chapters} current_post_slug={upcoming?.post.slug}/>
                                            : <NextPrevPagination site_url={upcoming?.site_url} tutorial_slug={upcoming?.tutorial.slug} type='posts' data={upcoming?.posts} current_post_slug={upcoming?.post.slug}/> 
                                        } 
                                        <div className="separator-div"></div>
                                    </>
                                ): ""
                            }
                            
                            
                            
                            <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                                {
                                    upcoming?.settings.share_social_buttons == '' ? ''
                                    : 
                                    <>
                                        <span>Share <b className='share-txt-on'>{upcoming?.post.post_title}</b> on:</span>
                                        <div className="flexbox gap-15 share-box"> 
                                        <SocialShare   
                                            platforms={upcoming?.settings.share_social_buttons} 
                                            url={`${upcoming?.site_url}tutorials/${upcoming?.tutorial.slug}/${upcoming?.post.slug}/`}
                                            title={upcoming?.post.meta_title}
                                            size={32} 
                                            height={'32px'} 
                                            width={'32px'} 
                                            radius={!upcoming?.settings.circle_buttons} 
                                        />
                                        </div>
                                    </>
                                }
                            </div>
                            
                             <AdCompaignBox settings={upcoming.settings} data={upcoming?.ads} position={`after_contents`}/>

                            <FeedBackBlock data_id={upcoming?.post._id} data_title={upcoming?.post.post_title}/>
                        </div>

                    </div>
            </main> 
        )

    }

    
    return (
        ! upcoming ? '':
        <>
            <Head>
                     
                <title>{upcoming?.post?.meta_title}</title>
                <meta name="description" content={upcoming?.post?.meta_description} />
                {
                    upcoming?.post?.allow_search_engine == false ?
                    <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                    : ""
                }
                
                <link rel="canonical" href={`${upcoming?.site_url}tutorials/${upcoming?.tutorial?.slug}/${upcoming?.post?.slug}/`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>
                <meta property="og:title" content={upcoming?.post?.meta_title}/>
                <meta property="og:description" content={upcoming?.post?.meta_description}/>
                <meta property="og:url" content={`${upcoming?.site_url}tutorials/${upcoming?.tutorial?.slug}/${upcoming?.post?.slug}/`}/>
                <meta property="og:site_name" content={upcoming?.settings.site_name}/>

                <meta property="og:image" content={upcoming?.post?.article_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming?.post?.article_thumbnail_url}/>
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json_data_var}} /> 
                {header_content}
            </Head>

            <Header 
                settings={upcoming?.settings}
                menus={{
                    nav_left: upcoming?.nav_left, 
                    nav_right: upcoming?.nav_right
                }}
            />
            <ArticleComponents/>
            <Footer 
                settings={upcoming?.settings}
                menus={{
                    company_links: upcoming?.company_links,
                    follow_links: upcoming?.follow_links,
                    nav_links: upcoming?.nav_links, 
                }}
            />
             {footer_content}
        </> 
    )
}


export async function getServerSideProps(context) {   

    try {
         
       
        var {tutorial, post} = context.params;
          
        var request = await Helper.sendRequest({  
            api: `post-page/get?tut_name=${tutorial}&post_slug=${post}&tab=root`,
            method: "get",
            data: {}
        }) 
        
        
        
 
        if (!request.ok) {
            throw new Error('Server is offline');
        }
    
        var upcoming = {};
        
        if( request.status == 200) {
            
            var json = await request.json();    
             
            
            if( json.is_error || json.data.post == undefined|| json.data.post == null ) { 
                return {
                    notFound: true
                }
            }

            var site_url = json.data.settings.site_address;
            if(site_url) {
                var url_array = site_url.split('/');
                if( url_array[url_array.length - 1] != '' ) {
                    site_url = site_url + '/';
                }
            } 
            json.data.settings.site_address = site_url;
            
            
            if( json.data.settings?.beside_post_title  != "" && json.data.post.enable_beside_title  ) { 
                json.data.post.meta_title = json.data.post.meta_title + " " + json.data.settings?.beside_post_title;
            }
             
            // prepare lists from menu 
            var nav_left = json.data.menus?.filter( x=> x.menu_name === "main_menu")
            var nav_right = json.data.menus?.filter( x=> x.menu_name === 'main_nav_right');
            var company_links = json.data.menus?.filter( x=> x.menu_name === "company_nav_links")
            var follow_links = json.data.menus?.filter( x=> x.menu_name === 'follow_nav_links');
            var nav_links = json.data.menus?.filter( x=> x.menu_name === 'tags_nav_links');
             
            upcoming = {                 
                nav_right,
                nav_left,
                company_links,
                follow_links,
                nav_links,
                site_url, 
                ads: json.data.ads,
                menus: json.data.menus,
                post: json.data.post,
                settings: json.data.settings,
                chapters: json.data.chapters,
                tutorial: json.data.tutorial,
                posts: json.data.posts,
                is_redirect: json.redirect,
            }

            
        }


        

        return {
            props: {upcoming}
        }

    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }

}