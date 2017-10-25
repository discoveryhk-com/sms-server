(function(ext) {
	var device = false;
	var serverIp	= '';
	ext._shutdown = function() {};
	ext._getStatus = function() {
		if(!device) return {status: 1, msg: 'Device not connected'};
		return {status: 2, msg: 'Device connected'};
	};
    	ext.sms_server_ip = function(ip) {
		console.log('console IP before = ' + serverIp);
		serverIp = ip;
		device = true;
		console.log('console IP after = ' + serverIp);
	};
    	ext.normalMsg = function(tel, msg) {
		var encoded = encodeURIComponent(msg);
		console.log('normal message: tel = ' + tel + ', msg = ' + encoded);
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?mode=scratch_normal&tel='+tel+'&msg=' + encoded,
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
    	ext.warningMsg = function(tel, msg) {
		var encoded = encodeURIComponent(msg);
		console.log('warning message: tel = ' + tel + ', msg = ' + encoded);
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?mode=scratch_warning&tel='+tel+'&msg=' + encoded,
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
    	ext.infoMsg = function(tel, msg) {
		var encoded = encodeURIComponent(msg);
		console.log('info message: tel = ' + tel + ', msg = ' + encoded);
		$.ajax({
			type: 'GET',
			dataType: 'JSONP',
			jsonpCallback: 'jsonp',
			url: 'http://' + serverIp + ':8080?mode=scratch_info&tel='+tel+'&msg=' + encoded,
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
			url: 'http://' + serverIp + ':8080?mode=scratch_warning&tel='+tel+'&msg=' + encoded,
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
		[' ', 'Set SMS server IP %s', 'sms_server_ip', '']
		,[' ', 'send normal sms tel:%s with message:%s', 'normalMsg', '', '']
		,[' ', 'send alert sms tel:%s with message:%s', 'warningMsg', '', '']
		,[' ', 'send information sms tel:%s with message:%s', 'infoMsg', '', '']
		//,['b', 'SMS setting ready', 'checkSMSserver']
	],
	url: 'https://www.discoveryhk.com'
	};

	ScratchExtensions.register('SMS Server', descriptor, ext);
	})({});
