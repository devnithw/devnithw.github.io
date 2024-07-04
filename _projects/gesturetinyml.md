---
layout: page
title: Gesture Recognition TinyML
description: Classifying two hand gestures using IMU sensor data
img: assets/img/gesturetinyml.png
importance: 5
category: software
tags : ['TinyML', 'Nano 33 BLE Sense']
github: https://github.com/devnithw/gesture-tinyml
---

Embedded machine learning for gesture recognition using Arduino Nano 33 BLE Sense. Includes source code for programming the board and notebooks for training the model.

## Overview
This project is about developing a gesture recognition system using Arduino Nano 33 BLE Sense device to classify two arm gestures; a punch and a flex. First the motion data for these two actions are captured through the Nano board using its onboard accelerometer. Then the obtained data is used to train a Neural Network model using Tensorflow on Google Colab. The trained model is validated and exported into Tensorflow Lite format. This is uploaded to the Arduni Nano board to classify and predict the action of the arm. This project was carried out using [this article](https://docs.arduino.cc/tutorials/nano-33-ble-sense/get-started-with-machine-learning/) as a reference.

## How to use the Github repository
1. Open `IMU_Capture.ino` using Arduino IDE. Connect the Nano 33 BLE Sense board to the computer and set up the serial port correctly.
2. Download the `MBed OS` library for Nano boards using Arduino IDE Library Manager. Also add the `Arduino_TensorFlowLite-2.4.0-ALPHA.ZIP` file in the `library_files` folder by **Sketch > Include Library > Add .Zip Library**. 
3. Compile the code, upload it to the board and verify data is being read using the Serial Plotter. (Pick up the board and do a punch or a flex motion with the board in your hand)
4. Reset the board (using reset switch) and run the `serial_logger.py` script using Python. Do 10 repititions of punch motion and press `control+c` to exit. A new `.csv` file will be created. Rename this with the name of the moiton.
5. Do the same for the flex motion.
6. Run the Jupyter Notebook (preferably on Google Colab) and upload the two `.csv` files. Train the model and obtain the `model.h` file. Copy the contents of this file.
7. Open the `IMU_Classifier.ino` sketch. Create a new tab named `model.h` and paste the copied contents to this file.
8. Upload the code to the board and open the serial monitor. Perform a motion and observe the predicted classification in the serial output.


## Technologies used
- Arduino Nano 33 BLE Sense
- Arduino IDE
- Jupyter Notebook
