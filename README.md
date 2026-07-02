## Decision-Support Methodology for Conceptual Selection of Motion Transmission Systems in 3D-Printed Dynamic Orthoses

## Usage

The DSS can be accessed through GitHub Pages: https://mariadeluna.github.io/dss-motion-transmission-systems/

## Overview
This repository contains the web implementation of a rule-based DSS developed as part of a Bachelor Thesis in Biomedical Engineering.

The system is used as a conceptual design support tool in the conceptual selection step of mechanical transmission archetypes for dynamic orthoses. 

The DSS performs the following steps:

- Collects clinical, biomechanical, mechanical and manufacturing requirements introduced by the user through a questionnaire a questionnaire.
- Applies a PLA manufacturing compatibility filter.
- Performs architectural branching according to remote transmission and actuation specifications.
- Activates IF–THEN rules based on the user's answers.
- Adjusts and normalizes the weights of the evaluation criteria.
- Calculates a weighted score for each candidate archetype.
- Generates a ranked shortlist of the most suitable motion transmission systems.


## Mechanical archetypes considered

The system compares ten mechanical transmission archetypes:

- A1: Cable-pulley / tendon-driven transmission
- A2: Bowden cable / cable-conduit transmission
- A3: Elastic cable / spring-assisted transmission
- A4: Articulated hinge with passive element
- A5: Flexible shell / leaf-spring / strut mechanism
- A6: Hybrid rigid-compliant mechanism
- A7: Spring-loaded linkage / four-bar / parallelogram
- A8: Cam-spring-cable / variable moment arm mechanism
- A9: Local rigid rotary transmission
- A10: Linear-to-rotary transmission


## Evaluation criteria

The DSS uses twelve evaluation criteria derived from literature:

- Constant assistance suitability
- Angle-dependent assistance suitability
- Partial-range assistance suitability
- Remote transmission suitability
- Low distal mass suitability
- Misalignment adaptability
- Motion precision
- Rotational motion support
- Translational motion support
- Combined motion support
- Active actuation compatibility
- Low-complexity suitability

Each archetype is scored from 1 to 3 for each criterion in the configuration matrix representing qualitatively how suitable they are for that criterion. 

## Repository structure

```text
/
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── data/
│   ├── configurations_matrix.csv
│   └── PLA_filter.csv
├── images/
│   ├── A1.jpg
│   ├── A2.jpg
│   ├── A3.jpg
│   ├── A4.jpg
│   ├── A5.jpg
│   ├── A6.jpg
│   ├── A7.jpg
│   ├── A8.jpg
│   ├── A9.jpg
│   └── A10.jpg
├── js/
│   ├── data.js
│   ├── dss.js
│   ├── engine.js
│   ├── rules.js
│   └── ui.js
└── styles/
    └── style.css
