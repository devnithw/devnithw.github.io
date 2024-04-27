---
layout: page
title: Blood Cell Classification
description: Classification of blood cell images captured using CellaVision DM96 into 8 groups using Deep Learning.
img: assets/img/bloodcells.jpg
importance: 5
category: software
---

> Originally publised as a Notebook [Kaggle](https://www.kaggle.com/code/devnithw/classifying-blood-cells-using-cnn).
> Bronze winning Notebook.

## About the dataset
The dataset consists of 17,092 jpg images of individual normal cells, captured using the CellaVision DM96 analyzer at the Hospital Clinic of Barcelona. These images are categorized into eight groups: **neutrophils, eosinophils, basophils, lymphocytes, monocytes, immature granulocytes, erythroblasts, and platelets**. The images are `360 x 363 pixels` in size and have been annotated by clinical pathologists.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/bloodcell_samples.jpg" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Model structure
The model I used is a simple CNN model with two convolutional layers. The model could be improved by using Transfer Learning to build upon a pretrained model.

The code for the model is as follows

{% raw %}

```python
model = tf.keras.Sequential([
    keras.Input(shape=(300, 300, 3)),
    # Here is the rescaling layer which we use to normalize the input
    keras.layers.Rescaling(1./255),
    keras.layers.Conv2D(32, 3, activation='relu'),
    keras.layers.MaxPooling2D(),
    keras.layers.Conv2D(32, 3, activation='relu'),
    keras.layers.MaxPooling2D(),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Flatten(),
    keras.layers.Dense(num_classes)
])
```

{% endraw %}

The full code for the preprocessing, model training and evaluation process is included in the Jupyter Notebook.

## Results

This simple model resulted in a accuracy over 80%. The validation accuracy was 87.5%. As shown in the image below, the model has predicted the label for most images correctly.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/bloodcell_classified.jpg" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Technologies used
- Kaggle
- Tensorflow and Keras
- Numpy
- Matplotlib
