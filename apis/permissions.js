// create post without publish -> in review
// permission of users subscriber:0, Contributer:1, Editor:2, Author:3, Admin:4
var Permissions = [
    {   
        // Can read and comment on posts.
        cap: 0,
        name: 'subscriber',
        rules: []
    },
    {
        // Can write and submit posts for review.
        cap: 1,
        name: 'contributer',
        rules: []
    },
    {
        // Can publish and manage their own posts.
        cap: 2,
        name: 'author',
        rules: []
    },
    {
        // Can publish and manage posts, including others.
        cap: 3,
        name: 'editor',
        rules: [],
    },
    {
        // Has full control over the blog, including managing users.
        cap: 4,
        name: 'admin',
        rules: [
            // => Access Pages 
            "settings",
            "users",
            "dashboard",
            "create-post",
            "create-tutorial",
            "create-page",
            "create-user",
            "chapters",
            "menus",
            "campaigns",
            "messages",
            "links", 
            "comments",

            "edit-user",
            "edit-page",
            "edit-post",
            "edit-tutorial",

            "pages",
            "posts",
            "tutorials",
            "redirects",
            'media'
        ]
    }
]; 
 
module.exports = { Permissions };