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
These are the versions that I had so it **may** work on your PC if you had an older version installed:
- #### NodeJS (version 16 or later)
- #### MongoDB (version 5 or later)
- #### Any other webserver that you want to serve your clients with (even NodeJS)
- #### OpenSSL (Optional: For HTTPS setup.)

------------
### Setup

#### First Step
Add this code to your client HTML page ([Example](clientExample.html "Example")):

```javascript
<script src="https://cdn.socket.io/4.4.0/socket.io.js"></script>
<script>
    const socket = io("ADDRESS"); // Enter URL with port
    socket.on('socketClientID', function (socketClientID) {
        socket.emit('clientMessage', {url: window.location.href, referrer: document.referrer}); // Send url and referrer as an object
    });
</script>
```

#### Second Step
Run `npm install` in the main folder.
#### Third Step
And finally run `node index` also in the main folder.

### HTTPS Setup
If your website is using HTTPS instead of HTTP you'll need to do the steps which are shown below:
#### First Step
To set up HTTPS support you'll need an [SSL certificate](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/ "SSL certificate").
To generate a self-signed certificate, run the following in your shell:

    openssl genrsa -out key.pem
    openssl req -new -key key.pem -out csr.pem
    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
    rm csr.pem
    
#### Second Step
After getting your `.pem` files just change line [7](https://github.com/Daniel31x13/Open-Analytics-Core-HTTP/blob/065d420066aa10d0787165f56f7d05d3b4ccc7d9/index.js#L7) to [12](https://github.com/Daniel31x13/Open-Analytics-Core-HTTP/blob/065d420066aa10d0787165f56f7d05d3b4ccc7d9/index.js#L12) (index.js file) with this: 

```javascript
const options = {
    key: fs.readFileSync('key.pem'), // Edit key.pem file path if needed (Default: Main folder)
    cert: fs.readFileSync('cert.pem'), // Edit key.pem file path if needed (Default: Main folder)
    cors: {
        origin: '*',
      }
}

const https = require('https').createServer(options, app);
const io = require('socket.io')(https, {
    cors: {
      origin: '*',
    }
});
```
#### Third Step
You'll need to add the `fs` module so add `const fs = require('fs');` at top of the index.js file.

#### Fourth Step
Change line [64](https://github.com/Daniel31x13/Open-Analytics-Core-HTTP/blob/065d420066aa10d0787165f56f7d05d3b4ccc7d9/index.js#L64) to [66](https://github.com/Daniel31x13/Open-Analytics-Core-HTTP/blob/065d420066aa10d0787165f56f7d05d3b4ccc7d9/index.js#L66) (bottom of the index.js file) with this:

```javascript
https.listen(PORT, () => {
    console.log("ALL SET!");
});
```

#### Fifth Step
Lastly change the `const socket = io("ADDRESS");` to `const socket = io("ADDRESS", {secure: true});` where ever your using the [client script](clientExample.html "client script").
