# AWS IoT

# Instructions

## Serverless part 1

Take a look at the serverless project in the `./aws` directory.

Rename the project in `serverless.yml`, add a suffix to `temperature-api`, e.g. `temperature-api-ah` so that it doesn't clash with other students.

The `handler.js` file contains the code. It just logs the HTTP body to the console.

Once deployed, you can send a fake temperature reading by using `curl` at the command line.

```sh
curl --data '{"t":-1,"h":-1}' https://<your_url>/dev/temp
```

#### Tasks

* After you've executed the Lambda function, view the logs in CloudWatch Logs - can you see the JSON being logged?

## IoT part 1

Now let's send real data to the API.

The `./src/` directory contains micro-controller code for the ESP8266.

#### Tasks

* Ensure that your micro-controller is connected to the temperature sensor.
* Update `main.cpp` to include your Wifi SSID and password.
* Update the code that sends a HTTP request to send it to your API.
* Use the `upload` feature in platformio to "compile" and "flash" the microcontroller with the code.
* Use the serial monitor to see what's going on in the microcontroller.
* View the API logs in CloudWatch Logs, can you see the temperature.

## CloudWatch Log Insights

* Use CloudWatch Log Insights to create a graph of temperature and humidity by "scraping" the logs.
  * Hint - you'll need to use the `filter` and `stats` commands.

## Serverless part 2

Lets update the API to use CloudWatch Metrics.

#### Tasks

* Add the `aws-embedded-metrics` library to the `./aws` project with `npm`.
* Update the code to import the library.

```js
const { createMetricsLogger, Unit } = require("aws-embedded-metrics");
```

* Use the library to push metrics.

```js
const data = JSON.parse(event.body);

const metrics = createMetricsLogger();
metrics.putMetric("temp", data.t);
metrics.putMetric("humidity", data.h);
await metrics.flush();
```

* Graph the metrics in CloudWatch Metrics - it might take a few minutes for the metrics to appear.
* Can you work out how to create an alarm?

## Stretch goals

* Can you work out how to send the metrics to Kinesis Firehose?
  * What steps would you need to carry out?