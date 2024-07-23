
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helper } from '../helper';
import { Helmet } from 'react-helmet';
import { Header } from '../parts/header';
import { Footer } from '../parts/footer';

var SearchComponents = () => {
    
    var [upcoming, change_upcoming] = React.useState({
        results: null,
        settings: null,
        menus: null, 
        site_url: null,
        result_title: null
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
                    result_title: searchQuery
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
                    result_title: searchQuery
                }) 
            })
        }
    }, [location]); 


    var SearchFormComponent = () => {
        return (
            <section className="hero white-bg hero">
                    <div className="wrapper-no-padding offset-left offset-right">
                        <div className="banner-gray">
                            <div className="row offset-left offset-right max-1172 mlr--30 ptb-50">
                                <h1>Search in our tutorials</h1>
                                <form className="form-group form-1" action="/" method="get">
                                    <input type="text" placeholder="Search in our tutorials" />
                                    <button type="submit">
                                        <span className="flexbox">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <circle cx="11" cy="11" r="7" className="stroke-color" stroke="#33363F" strokeWidth="2" />
                                                <path d="M20 20L17 17" className="stroke-color" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            </section>
            
        )
    }

    var SearchResultComponents = () => {
        return <b>Start setup result here</b>
    }
      
    var SearchContentComponents = () => {
        return (<>
             <Helmet>
                        
                <title>{`${upcoming.settings?.site_name} Search: ${upcoming?.result_title != null ? upcoming?.result_title: upcoming.settings?.site_name}`}</title>
                <meta name="description" content={upcoming.settings?.site_meta_description} />
                
                <script type="application/ld+json">
                {
                    `  
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "${`${upcoming.settings?.site_name} Search: ${upcoming?.result_title != null ? upcoming?.result_title: upcoming.settings?.site_name}`}",
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

                <meta property="og:title" content={`${upcoming.settings?.site_name} Search: ${upcoming?.result_title != null ? upcoming?.result_title: upcoming.settings?.site_name}`}/>
                <meta property="og:description" content={upcoming.settings?.site_meta_description}/>
                <meta property="og:url" content={`${upcoming.site_url}search?q=${upcoming.result_title}`}/>
                <meta property="og:site_name" content={upcoming.settings?.site_name}/>

                <meta property="og:image" content={upcoming.settings?.site_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming.settings?.site_thumbnail_url}/>
            </Helmet>
            

            {
                upcoming.result_title == null ?
                <SearchFormComponent />: 
                <SearchResultComponents />
            }
        </>);
    }

    console.log(upcoming)

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