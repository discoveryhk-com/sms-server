package com.discoveryhk.sample;

import com.discoveryhk.smsserver.*;
import com.discoveryhk.smsserver.SMSGateway.ModeType;

public class SMS_Test {
	private SMSGateway smg = null;
	
	public SMS_Test() {
		smg = new SMSGateway("192.168.2.83", "password");
	}
	public void sendMsg(String tel, String message){
		if (smg != null)
			smg.send(ModeType.disctype_info, tel, message);
	}
	public static void main(String[] args) {
		SMS_Test st = new SMS_Test();
		st.sendMsg("92345678", "Testing テスト 테스트 測試 测试 Prueba 😂");
	}
}
