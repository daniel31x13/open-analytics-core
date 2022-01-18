# Client-Logger-HTTP
### Get real-time online users and save to MongoDB database

> #### Note: If your website is using SSL/TLS please visit [HERE](https://github.com/Daniel31x13/Client-Logger-HTTPS "HERE"), this only works on HTTP not HTTPS.

Basically what it does is aside from showing real-time total active clients in the node console it also logs the following information to a MYSQL database:
- #### Device Ip
- #### User-agent
- #### IsMobile
- #### Date
- #### Active Time (Seconds)
- #### Visited url
- #### Location

### Demo

![alt demo](https://i.imgur.com/6HyXbfP.png)

------------
### Requirements
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
    const socket = io("ADDRESS"); // Enter URL with port
    socket.on('socketClientID', function (socketClientID) {
        socket.emit('clientMessage', window.location.href);
    });
</script>
```

#### Second Step
Add a table with this query to your MYSQL client (make sure to edit "DatabaseName"):
```sql
CREATE TABLE `DatabaseName`.`users` ( `ID` INT NOT NULL AUTO_INCREMENT , `IP` TEXT NOT NULL , `USER-AGENT` TEXT NOT NULL , `URL` TEXT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
```
#### Third Step
Run `npm install` in the main folder.
#### Fourth Step
And finally run `node index` also in the main folder.
