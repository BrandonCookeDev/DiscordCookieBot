const fs = require('fs')
const path = require('path')

const template = `[default]
aws_access_key_id=${process.env.AWS_CREDENTIALS_ACCESS_KEY}
aws_secret_access_key=${process.env.AWS_CREDENTIALS_SECRET_ACCESS_KEY}`

const AWS_DIR = path.join(process.env.HOME, '.aws')
const CREDS_PATH = path.join(AWS_DIR, 'credentials')

class AWSCredentialsHelper{
	
	static write(){
		console.log('checking aws credentials')
		if(!fs.existsSync(AWS_DIR))
			fs.mkdirSync(AWS_DIR)
		if(!fs.existsSync(CREDS_PATH))
			fs.writeFileSync(CREDS_PATH, template, 'utf8')
		else return console.log('aws credentials already exist')

		console.log('wrote aws credentials: \n%s', template)
	}

}

module.exports = AWSCredentialsHelper