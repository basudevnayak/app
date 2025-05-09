package com.anonymous.home_automation

import android.Manifest
import android.content.pm.PackageManager
import android.telephony.SmsManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*

class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SmsModule"
    }

    @ReactMethod
    fun sendSMS(phoneNumber: String, message: String, promise: Promise) {
        val context = reactApplicationContext
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.SEND_SMS)
            != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "SMS permission not granted")
            return
        }

        try {
            val smsManager: SmsManager = SmsManager.getDefault()
            smsManager.sendTextMessage(phoneNumber, null, message, null, null)
            promise.resolve("SMS sent successfully")
        } catch (e: Exception) {
            promise.reject("SMS_FAILED", e.message)
        }
    }
}