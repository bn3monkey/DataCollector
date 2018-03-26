const express = require('express')
const app = express()
const fs = require('fs')

var seq = 0
app.get('/update', function(req, res) {

	var q = req.query
	if(Object.keys(req.query).length === 0)
	{
		console.log("No query")
		res.end("No query")
		return;
	}
	else
	{
		if(req.query.api_key == undefined || req.query.field1 == undefined)
		{
			console.log("No Adequete query")
			res.end("No Adequete query")
			return;
		}
	}
 
	var csvform = req.query.api_key + "," + req.query.field1
	fs.appendFile('update.txt', csvform+"\n",
		function(err) {
			if(err)
				throw err
			console.log("%s", csvform)
			res.end("Got " + String(seq++) + " " + csvform+"\n")
		}
	);
})


app.get('/get', function(req,res) {
	
	var q = req.query
	var count = 0
	var whole = false

	if(Object.keys(q).length !== 0)
	{
		if(q.count == undefined)
		{
			console.log("No count in query")
			res.end("No count in query")
			return
		}
		count = parseInt(q.count, 10)
	}
	else
	{
		whole = true
	}

	
	fs.readFile('update.txt', 'utf-8', 
		function(err, data)
		{
			if(err) throw err
			var arr = String(data).split("\n")
			
			var pre_end = arr.length - count -1
			var end = pre_end >=0 ? pre_end : 0
			
			if(whole == true)
				end = 0

			var output = String()
			for(var i = arr.length - 2; i>=end; i--)
			{
				console.log(arr[i])
				output += arr[i] + "\n" 
			}
			res.end(output)
		}
	)
	
	
		
}) 

var port = 3000
app.listen(port, () => console.log("Data Collector app listening on port " + String(port)))
