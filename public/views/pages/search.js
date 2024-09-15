import "@/app/globals.css";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import parse from 'html-react-parser';
import { Helper } from "./../services/helper";
import Header from "./../parts/header";
import Footer from "./../parts/footer";
import { useRouter } from 'next/router';
import Link from "next/link";
import Script from "next/script";  
/*import dynamic from "next/dynamic"; 
const AdCompaignBox = dynamic(() => import("./../services/ad_campaign"), {
    ssr: false,
});*/
import AdCompaignBox from "./../services/ad_campaign";

import { 
    SearchComponent,
    SubscribeComponents,
    ServerOffline
} from "./../services/components";

export default function Search({ upcoming }) {
    
    if(!upcoming) {
        return <ServerOffline/>
    }


    const header_content = parse(upcoming.settings.header)
    const footer_content = parse(upcoming.settings.footer)
     

    var SearchFormComponent = () => {
        return (
            <div className="error-message-container">
                
                <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'before_title'} />
                <h1 className='custom-headline section-head'>Find What You're Looking For!</h1>
                 <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_title'} />
                <p>
                    Welcome to our search page! Here, you can find exactly what you're looking for in just a few clicks.
                </p>

                <SearchComponent/>
                 <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'before_search_results'} />
                <p>
                    Simply type your keywords into the search bar above, then hit on the search button and we'll show you the most relevant results. 
                </p>
                 <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'inside_content'} />
                <p>
                Whether you're searching for articles, tutorials, or products, our search tool makes it easy to discover the information you need.
                </p>
                 <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_search_results'} />
            </div>          
        )
    }

    var SearchResultComponents = () => {
        return (
            <>

                <div className='text-left search-block-header'>
                     <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'before_title'} />
                    <h1 className='custom-headline section-head ssreash'>Search results for <b>{Helper.decodeHtmlEntities(upcoming.result_title)}</b></h1>
                    <span className='search-result-row'>{upcoming.results.length} results found</span>
                     <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_title'} />
                </div>

                <div className='search-block-body'>
                     <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'before_search_results'} />
                    {
                        upcoming.results.length ? (
                            <ul className='searched-items'> 
                                {upcoming.results.map( (x, key_value) => { 
                                   
                                    var link = `${upcoming.site_url}tutorials/${x.tutorial.slug}/`;
                                    if( x.selected_tab.slug != '' ) {
                                        link = `${link}t/${x.selected_tab.slug}/`
                                    }

                                    
                                    link = `${link}${x.slug}/`;
                                    
                                    return (
                                        <Fragment key={x._id}>
                                            <li><Link href={link}>{x.post_title}</Link><span className='tutorial-name-searched'>{x.tutorial.name}</span></li>
                                            {
                                                ( key_value == 12 && upcoming.results.length >= 21 ) &&
                                                <li className='contain-li-ads'>
                                                    <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'inside_content'} />
                                                </li>
                                            }
                                        </Fragment>
                                    )
                                
                                })} 
                            </ul>
                        ): <p className='text-left'>No results found!</p>
                    }
                    
                     <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_search_results'} />
                </div>
            </>
        )
    }

    var jsonLdContent =`  
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "${`Search on ${upcoming.settings.site_name}`}",
                "url": "${upcoming.site_url}search",
                "description": "${upcoming.settings.site_meta_description}",
                "publisher": {
                    "@type": "Organization",
                    "name": "${upcoming.settings.site_name}",
                    "url": "${upcoming.site_url}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${upcoming.settings.site_logo}",
                        "width": 600,
                        "height": 60
                    }
                },
                "potentialAction": {
                        "@type": "SearchAction",
                        "target": "${upcoming.site_url}search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
            } 
        `;
    return (
        <>

            <Head>
                <title>{`Search on ${upcoming.settings.site_name}`}</title>
                <meta name="description" content={upcoming.settings.site_meta_description} />
                <link rel="canonical" href={`${upcoming.site_url}search/`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>

                <meta property="og:title" content={`Search on ${upcoming.settings.site_name}`}/>
                <meta property="og:description" content={upcoming.settings.site_meta_description}/>
                <meta property="og:url" content={`${upcoming.site_url}search`}/>
                <meta property="og:site_name" content={upcoming.settings.site_name}/>

                <meta property="og:image" content={upcoming.settings.site_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming.settings.site_thumbnail_url}/>
                <script
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{ __html: jsonLdContent }}
                />
 
                { header_content }
            </Head>
            
            <Header 
                settings={upcoming.settings}
                menus={{
                    nav_left: upcoming.nav_left, 
                    nav_right: upcoming.nav_right
                }}
            />

            <section className="page-block-section hero">
                {
                    upcoming.result_title == null || upcoming.result_title == '' ?
                    <SearchFormComponent />: 
                    <SearchResultComponents />
                }
            </section>
            
            <Footer 
                settings={upcoming.settings}
                menus={{
                    company_links: upcoming.company_links,
                    follow_links: upcoming.follow_links,
                    nav_links: upcoming.nav_links, 
                }}
            />
            { footer_content }
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        const router = context.resolvedUrl;
        var upcoming = {};
        var query_for = '';
        // Check if the URL contains '?q='
        const hasQueryParam = router.includes('?q=');

        var query = `search?q=''`
        if( hasQueryParam ) {
            const searchQuery = hasQueryParam ? router.split('?q=')[1] : ''; 
            query =  `search?q=${searchQuery}`;
            query_for = searchQuery;
        }



        // Default to an empty string if no query param
    
        const request = await Helper.sendRequest({
            api: query,
            method: "get",
            data: {}
        });

        if (!request.ok) {
            throw new Error('Server is offline');
        }

        if (request.status === 200) {
            const json = await request.json();

            if( json.settings.length ) {
                json.settings = json.settings[0];
            }

            let site_url = json.settings.site_address || null; // Set to null if undefined

            if (site_url) {
                const url_array = site_url.split('/');
                if (url_array[url_array.length - 1] !== '') {
                    site_url = `${site_url}/`;
                }
            }

            

            json.settings.site_address = site_url;

            if (json.settings.site_meta_title !== '') {
                json.settings.site_meta_title = `${json.settings.site_meta_title} ${json.settings.beside_post_title}`;
            }

            // prepare lists from menu 
            var nav_left = json.menus.filter( x=> x.menu_name === "main_menu")
            var nav_right = json.menus.filter( x=> x.menu_name === 'main_nav_right');
            var company_links = json.menus.filter( x=> x.menu_name === "company_nav_links")
            var follow_links = json.menus.filter( x=> x.menu_name === 'follow_nav_links');
            var nav_links = json.menus.filter( x=> x.menu_name === 'tags_nav_links');
            
            
            upcoming = {
                results: json.data,
                settings: json.settings,
                menus: json.menus,
                site_url: site_url, 
                nav_right,
                nav_left,
                company_links,
                follow_links,
                nav_links,
                site_url,
                result_title: query_for, // This will be an empty string if no query param is present
                ads: json.ads
            };
        }

        // Ensure site_url is defined as null if it's undefined
        upcoming.site_url = upcoming.site_url || null;

        return {
            props: { upcoming }
        };
    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
}
