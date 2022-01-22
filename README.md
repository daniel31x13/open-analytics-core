# Open-Analytics-Core-HTTP
### Get real-time online users and save the data to MongoDB database.

Basically what it does is aside from showing real-time total active clients in the node console it also logs the following information to a MongoDB database:
- #### Device Ip
- #### User-agent
- #### IsMobile
- #### Date
- #### Active Time (Seconds)
- #### Visited url
- #### Location
- #### Referrer

### Demo

![alt demo](https://i.imgur.com/0kLzHWj.png)

------------
### Requirements
> #### Note: If your website is using SSL/TLS please visit [HERE](https://github.com/Daniel31x13/Open-Analytics-Core-HTTPS "HERE"), this only works on HTTP not HTTPS.
These are the versions that I had so it **may** work on your PC if you had an older version installed:
- #### NodeJS (version 16 or later)
- #### MongoDB (version 5 or later)
- #### Any other webserver that you want to serve your clients with (even NodeJS)

------------
### Setup

#### First Step
Add this code to your client HTML page ([Example](clientExample.html "Example")):

```javascript
<script src="https://cdn.socket.io/4.4.0/socket.io.js"></script>
<script>
    const url = new URL(document.referrer);
    console.log(url.hostname);
    const socket = io("ADDRESS"); // Enter URL with port
    socket.on('socketClientID', function (socketClientID) {
        socket.emit('clientMessage', {url: window.location.href, referrer: url.hostname}); // Send url and referrer as an object
    });
</script>
```

#### Second Step
Run `npm install` in the main folder.
#### Third Step
And finally run `node index` also in the main folder.
