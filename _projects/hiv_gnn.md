---
layout: page
title: HIV GNN
description: A Graph Neural Network to classify human HIV inhibitor molecules using DeepChem feature extractor
img: assets/img/hivmolecule.jpeg
importance: 1
category: software
tags : ['Graph Neural Network', 'PyTorch Geometric', 'BioPhysics']
github: https://github.com/devnithw/hiv-gnn
---

## HIV Inhibitor Molecule Classification using GNN
A Graph Neural Network with Graph Convolution Layers to classify and generate HIV inhibitor molecules

## Data
The data for inhibitor molecules was obtained from [MoleculeNet](https://moleculenet.org/datasets-1) data repository. The file `HIV.csv` inclues experimentally measured abilities to inhibit HIV replication. This CSV includes three fields representing `molecule smiles` string, `activity` and `HIV_active` status. However the data is skewed in a way that there are 39684 samples for negative class (not HIV active) and 1443 samples for positive class (HIV active).

Following are some molecules visualized using RDKit Chem module.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/hiv_negative.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption">
            Visualization of random HIV negative molecules
        </div>
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/hiv_negative.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption">
            Visualization of random HIV positive molecules
        </div>
    </div>
</div>

These visualizations can be generated from the following code

```python 
from rdkit import Chem
from rdkit.Chem import Draw

# Convert SMILES to RDKit molecule object
molecules = [Chem.MolFromSmiles(smiles) for smiles in smiles]

# Draw the molecule into grid
img = Draw.MolsToGridImage(molecules, molsPerRow=3)
```

## Dataset Preprocessing

To handle class imbalance, the dataset was preprocessed before loading into a PyTorch Dataset class. Oversampling was used on the positive samples and increased them upto 10101 samples. Class imbalance will further be addressed by weighted loss during training.

The processed data was then seperated into two csv files using `sklearn.model_selection.train_test_split()` with a random split of 80:20. The csv files are stored in `data/train/raw` and `data/test/raw` seperately for proper working of the `torch_geometric.data.Dataset()` class. According to documentation, the Dataset class processes the data in the raw folder and caches in `root/processed` as a .pt file. 

To set up data for training run the `preprocess.py` file. The `dataset.py` file includes the class definition for the HIVDatset() object. Each molecule is saved as a PyTorch Geometric graph data object with node features, edge attributes, edge index and label. This is automated using DeepChem library [featurizers](https://deepchem.readthedocs.io/en/latest/api_reference/featurizers.html#molgraphconvfeaturizer). `MolGraphConvFeaturizer()` was used to extract different node level features using the SMILES string of a molecule. This requires RDKit to be installed. Some examples for features are Atom type, formal charge, hybridization, degree and chirality. The returned feature size is 30.

```python 
import deepchem as dc

# Initialize DeepChem featurizer
featurizer = dc.feat.MolGraphConvFeaturizer(use_edges=True)

# Generate features using DeepChem featurizers
out = featurizer.featurize(row["smiles"])

# Convert to PyG graph data
data = out[0].to_pyg_graph()
```

## Model
I used a simple Graph Convolutional Network (GCN) model (Kipf et al. 2017) as documented in PyG official tutorials. My model includes 3 layers of `torch_geometric.nn.GCNConv` to generate node embeddings followed by two linear layers. I used a hidden size of 512 inside each convolutional layers. The linear layer block reduces this 512 channel embedding to 64 then to 2. This outputs a 2-vector. The implementation is found in the `model.py` file. The model takes feature size (Usually 30) as input.

## Model Training
The training process is set up by first instantiating the train and test datset objects and dataloaders with `BATCH_SIZE = 128`. The model is initialized by passing `FEATURE_SIZE = 30` and send to the training device. The model has 574146 trainable parameters. The following optimizer and loss combination is used for training. Class weights are used to handle class imbalance. I calculated the class weights according to the class ratio in the preprocessed dataset. I found that if the dataset is balanced after oversampling weighted loss was producing worse results, therefore it can be turned off using the boolean `USE_WEIGHTED_LOSS`.

```python 
# Weight calculation
# For negative class = 49785 / (39684 x 2) = 0.63
# For positive class = 49785 / (10101 x 2) = 2.46

# Loss function
if USE_WEIGHTED_LOSS:
    weights = torch.tensor([0.63, 2.46], dtype=torch.float32).to(device) # Class weights to handle class imbalance
    loss_fn = torch.nn.CrossEntropyLoss(weight=weights)
else:
    loss_fn = torch.nn.CrossEntropyLoss()

# Optimizer
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Learning rate decay
scheduler = torch.optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.95)
```

The `train_step()` and `test_step()` functions include the code for generating predictions, updating weights and calculating metrics during the training loop. Also exponential learning rate decay is used.


During training using Google Colab, `EPOCHS = 100` was used. 
> As of the current training iteration (2024 July 14) the model obtains a train accuracy of 79%, test accuracy of 81% and gives the following loss curves.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/gnn_loss_curve.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

> **Improvements Due:**
>
> Next I will find the reason for the spikes in the test loss, and find ways to improve the F1 score which is 0.57.
> PyG graph classification tutorial recommends on using `torch_geometric.nn.GraphConv` (which includes neighborhood normalization), instead of `torch_geometric.nn.GCNConv`. A new model using these layers will be tried next.

## Technologies used
- PyTorch Geometric
- RDKit
- DeepChem
- Google Colab

## References
- [PyTorch Geometric Graph Datasets](https://pytorch-geometric.readthedocs.io/en/latest/tutorial/create_dataset.html)
- [DeepChem Featurizers](https://deepchem.readthedocs.io/en/latest/api_reference/featurizers.html)
- [PyTorch Geometric Graph Classification Tutorial](https://colab.research.google.com/drive/1I8a0DfQ3fI7Njc62__mVXUlcAleUclnb?usp=sharing)