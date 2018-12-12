var webPush = require('web-push')
var pushSubscription = {
	"endpoint" : "https://android.googleapis.com/gcm/send/emJDY1f-PhE:APA91bET558trALwaLOBawM7db9chBP8QSGUPjoN-dxB_KyCo4HODCPsHYsPTLIZDchtB6tgCCnpgAaHrZ2-ZS9xF_4BN3oWs09ixMo4MhC_L7xMyNifG-GcIx9tyTbw8iLy4aYAVC6l",
	"keys" : {
		"p256dh": "BHi7A6uuDb1E/WLiYFnyljpdn3k1QIZiFNc9Xcr3c07V+og2n4xgtodqpF1kaQYkAmXE/1kO2Gj1HARbQDkCdyc=", 
        "auth": "MQMneIwuzMerOCjDC6RyhQ=="
	}
}


var payload = "ini payloadnya."

var options = {
	gcmAPIKey : 'AAAASmJIBes:APA91bFbf2jQuAEr9ulnkA6R1GxdVsxBr_I7Bmz4dPu2_nj__f0TNK3SuyNGFOArnIgPDvD0pWoGHR1PSNY0HaRqyEL4TqkJAbplHtRtLMFKWGx6xqZ0WX12IWTq3qcNUlgbFhRVvdLt',
	TTL : 60
}

webPush.sendNotification(
	pushSubscription,
	payload,
	options
)