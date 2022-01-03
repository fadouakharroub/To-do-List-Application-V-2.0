
const mysql = require('mysql');
const http = require('http');
const { getReqData } = require("./data");
const PORT = process.env.PORT || 3000;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todoapp'
});

const server = http.createServer(async (req, res)=>{
if (req.url=== "/task" && req.method === "GET") {

    connection.query(`SELECT * FROM task`, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(results))
});

}else if (req.url=== "/project" && req.method === "GET") {

  connection.query(`SELECT * FROM project`, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results))
  });


  
}
//DELETE PROJECT
else if (req.url.match(/\/project\/([0-9]+)/) && req.method === "DELETE") {

  const id = req.url.split("/")[2]

  connection.query(`DELETE FROM project where id = ${id}`, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("project deleted")
  });

}
//DELETE TASK
else if (req.url.match(/\/task\/([0-9]+)/) && req.method === "DELETE") {
  
  const id = req.url.split("/")[2]

  connection.query(`DELETE FROM task where id = ${id}`, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("task deleted")
  });
}
//UPDATE TASK
else if (req.url.match(/\/task\/([0-9]+)/) && req.method === "PUT") {
  
  const id = req.url.split("/")[2]
  const data = await getReqData(req);
 let body = JSON.parse(data)

  let sql = `UPDATE task SET title = '${body.title}', description = '${body.description}' , status = '${body.status}' , date_db = '${body.date_db}', date_fin = '${body.date_fin}' WHERE id = ${id}`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("task updated")
  });
}

//UPDATE PROJECT
else if (req.url.match(/\/project\/([0-9]+)/) && req.method === "PUT") {
  
    const id = req.url.split("/")[2]
    const data = await getReqData(req);
   let body = JSON.parse(data)
  
    let sql = `UPDATE project SET title = '${body.title}', description = '${body.description}' , date_db = '${body.date_db}', date_fin = '${body.date_fin}' WHERE id = ${id}`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("project updated")
    });

}




})
server.listen(PORT, ()=>{
  console.log(PORT)
})

  
