package com.crossplatformsettings

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

// Module-specific imports
import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

const val NAME = "SharedPreferences"
const val KEY = "com.crossplatformsettings.PREFERENCE_FILE_KEY"

class ReactNativeSharedPreferencesModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  val SHARED_PREFERENCES =
    getReactApplicationContext().getSharedPreferences(KEY, Context.MODE_PRIVATE)
  val EDITOR = SHARED_PREFERENCES.edit()

  override fun getName() = NAME

  override fun getConstants(): Map<String, Any> {
    val entries = SHARED_PREFERENCES.getAll()
    val map = Arguments.createMap()

    for ((key, value) in entries) {
      map.putString(key, value.toString())
    }

    return map.toHashMap()
  }

  @ReactMethod
  fun set(map: ReadableMap) {
    val iterator = map.keySetIterator()

    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      val value = map.getString(key)
      EDITOR.putString(key, value)
    }

    EDITOR.commit()
  }
}
