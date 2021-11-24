let openDBConnection = require('../config/sqllite3');
let db;
let init = async function () {
    db = await openDBConnection();
}
init();
let bookmarkObject = require('../models/bookmark');

module.exports.addBookmark = async function (req, res) {
    try {
        await bookmarkObject.addBookmark(req.body.username, req.body.title, req.body.imageUrl, req.body.description, req.body.url, req.body.source);
        return res.redirect("/users/home");
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.bookmarksPage = async function (req, res) {
    let username = res.locals.user.username;
    let bookmarks = await bookmarkObject.getBookMarks(username);
    return res.render('bookmarks', { data: bookmarks });
}