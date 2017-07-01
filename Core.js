const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const dateformat = require('dateformat')

cookieJar = ""
DailyData = {}
url = 'https://www.assetstore.unity3d.com'

process.setMaxListeners(0);

main()

function main(){
	// request main page first to get Oauth
	request({uri: url,followRedirect: false}, (err, res, body) => {
		if(err){
			console.log(err)
		}
		else{
			auth(res.headers.location)
		}
	})
}

function auth(url){
	console.log('pending ' + url)
	request({
		uri : url,
		followRedirect: false
	}, (err, res, body) => {
		//console.log(res)
		register(res.headers.location, res.headers['set-cookie'])
	})
}

function register(url, cookie, updateCookie=false){
	console.log('pending ' + url)
	if(updateCookie){
		
		// parse cookie
		cookieJar = ''
		for (var i = cookie.length - 1; i >= 0; i--) {
			str = cookie[i]
			if(str.indexOf("kharma_explicitly_logged_out") != -1){
				str = str.substring(str.indexOf("kharma_explicitly_logged_out"), str.length)
				cookieJar += str.substring(0, str.indexOf(";") + 1) // include ';'
			}
			else if(str.indexOf("kharma_session") != -1){
				str = str.substring(str.indexOf("kharma_session"), str.length)
				cookieJar += str.substring(0, str.indexOf(";") + 1) // include ';'
			}
			else if(str.indexOf("SERVERID") != -1){
				str = str.substring(str.indexOf("SERVERID"), str.length)
				cookieJar += str.substring(0, str.indexOf(";") + 1) // include ';'
			}
		}
		
		console.log('Cookie = ' + cookieJar)
		
		request({
			uri : 'https://www.assetstore.unity3d.com/api/en-US/sale/results/10.json',
			followRedirect: false,
			gzip: true,
			headers: {
				'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'en-US',
				'Cache-Control': 'max-age=0',
				'Connection': 'keep-alive',
				'Cookie': cookieJar,
				'Host': 'www.assetstore.unity3d.com',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
			}
		}, (err, res, body) => {

			parse(JSON.parse(body.toString()))

		})
		return;
	}
	else{
		cookieJar = cookie
		request({
			uri : url,
			followRedirect: false
		}, (err, res, body) => {
			/*console.log(res)
			console.log(res.headers['set-cookie'])*/
			register(res.headers.location, res.headers['set-cookie'], true);
		})
	}
}

function parse(data){
	
	DailyData.title = data.daily.title
	DailyData.id = data.daily.id
	DailyData.description = data.daily.description
	DailyData.icon = data.daily.icon
	
	request({
		uri : 'https://www.assetstore.unity3d.com/api/en-US/content/price/' + data.daily.id + '.json',
		followRedirect: false,
		gzip: true,
		headers: {
			'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'en-US',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Cookie': cookieJar,
			'Host': 'www.assetstore.unity3d.com',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
		}
	}, (err, res, body) => {
		
		updatePrice(JSON.parse(body))
		
	})
}

function updatePrice(priceData){
	DailyData.rrp = priceData.rrp
	DailyData.price = priceData.price
	DailyData.percentage = priceData.discount.percentage

	wrapUp()	
}

function wrapUp(){
	filename = 'dump/' + dateformat(new Date(), 'yyyy-mm-dd') + '.json'
	fs.writeFile(filename, JSON.stringify(DailyData, null, 4), 'utf8');
}