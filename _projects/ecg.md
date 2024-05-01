---
layout: page
title: ECG monitor design
description: Development of an ECG Monitor prototype for the analog project in EN2091
img: assets/img/resonova.jpg
importance: 1
category: hardware
related_publications: false
tags : ['Analog Electronics',"Signal Processing", "ESP32"]
github: https://github.com/devnithw/ecg-monitor
---

During our semester 3, my team mates and I developed a ECG Monitor protoype device for our analog project in EN2091 Module. The goal of this project was to develop the a fully functioning device only using analog electronic components such as resistors, capacitors and OpAmps.

We initially simulated our proposed circuit design using **LTSpice** and **Multisim** software. We then implemented this complex circuitery as breadboard prototypes. After that we designed the PCB for the circuit using **Altium** PCB design software. The enclosure design was done using **Soliworks** CAD software. 


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ecg1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ecg2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ecg3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


The complete repository for this project along with the design files and simulation results can be found [here](https://github.com/devnithw/ecg-monitor).

The precise documentation of the development process is included in our project report which can be read [here](https://drive.google.com/file/d/1VTLobo_B8KYlnJlhfeuH8C6Mht4qa0J-/view?usp=sharing).