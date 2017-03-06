const expect = require('chai').expect;
const io = require('socket.io-client');

const socketURL = 'http://localhost:4000';

const options ={
  transports: ['websocket'],
  'force new connection': true
};

const chatUser1 = {'name':'Tom'};
const chatUser2 = {'name':'Sally'};
const chatUser3 = {'name':'Dana'};
  
describe("Socket Chat Server",function(){

  /* Test 1 - A Single User */
  it('Should broadcast new user once they connect', done => {

    //connect the user to the server
    const socket = io.connect(socketURL, options);

    //once a user is connected send over the infomation about the user we want to test
    socket.on('connect', data => {
      socket.emit('connection-name', chatUser1);
    });

    //
    socket.on('new token', usersName => {
      expect(usersName).be.a('string');

      /* If this socket doesn't disconnect it will interfere with the next test */
      socket.disconnect();
      done(); 
    });

  });

  it('Get infomation about player from database', done =>{

    const socket = io.connect(socketURL, options)
    const channels = ["channel1", "channel2", "channel3"] 

    socket.on('connect', () => {
      socket.emit('getPlayerInfo', channels)
    })
    socket.on('rooms-joined', rooms => {
      expect(rooms.length).equal(4)
      socket.disconnect();
      done();
    })
  })
  /*
  * socket should receive messages in all the rooms they are in
  */
  xit('Emit message only to people in the room', done =>{
    const message = "hello to channel 1";
    const channels = ["channel1", "channel2", "channel3"] 
    let socket1, socket2, socket3;
    let messages = 0;

    const checkMessage = client => {
      client.on('received-message', payload => { 
        expect(payload.msg).equal(message);
        expect(payload.ChatroomId).equal(1);
        messages++
      });
    }  


    socket1 = io.connect(socketURL, options)
    checkMessage(socket1);

    socket1.on('connect', data => {

      //socket has been "logged in". have them join all the channels that are determined in the "database" 
      socket1.emit('join-rooms', channels)

      //once socket has been connected. connect the next socket
      socket2 = io.connect(socketURL, options)
      checkMessage(socket2);

      socket2.on('connect', data => {
        socket2.emit('join-rooms', channels.slice(0,1))

        //once socket has been connected. connect the next socket
        socket3 = io.connect(socketURL, options)
        checkMessage(socket3)

        socket3.on('connect', data => {
          socket3.emit('join-rooms', channels.slice(1))
          
          //send out messages to specific rooms
          socket1.emit('message', {room: channels[0], msg: message, userId: 1, chatroomId: 1})

          //this listener is to make sure that the total amount of messages recieved in the room
          setTimeout(() =>{
            expect(messages).equal(2)
            socket1.disconnect()
            socket2.disconnect()
            socket3.disconnect();
            done();
          }, 500)
        }) 

      })
    })
  })
});