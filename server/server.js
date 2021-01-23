const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const queryString = require('query-string');

const port = 9999;
const server = http.createServer(express);
const wss = new WebSocket.Server( { server })

const roomsIndex = {};
const connectedUsersIndex = {}; // for connected users tracking
const MESSAGE_TYPES = {
    PARTICIPANT_UPDATE: 'participant_update',
    INCOMING_MESSAGE: 'incoming_message'
}


wss.on('connection', (ws, incomingRequest) => {
    console.log('request- ',incomingRequest.url);
    const query = queryString.parse(incomingRequest.url.substring(1)); // includes '/'
    const userId = query.userId;
    const roomId = query.roomId;

    // TODO ifs should move to some init
    if (!roomsIndex[roomId]) {
        roomsIndex[roomId] = {
            id: roomId,
            participants: { [userId] : ws },
            messages: [],
        }
    } else {
        roomsIndex[roomId].participants[userId] = ws;
        // get previous messages
    }

    if (!connectedUsersIndex[userId]) {
        connectedUsersIndex[userId] = ws;
        // push participants update
        // if the user wasn't connected- sent a message to all participants in the room
        Object.values(roomsIndex[roomId].participants).forEach( client => {
            if (client.readyState === WebSocket.OPEN) {
                const onlineUsers = Object.keys(roomsIndex[roomId].participants);
                console.log({ onlineUsers });
                client.send(JSON.stringify({ type: MESSAGE_TYPES.PARTICIPANT_UPDATE, content: onlineUsers }));
            }
        })
    }


    ws.on('message', data => {
        const parsedData = JSON.parse(data);
        roomsIndex[roomId].messages.push(parsedData);
        Object.values(roomsIndex[roomId].participants).forEach( client => {
            // if (client !== ws && client.readyState === WebSocket.OPEN) {
             if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({type: MESSAGE_TYPES.INCOMING_MESSAGE, content: parsedData }));
            }
        })
    })

    ws.on('close', closeCode => {
        delete connectedUsersIndex[userId];
        delete roomsIndex[roomId].participants[userId];

        // push participants update
        Object.values(roomsIndex[roomId].participants).forEach( client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const onlineUsers = Object.keys(roomsIndex[roomId].participants);
                client.send(JSON.stringify({ type: MESSAGE_TYPES.PARTICIPANT_UPDATE, content: onlineUsers }));
            }
        })
    });
})

server.listen(port, function() {
    console.log('Listening on port ' + port);
})