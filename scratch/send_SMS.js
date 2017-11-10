(function(ext) {
	var device = false;
	var serverIp = '';
	var serverPasswd = '';
	ext._shutdown = function() {};
	ext._getStatus = function() {
		if(!device) return {status: 1, msg: 'Device not connected'};
		return {status: 2, msg: 'Device connected'};
	};
    	ext.sms_server_ip = function(ip, passwd) {
		console.log('console IP before = ' + serverIp);
		serverIp = ip;
		serverPasswd = encodeURIComponent(passwd);
		device = true;
		console.log('console IP after = ' + serverIp);
	};
    	ext.normalMsg = function(telRaw, msg) {
		var encoded = encodeURIComponent(msg);
		var tel = encodeURIComponent(telRaw);
		console.log('normal message: tel = ' + tel + ', msg = ' + encoded);
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?passwd=' + serverPasswd + '&mode=disctype_normal&tel='+tel+'&msg=' + encoded,
			cache: false,
			xhrFields: {
			       	'withCredentials': true,
				'Access-Control-Allow-Credentials': 'true'
			  },
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'useDefaultXhrHeader': 'false'
			  },
			success: function(response) {
				$.each(response, function(key, value) {
				    console.log(key, value);
				});
			}
		});
	};
    	ext.warningMsg = function(telRaw, msg) {
		var encoded = encodeURIComponent(msg);
		var tel = encodeURIComponent(telRaw);
		console.log('warning message: tel = ' + tel + ', msg = ' + encoded);
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?passwd=' + serverPasswd + '&mode=disctype_warn&tel='+tel+'&msg=' + encoded,
			cache: false,
			xhrFields: {
			       	'withCredentials': true,
				'Access-Control-Allow-Credentials': 'true'
			  },
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'useDefaultXhrHeader': 'false'
			  },
			success: function(response) {
				$.each(response, function(key, value) {
				    console.log(key, value);
				});
			}
		});
	};
    	ext.infomMsg = function(telRaw, msg) {
		var encoded = encodeURIComponent(msg);
		var tel = encodeURIComponent(telRaw);
		console.log('warning message: tel = ' + tel + ', msg = ' + encoded);
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?passwd=' + serverPasswd + '&mode=disctype_info&tel='+tel+'&msg=' + encoded,
			cache: false,
			xhrFields: {
			       	'withCredentials': true,
				'Access-Control-Allow-Credentials': 'true'
			  },
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'useDefaultXhrHeader': 'false'
			  },
			success: function(response) {
				$.each(response, function(key, value) {
				    console.log(key, value);
				});
			}
		});
	};
	ext.checkSMSserver = function() {
		console.log('check SMS server');
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?passwd=' + serverPasswd + '&mode=disctype_test&tel='+tel+'&msg=' + encoded,
			cache: false,
			xhrFields: {
			       	'withCredentials': true,
				'Access-Control-Allow-Credentials': 'true'
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*',
				'useDefaultXhrHeader': 'false'
			},
			success: function(response) {
				$.each(response, function(key, value) {
				    console.log(key, value);
				});
				return true;
			},
			error: function(response) {
				$.each(response, function(key, value) {
				    console.log(key, value);
				});
				return false;
			}
		});
	};
	var descriptor = {
	blocks: [
		[' ', 'Set SMS server IP %s and password %s', 'sms_server_ip', '', '']
		,[' ', 'send information sms tel:%s with message:%s', 'infomMsg', '', '']
		,[' ', 'send normal sms tel:%s with message:%s', 'normalMsg', '', '']
		,[' ', 'send alert sms tel:%s with message:%s', 'warningMsg', '', '']
		//,['b', 'SMS setting ready', 'checkSMSserver']
	],
	url: 'https://www.discoveryhk.com'
	};

	ScratchExtensions.register('SMS Server', descriptor, ext);
	})({});
