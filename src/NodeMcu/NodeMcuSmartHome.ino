#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <Arduino_JSON.h>
#define LED0 D0
#define LED1 D1
#define FIRE D5
#define WATER D6
#define TEMP A0

int ENA_pin = D7;
int IN1 = D2;
int IN2 = D3;

String sensorReadings;
const char *ssid = "Shahadat 2.4G";
const char *password = "51301530";
const char* serverName = "http://192.168.1.109:8000/device";
unsigned long lastTime = 0;
unsigned long timerDelay = 2000;

void setup() {
  Serial.begin(9600);
  pinMode(LED0, OUTPUT);
  pinMode(LED1, OUTPUT);
  pinMode(FIRE, INPUT);
  pinMode(WATER, INPUT);
  pinMode(TEMP, INPUT);
  pinMode(ENA_pin, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);

  Serial.println("Connecting...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void ledOnOff (int led, int value) {
  digitalWrite(led, value);
}
void fanControl (int status, int speed  ) {

  if (status == 1) {
    analogWrite(ENA_pin, speed);
    Serial.print(1);
    Serial.print(" : ");
    Serial.print(status);
    Serial.print(" : ");
    Serial.println(speed);
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
  } else {
    Serial.print(2);
    Serial.print(" : ");
    Serial.print(status);
    Serial.print(" : ");
    Serial.println(speed);
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
  }
}

void workWithGet() {
  JSONVar myObject = JSON.parse(sensorReadings);
  if (JSON.typeof(myObject) == "undefined") {
    Serial.println("Parsing input failed!");
    return;
  }
  ledOnOff(LED0, myObject["load"]["lights"][0]["status"]);
  ledOnOff(LED1, myObject["load"]["lights"][1]["status"]);
  fanControl(myObject["load"]["fan"][0]["status"], myObject["load"]["fan"][0]["speed"]);
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    if (WiFi.status() == WL_CONNECTED) {
      sensorReadings = httpGETRequest(serverName);
      workWithGet();
      httpPOSTRequest();

    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
String httpGETRequest(const char* serverName) {
  WiFiClient client;
  HTTPClient http;

  http.begin(client, serverName);
  int httpResponseCode = http.GET();
  String payload = "{}";
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
  return payload;
}

void httpPOSTRequest() {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverName);
  //http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.addHeader("Content-Type", "application/json");
  String httpRequestData;

  StaticJsonDocument<768> doc;
  JsonArray sensor = doc.createNestedArray("sensor");
  JsonObject sensor_0 = sensor.createNestedObject();
  sensor_0["id"] = 1;
  sensor_0["status"] = digitalRead(FIRE);
  sensor_0["type"] = 0;

  JsonObject sensor_1 = sensor.createNestedObject();
  sensor_1["id"] = 2;
  sensor_1["status"] = digitalRead(WATER);
  sensor_1["type"] = 1;

  JsonArray temphum = doc.createNestedArray("temphum");

  JsonObject temphum_0 = temphum.createNestedObject();
  temphum_0["id"] = 0;
  temphum_0["value"] = 0.5;
  temphum_0["type"] = 0;

  JsonObject temphum_1 = temphum.createNestedObject();
  temphum_1["id"] = 1;
  temphum_1["value"] = 0.6;
  temphum_1["type"] = 1;

  serializeJson(doc, httpRequestData);
  int httpResponseCode = http.POST(httpRequestData);
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  http.end();

}