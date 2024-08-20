
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helper } from '../helper';
import { Helmet } from 'react-helmet';
import { Header } from '../parts/header';
import { Footer } from '../parts/footer';
import { Link } from 'react-router-dom';

var SearchComponents = () => {
    
    var [upcoming, change_upcoming] = React.useState({
        results: null,
        settings: null,
        menus: null, 
        site_url: null,
        result_title: null,
        ads: null
    });

    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);
    const location = useLocation();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('q');
        if (searchQuery) {
            setQuery(searchQuery);
            Helper.sendRequest({
                api: `search?q=${searchQuery}`,
                method: 'get',
                data: {}
            }).then( res => {
                
                if( res.settings && res.settings.length ) {
                    res.settings = res.settings[0];
                }

                var site_url = res.settings?.site_address;
                if(site_url) {
                    var url_array = site_url.split('/');
                    if( url_array[url_array.length - 1] != '' ) {
                        site_url = site_url + '/';
                    }
                } 

                change_upcoming({
                    results: res.data,
                    settings: res.settings,
                    menus: res.menus, 
                    site_url: site_url,
                    result_title: searchQuery,
                    ads: res.ads
                }) 
            })
        } else {
            Helper.sendRequest({
                api: `search?q=''`,
                method: 'get',
                data: {}
            }).then( res => {
                
                if( res.settings && res.settings.length ) {
                    res.settings = res.settings[0];
                }

                var site_url = res.settings?.site_address;
                if(site_url) {
                    var url_array = site_url.split('/');
                    if( url_array[url_array.length - 1] != '' ) {
                        site_url = site_url + '/';
                    }
                } 

                change_upcoming({
                    results: res.data,
                    settings: res.settings,
                    menus: res.menus, 
                    site_url: site_url,
                    result_title: searchQuery,
                    ads: res.ads
                }) 
            })
        }
    }, [location]); 


    var SearchFormComponent = () => {
        return (
            <div className="error-message-container">
                
                <Helper.AdCompaignBox data={upcoming.ads} position={'before_title'} />
                <h1 className='custom-headline section-head'>Find What You're Looking For!</h1>
                <Helper.AdCompaignBox data={upcoming.ads} position={'after_title'} />
                <p>
                    Welcome to our search page! Here, you can find exactly what you're looking for in just a few clicks.
                </p>

                <Helper.SearchComponent/>
                <Helper.AdCompaignBox data={upcoming.ads} position={'before_search_results'} />
                <p>
                    Simply type your keywords into the search bar above, then hit on the search button and we'll show you the most relevant results. 
                </p>
                <Helper.AdCompaignBox data={upcoming.ads} position={'inside_content'} />
                <p>
                Whether you're searching for articles, tutorials, or products, our search tool makes it easy to discover the information you need.
                </p>
                <Helper.AdCompaignBox data={upcoming.ads} position={'after_search_results'} />
            </div>          
        )
    }

    var SearchResultComponents = () => {
        return (
            <>

                <div className='text-left search-block-header'>
                    <Helper.AdCompaignBox data={upcoming.ads} position={'before_title'} />
                    <h1 className='custom-headline section-head ssreash'>Search results for <b>{upcoming.result_title}</b></h1>
                    <span className='search-result-row'>{upcoming.results?.length} results found</span>
                    <Helper.AdCompaignBox data={upcoming.ads} position={'after_title'} />
                </div>

                <div className='search-block-body'>
                    <Helper.AdCompaignBox data={upcoming.ads} position={'before_search_results'} />
                    {
                        upcoming.results?.length ? (
                            <ul className='searched-items'> 
                                {upcoming.results?.map( (x, key_value) => { 

                                    var link = `${upcoming.site_url}tutorials/${x.tutorial.slug}/`;
                                    if( x.selected_tab.slug != '' ) {
                                        link = `${link}t/${x.selected_tab.slug}/`
                                    }
                                    link = `${link}${x.slug}/`;

                                    return (
                                        <React.Fragment key={x._id}>
                                            <li><Link to={link}>{x.post_title}</Link><span className='tutorial-name-searched'>{x.tutorial.name}</span></li>
                                            {
                                                ( key_value == 12 && upcoming.results.length >= 21 ) &&
                                                <li className='contain-li-ads'>
                                                    <Helper.AdCompaignBox data={upcoming.ads} position={'inside_content'} />
                                                </li>
                                            }
                                        </React.Fragment>
                                    )
                                
                                })} 
                            </ul>
                        ): <p className='text-left'>No results found!</p>
                    }
                    
                    <Helper.AdCompaignBox data={upcoming.ads} position={'after_search_results'} />
                </div>
            </>
        ); 
    }
      
    var SearchContentComponents = () => {
        return (<>
             <Helmet>
                        
                <title>{`Search on ${upcoming.settings?.site_name}`}</title>
                <meta name="description" content={upcoming.settings?.site_meta_description} />
                
                <script type="application/ld+json">
                {
                    `  
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "${`Search on ${upcoming.settings?.site_name}`}",
                        "url": "${upcoming.site_url}search",
                        "description": "${upcoming.settings?.site_meta_description}",
                        "publisher": {
                            "@type": "Organization",
                            "name": "${upcoming.settings?.site_name}",
                            "url": "${upcoming.site_url}",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${upcoming.settings?.site_logo}",
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
                    `
                }
                </script> 

                <link rel="canonical" href={`${upcoming.site_url}search`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>

                <meta property="og:title" content={`Search on ${upcoming.settings?.site_name}`}/>
                <meta property="og:description" content={upcoming.settings?.site_meta_description}/>
                <meta property="og:url" content={`${upcoming.site_url}search`}/>
                <meta property="og:site_name" content={upcoming.settings?.site_name}/>

                <meta property="og:image" content={upcoming.settings?.site_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming.settings?.site_thumbnail_url}/>
            </Helmet>
            
            <section className="page-block-section hero">
                {
                    upcoming.result_title == null ?
                    <SearchFormComponent />: 
                    <SearchResultComponents />
                }
            </section>
            
        </>);
    }

    

    return (
        <> 
            <Header menus={upcoming.menus} settings={upcoming.settings}/>
                {
                    upcoming.results == null || upcoming.settings == null?
                    <Helper.PreLoader type={'article'} /> : (
                        <SearchContentComponents/>
                    )
                }
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
        </>       
    )

}

export { SearchComponents };