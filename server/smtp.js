
Meteor.startup(function () {
  smtp = {
    username: 'thehilmar@gmail.com',
    password: 'p4$$w0rd',
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});