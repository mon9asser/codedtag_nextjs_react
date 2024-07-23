
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
        }
    }, [location]); 

     
     
    var SearchContentComponents = () => {
        return (<b>Data +++</b>);
    }

    return (
        <>

            <Helmet>
                        
                <title>{upcoming.settings?.site_name} Search: {upcoming.result_title?upcoming.result_title: ''}</title>
                <meta name="description" content={upcoming.post?.meta_description} />
                {
                    upcoming.post?.allow_search_engine == false ?
                    <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                    : ""
                }
                
                <script type="application/ld+json">
                {
                    `   
                    `
                }
                </script> 

                <link rel="canonical" href={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/${upcoming.post?.slug}/`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>
                <meta property="og:title" content={upcoming.post?.meta_title}/>
                <meta property="og:description" content={upcoming.post?.meta_description}/>
                <meta property="og:url" content={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/${upcoming.post?.slug}/`}/>
                <meta property="og:site_name" content={upcoming.settings?.site_name}/>

                <meta property="og:image" content={upcoming.post?.article_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming.post?.article_thumbnail_url}/>
            </Helmet>

            <Header menus={upcoming.menus} settings={upcoming.settings}/>
                {
                    upcoming.results == null ?
                    <Helper.PreLoader type={'article'} /> : (
                        <SearchContentComponents/>
                    )
                }
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
        </>       
    )

}

export { SearchComponents };