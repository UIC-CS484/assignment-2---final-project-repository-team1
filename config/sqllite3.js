const sqlite3 = require('sqlite3');
const {open} = require ('sqlite');

let openDBConnection = async function() {
  return open({
    filename: './db/users.sqlite',
    driver: sqlite3.Database
  })
}

let createTable=async function(){
  let db = await openDBConnection();
  const sql=`
  CREATE TABLE IF NOT EXISTS users(
    username TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sources(
    sourceId INTEGER NOT NULL,
    source TEXT NOT NULL,
    PRIMARY KEY (sourceId),
    UNIQUE (source)
  );
  CREATE TABLE IF NOT EXISTS user_preferences(
    username TEXT NOT NULL,
    sourceId INT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookmarks(
    username TEXT NOT NULL, 
    title TEXT NOT NULL,
    imageUrl TEXT,
    description TEXT,
    url TEXT,
    source TEXT,
    UNIQUE(title)
  );
  INSERT OR IGNORE INTO sources (source)
  VALUES ('bloomberg'),('al-jazeera-english'),('abc-news'),('bbc-news'),('business-insider'),('CNN'),('Engadget'),('ESPN'),('Reuters'),('cbc-news'),('fox-news'),('google-news'),('hacker-news'),('independent'),('mashable'),('techradar'),('the-hindu'),('the-verge'),('the-washington-post'),('usa-today'),('wired'),('the-wall-street-journal')`;

  db.exec(sql, function(err){
    if(err){
      console.log('Unable to create a table'+err.message);
    }
    else{
      console.log('Table initialised successfully');
    }
  });
}

createTable();

module.exports=openDBConnection;