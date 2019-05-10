const S3 = require('aws-sdk').S3
const REGION = process.env.AWS_S3_REGION || 'us-east-1';
const s3 = new S3({region: REGION});
const request = require('request')

class S3Helper{

	static get(bucket, key){
		return s3.getObject({
			Bucket: bucket,
			Key: key,
		}).promise()
	}

	static put(bucket, key, payload, contentType){
		return s3.putObject({
			Bucket: bucket,
			Key: key,
			Body: payload,
			ACL: 'public-read-write',
			ContentEncoding: 'binary',
			ContentType: contentType
		}).promise()
	}

	static list(bucket, prefix){
		return s3.listObjects({
			Bucket: bucket,
			Prefix: prefix || '/'
		}).promise()
	}

	static uploadUrlImageToS3(uri, bucket, path){
		return new Promise(function(resolve, reject){
			var options = {
				uri: uri,
				encoding: null
			};
			request(options, function(error, response, body) {
				if (error || response.statusCode !== 200) { 
					console.log("failed to get image");
					console.log(error);
				} else {
					s3.putObject({
						Body: body,
						Key: path,
						Bucket: bucket,
						ACL: 'public-read-write'
					}, function(error, data) { 
						if (error) {
							return reject("error downloading image to s3");
						} else {
							return resolve("success uploading to s3");
						}
					}); 
				}   
			})
		})
	}
}

module.exports = S3Helper