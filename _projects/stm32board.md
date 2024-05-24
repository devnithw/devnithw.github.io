---
layout: page
title: STM32 Board Design
description: A custom STM32 development board PCB designed using KiCAD v7
img: assets/img/stm32_pcb.png
importance: 5
category: hardware
tags : ['KiCAD', 'STM32']
github: https://github.com/devnithw/stm32-devboard
---

This project contains KiCAD project files for a custom STM32 development board PCB which uses the STM32F103C8Tx microcontroller. All project files are contained in [this](https://github.com/devnithw/stm32-devboard) Github repository.

## Schematic design
The PCB schematic file for development board is contained in the file `stm32_board.kicad_sch`. The following is a screenshot of the schematic. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/stm32_sch.png" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The development board uses the `STM32F103C8Tx` microcontroller. USB interface is used for both power supply and serial communication. The power fdrom the USB interface is regulated to +3.3V using the regulator circuit. An High Speed External clock is used for 16 MHz operation. The board includes pin header ports for UART and I2C communication also.

## PCB design
The PCB layout file for the circuit is contained in `stm32_board.kicad_pcb` file. Below is the screenshot of the final PCB layout after routing. I have included mounting holes for the board to be mounted onto a enclosure. The footprints for most of the components have been used from the KiCAD library itself. 3D view for the USB port was downloaded from the manufaturer's website as a step file. I have added male headers for the UART, Serial Wire Debug and I2C communication ports. These can be configured using the STM32 Cube IDE software. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/stm32_pcb.png" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Shown below is the 3D view of the routed and finalized PCB.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/stm32_3d.png" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This project was done by following the Udemy course by Philip Salmony. [Reference](https://www.udemy.com/course/learn-kicad-v6-and-stm32-hardware-design/)

## Technologies Used
- KiCAD V7
- STM32