---
layout: post
title: Mel-Frequency Cepstral Coefficients - Looking
Beyond the Spectrum of Human Speech
date: 2024-06-12 21:01:00
description: Originally published in ECarrier Magazine April 2024 Issue
tags: mfcc signal-processing deep-learning
categories: articles
thumbnail: assets/img/mfcc.png
---

`This article was originally published in [ECarrier Magazine April 2024 Issue](https://ent.uom.lk/wp-content/uploads/2024/06/E-Carrier-2024-Apr-Issue.pdf), the official magazine of Electronics and Telecommunciations Engineering Department at University of Moratuwa`

The Fourier Transform, a convenient technique to determine the frequency components of a signal, serves as one of the primary methods to extract features of an audio signal. However, with the advancement of the signal processing domain, more sophisticated methods such as short-time Fourier transform (STFT) and wavelet transform have been developed. In this article, we demonstrate one such evolved technique named “mel-frequency cepstral coefficients” (MFCC), which is adapted particularly for speech recognition tasks as a competent feature extractor. Furthermore, we delve into an effective application of this technique for speaker recognition at the IEEE Signal Processing Cup 2024 competition.

## Feature Extractors: The Datasheet of Signals

Before tackling what MFCC practically means or its derivation, we first consider the necessity of such a tool. Simply put, a feature extractor identifies certain qualities of a signal, similar to how characteristics like age, height, weight  and gender describe a human. They extract key features of an audio signal, like its power, frequencies and rate of change. A trivially simple feature extractor of an audio signal is its root mean square value. This tells us about the power contained within the signal. The zero-crossing rate is another such primary feature. This is a measurement of how fast the signal changes. It is a widely used metric in speech recognition and music information retrieval. Both these tools extract features of the signal in the time domain. However, integral transforms such as the Fourier transform (FT) enable us to investigate the domain of frequency, which unravels new features. The FT, or its primary derivative, power spectral density, encapsulates entirely the frequency components included in the signal and their relative power. However, by converting to the frequency domain, we lose temporal information. As a solution, we mediate the trade-off and localise the signal both in time and frequency by taking the STFT. The STFT, commonly known as the spectrogram, of a speech signal is shown in Figure 1.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/mfcc_comp.jpg" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 1 - Short Time Fourier Transform of a Speech Signal
</div>

This is a map of which frequencies are present at which time, hence a better feature extractor for speech signal processing. Usually, this is depicted using a figure more commonly known as a spectrogram. But what is the significance and superiority of MFCC when it comes to speech signal processing?

## Mel Scale: Extracting Human Voice Through Math

It was found that, by taking the spectrum of a spectrum, the periodic structures of the frequency spectrum can be visualised. This tool is sensitive to the low-frequency periodic excitation produced in the human vocal cords and the formant filtering which the voice signal is subjected to in the larynx. This approach to frequency domain analysis, cleverly named as the cepstrum (anagram for spectrum), opened up a newfound domain in signal processing known as cepstral analysis. The exact formula for the cepstrum is as follows,

$$C_p = |\mathcal{F}\{log(|\mathcal{F}\{f(t)\}|^2)\}|^2$$

Moreover, it was found that by interfering at the log-scaling stage, the cepstrum could be made more sensitive to human voice by taking the mel-scale [2] instead of simply the log-scale. The mel-scale is a perceptual scale of pitches, which, when used to scale the spectrum coefficients, results in a better representation of the cepstrum; and thus, we obtain the mel-frequency cepstrum. The formula for the mel-scale is as follows.

$$f = 700(10^{\frac{m}{2595}} - 1)$$

The detailed process of calculating the cepstrum involves applying a triangular filter-bank and several other technical details.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/mfcc_graph.jpg" title="blood sample image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 2 - The mel-frequency cepstrum of a speech signal
</div>

Next, we consider how to put the MFCC to good use in speech signal processing tasks. The next section builds on our experience from Signal Processing Cup 2024 as a case study to outline how MFCC can be integrated with deep learning techniques to build a speaker recognition inferencing system.

## Robovox Challenge: The Synergy of MFCC and Deep Neural Networks

The main task of the Signal Processing Cup 2024, organised by the IEEE Signal Processing Society, involved screening samples of noisy voice recordings from different speakers and identifying which speaker each recording belongs to from a pool of 71 speakers. During our attempt to provide a solution to this classification task, we applied the technique of extracting MFCC from the audio samples and feeding them into a deep neural network (DNN) to train it. Neural networks are a popular deep learning method where the model learns to identify features in the given data by itself. Therefore, when a feature extractor [3] of an audio sample (such as STFT or MFCC) is fed into a DNN model, it learns to create a feature space, known as an embedding, from several such samples of audio. That is, when given a unique voice recording of a speaker, the model maps it to a certain point on a feature space (similar to a vector space) unique to that speaker. We can force the model to map recordings of similar voices to the same point, by selecting an appropriate loss function. During our implementation, we architectured a popular DNN structure known as a bidirectional long short-term memory with triplet cosine loss as the loss function. This loss function relies on Cosine distance, a popular metric of similarity in a vector embedding context. Using the speaker embedding we formulated using this approach, we were able to accurately do inferences on new data and classify which speaker each recording belonged to. 

In conclusion, MFCCs prove to be versatile tools in speech recognition. They are a clever method of extracting features like pitch, tone, and the nature of utterances from the human voice. Moreover, this signal processing technique, when paired with modern data-driven learning methods such as deep learning, can help solve a variety of problems related to speech data processing.


