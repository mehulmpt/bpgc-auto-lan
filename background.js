const attempt = () => {
	console.log('Attempting...');

	getDetails().then( data => {
		const configs = {
			mode: 191,
			username: data.username,
			password: data.password,
			producttype: 0,
			a: new Date().getTime()
		}
		$.post('https://10.1.0.10:8090/login.xml', configs, data => {
			console.log(data);
		});
	})
}

const getDetails = () => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(null, data => {
			resolve(data.details);
		})
	});
}

const checkIfNet = () => {
	$.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1?q='+new Date().getTime(),
      success: function() {
          // rest
          console.log('Online');
      },
      error: function() {
      	console.log('attempting');
      	attempt();
      },
      timeout: 3000 // sets timeout to 5 seconds
  });
};

setInterval(checkIfNet, 5000);