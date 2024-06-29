
import React from "react";
var PageContents = () => {
    const { param } = React.useParams();

    return (
        <b>
            This is a page on codedtag ! . {param}
        </b>
    );
}

export { PageContents }