const form = document.getElementById('mainForm');
const checkbox = document.getElementById('showpass');
const userInput = document.getElementById('username');
const passInput = document.getElementById('password');

const bootUsernamePassword = () => {
	getLogin()
	.then( data => {
		if(data) {
			//debugger;
			userInput.value = data.username;
			passInput.value = data.password;
		}
	})
}

const saveAndAttempt = (e) => {
	e.preventDefault();
	const username = userInput.value;
	const password = passInput.value;
	console.log('Saving - ', username, password);

	saveLogin({username, password})
	.then(() => {
		document.getElementById('saved').classList.add('show');
	})

	//chrome.runtime.sendMessage({activate: true});
	return false;
}

const saveLogin = (obj) => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.set({details: obj}, ()=> {
			resolve();
		});
	})
}

const getLogin = () => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get(null, (data) => {
			resolve(data.details);
		})
	})
}

const togglePass = (e) => {
	if(e.target.checked) {
		passInput.setAttribute('type', 'text');
	} else {
		passInput.setAttribute('type', 'password');
	}
}

form.addEventListener('submit', saveAndAttempt, false);
checkbox.addEventListener('change', togglePass, false);
bootUsernamePassword();