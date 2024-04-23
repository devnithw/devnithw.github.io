---
layout: page
title: Robot Computer Vision System
description: Object and color identification system made for SLRC 2024
img: assets/img/cyl_detect.png
importance: 1
category: software
---

# Sri Lanka Robotics Challenge 2024
One of the tasks of SLRC 2024 is for the robot to identify whether the object at the center of a ring is a cube or a cylinder. We tackled this task using computer vision. We experimented with the two approaches mentioned below.

Watch the video:
{% include video.liquid path="https://www.youtube.com/watch?v=JsFgmXSXnWw" class="img-fluid rounded z-depth-1" %}

# Object Detection
## Training a Deep Learning model using Tensorflow
The robot includes a Raspberry Pi 4 Model B which runs a tensorflow model to inference. The video feed taken using a webcam is used for object classification. The deep learning model is trained using MobileNetV1 as the base model with 2 dense layers attatched and trained using transfer learning. The training accuracy of this model reached 99%.

## Using OpenCV edge detection
We also tried using OpenCV only to detect edges of the object in the center and generate contours. By hard-coding a specific number of contours as the threshold value, we can differentiate between the image of the cube and cylinder by comparing the number of contours generated. But we found this method is much more prone to errors. 

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/cube_edge.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/cube_model.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Development of the vision system using two approaches edge detection (left) and deep learning model (right).
</div>

# Color Detection
Another task of SLRC 2024 is to identify the color of the wall infront of the line follower. Only two colors, green and blue, are possible. This could have been easily done with a color sensor module for Arduino. But since we have a camera fixed for the previous task, we implemented this functionality aslo from OpenCV. The code is much simpler and involves using two color masks for green and blue. Finally, the program counts the pixel area of green and blue seperately and outputs the color with the greater pixel area. 

# Driver Code
You can find all the source code and development files for the project on [Github](https://github.com/devnithw/SLRC-vision-system). The final code running on the Raspberry Pi 4 Model B is included in the `main.py` file. This file consists of seperate functions `get_shape()` and `get_color()` which are called by the Raspberry Pi only when the Arduino Mega sends a request. The `main.py` file is run instantly after booting up the Raspberry Pi. 


{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
