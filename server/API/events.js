let clients = [];

function registerClient(client) {
    clients.push(client);
  }
  
  function removeClient(clientId) {
    clients = clients.filter(client => client.id !== clientId);
  }

function sendSSEUpdate(message) {
    clients.forEach(client => {
        try {
        console.log('about to send a response');
        if (!client.res.finished) {
            client.res.write(`data: ${message}\n\n`);
            console.log('successfully sent a response');
        } else {
            console.warn('Response already finished.');
        }
        } catch (error) {
        console.error('Error sending SSE update:', error);
        clients = clients.filter(c => c.id !== client.id);
        }
    });
}

module.exports = {
    sendSSEUpdate,
    clients,
    registerClient,
    removeClient
  };
