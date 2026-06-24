// Simple rule:
// {
//     id: '...',
//     question: 'question_key',
//     answer: 'expected_answer',
//     effects: [
//         { criterion: 'criterion_key', multiplier: 1.20 }
//     ]
// }
//
// Interaction rule:
// {
//     id: '...',
//     conditions: [
//         { question: 'question_key', answer: 'expected_answer' }
//     ],
//     effects: [
//         { criterion: 'criterion_key', multiplier: 1.20 }
//     ]
// }

export const RULES = [

    // SECTION A — MOVEMENT CONTEXT
    // Soft rules providing kinematic context

    // A1 — Movement to assist

    {
        id: 'A1-R1',
        question: 'A1_movement',
        answer: 'combination',
        effects: [
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.20
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.15
            }
        ]
    },

    {
        id: 'A1-R2',
        question: 'A1_movement',
        answer: 'elevation',
        effects: [
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.20
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.15
            },
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 1.20
            }
        ]
    },

    {
        id: 'A1-R3',
        question: 'A1_movement',
        answer: 'flexion_extension',
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 1.15
            }
        ]
    },


    // A2 — Required range of motion
    // medium = neutral, no weight adjustment

    {
        id: 'A2-R1',
        question: 'A2_rom',
        answer: 'reduced',
        effects: [
            {
                criterion: 'Motion_precision',
                multiplier: 1.10
            }
        ]
    },

    {
        id: 'A2-R2',
        question: 'A2_rom',
        answer: 'wide',
        effects: [
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.20
            }
        ]
    },


    // A3 — Uniaxial or multiplanar motion

    {
        id: 'A3-R1',
        question: 'A3_motion_type',
        answer: 'uniaxial',
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 1.20
            }
        ]
    },

    {
        id: 'A3-R2',
        question: 'A3_motion_type',
        answer: 'multiplanar',
        effects: [
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.20
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.20
            }
        ]
    },


    // SECTION B — ORTHOSIS FUNCTION
    // Stronger rules describing the primary mechanical role

    // B1 — Intended action of the orthosis
    {
        id: 'B1-R1',
        question: 'B1_action',
        answer: 'assist',
        effects: [
            {
                criterion: 'Assistance_constant',
                multiplier: 1.10
            },
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 1.10
            },
            {
                criterion: 'Assistance_partial_range',
                multiplier: 1.10
            }
        ]
    },

    {
        id: 'B1-R2',
        question: 'B1_action',
        answer: 'resist',
        effects: [
            {
                criterion: 'Motion_precision',
                multiplier: 1.50
            },
            {
                criterion: 'Supports_rotation',
                multiplier: 1.20
            },
            {
                criterion: 'Supports_translation',
                multiplier: 1.20
            },
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.20
            },
            {
                criterion: 'Remote_transmission',
                multiplier: 0.80
            }
        ]
    },

    {
        id: 'B1-R3',
        question: 'B1_action',
        answer: 'guide',
        effects: [
            {
                criterion: 'Motion_precision',
                multiplier: 2.00
            },
            {
                criterion: 'Supports_rotation',
                multiplier: 1.50
            },
            {
                criterion: 'Supports_translation',
                multiplier: 1.50
            },
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.50
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.20
            }
        ]
    },

    {
        id: 'B1-R4',
        question: 'B1_action',
        answer: 'return_to_position',
        effects: [
            {
                criterion: 'Assistance_partial_range',
                multiplier: 1.30
            },
            {
                criterion: 'Assistance_constant',
                multiplier: 1.10
            },
            {
                criterion: 'Low_distal_mass_suitability',
                multiplier: 1.15
            }
        ]
    },

    


    // B2 — Force or torque generation

    {
        id: 'B2-R1',
        question: 'B2_force',
        answer: 'no',
        effects: [
            {
                criterion: 'Motion_precision',
                multiplier: 1.20
            }
        ]
    },

    {
        id: 'B2-R2',
        question: 'B2_force',
        answer: 'yes',
        effects: [
            {
                criterion: 'Assistance_constant',
                multiplier: 1.10
            },
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 1.10
            }
        ]
    },


    // SECTION C — TECHNICAL REQUIREMENTS

    // C1 — Assistance profile
 
    {
        id: 'C1-R1',
        question: 'C1_assistance',
        answer: 'constant',
        effects: [
            {
                criterion: 'Assistance_constant',
                multiplier: 2.00
            },
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 0.50
            },
            {
                criterion: 'Assistance_partial_range',
                multiplier: 0.50
            }
        ]
    },

    {
        id: 'C1-R2',
        question: 'C1_assistance',
        answer: 'variable_with_angle',
        effects: [
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 2.00
            },
            {
                criterion: 'Assistance_constant',
                multiplier: 0.50
            },
            {
                criterion: 'Assistance_partial_range',
                multiplier: 0.50
            }
        ]
    },

    {
        id: 'C1-R3',
        question: 'C1_assistance',
        answer: 'partial_range',
        effects: [
            {
                criterion: 'Assistance_partial_range',
                multiplier: 2.00
            },
            {
                criterion: 'Assistance_constant',
                multiplier: 0.50
            },
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 0.50
            }
        ]
    },


     // C2 — Remote transmission
  
    {
        id: 'C2-R1',
        question: 'C2_remote',
        answer: 'yes',
        effects: [
            {
                criterion: 'Remote_transmission',
                multiplier: 2.00
            },
            {
                criterion: 'Low_distal_mass_suitability',
                multiplier: 1.50
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.20
            },
            {
                criterion: 'Motion_precision',
                multiplier: 0.95
            }
        ]
    },

    {
        id: 'C2-R2',
        question: 'C2_remote',
        answer: 'no',
        effects: [
            {
                criterion: 'Remote_transmission',
                multiplier: 0.50
            },
            {
                criterion: 'Motion_precision',
                multiplier: 1.20
            }
        ]
    },

   // C3 — Low distal mass
  
    {
        id: 'C3-R1',
        question: 'C3_low_distal_mass',
        answer: 'yes',
        effects: [
            {
                criterion: 'Low_distal_mass_suitability',
                multiplier: 2.00
            },
            {
                criterion: 'Remote_transmission',
                multiplier: 1.30
            },
            {
                criterion: 'Complexity_level',
                multiplier: 0.90
            }
        ]
    },

    {
        id: 'C3-R2',
        question: 'C3_low_distal_mass',
        answer: 'no',
        effects: [
            {
                criterion: 'Remote_transmission',
                multiplier: 0.80
            },
            {
                criterion: 'Low_distal_mass_suitability',
                multiplier: 0.80
            }
        ]
    },


     // C4 — Adaptability to misalignment
  
    {
        id: 'C4-R1',
        question: 'C4_adaptability',
        answer: 'high',
        effects: [
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 2.00
            },
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.20
            },
            {
                criterion: 'Motion_precision',
                multiplier: 0.90
            }
        ]
    },

    {
        id: 'C4-R2',
        question: 'C4_adaptability',
        answer: 'medium',
        effects: [
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.50
            }
        ]
    },

    {
        id: 'C4-R3',
        question: 'C4_adaptability',
        answer: 'low',
        effects: [
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 0.80
            },
            {
                criterion: 'Motion_precision',
                multiplier: 1.30
            }
        ]
    },


     // C5 — Motion precision
    // medium = neutral, no weight adjustment

    {
        id: 'C5-R1',
        question: 'C5_precision',
        answer: 'high',
        effects: [
            {
                criterion: 'Motion_precision',
                multiplier: 2.00
            },
            {
                criterion: 'Remote_transmission',
                multiplier: 0.90
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 0.90
            }
        ]
    },

    {
        id: 'C5-R2',
        question: 'C5_precision',
        answer: 'low',
        effects: [
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.20
            },
            {
                criterion: 'Motion_precision',
                multiplier: 0.80
            }
        ]
    },


     // C6 — Mechanical movement
  
    {
        id: 'C6-R1',
        question: 'C6_movement',
        answer: 'rotation',
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 2.00
            }
        ]
    },

    {
        id: 'C6-R2',
        question: 'C6_movement',
        answer: 'translation',
        effects: [
            {
                criterion: 'Supports_translation',
                multiplier: 2.00
            }
        ]
    },

    {
        id: 'C6-R3',
        question: 'C6_movement',
        answer: 'combined',
        effects: [
            {
                criterion: 'Supports_combined_motion',
                multiplier: 2.00
            },
            {
                criterion: 'Adaptability_to_misalignments',
                multiplier: 1.20
            }
        ]
    },


     // C7 — Acceptable complexity
  
     // Complexity_level is interpreted as suitability for a low-complexity,
    // simple and robust design.
   
    {
        id: 'C7-R1',
        question: 'C7_complexity',
        answer: 'low',
        effects: [
            {
                criterion: 'Complexity_level',
                multiplier: 2.00
            }
        ]
    },

    {
        id: 'C7-R2',
        question: 'C7_complexity',
        answer: 'medium',
        effects: [
            {
                criterion: 'Complexity_level',
                multiplier: 1.20
            }
        ]
    },

    {
        id: 'C7-R3',
        question: 'C7_complexity',
        answer: 'high',
        effects: [
            {
                criterion: 'Complexity_level',
                multiplier: 0.70
            }
        ]
    },

   // C8 — Actuation type
  
    {
        id: 'C8-R1',
        question: 'C8_actuation_type',
        answer: 'active',
        effects: [
            {
                criterion: 'Active_actuation_compatibility',
                multiplier: 2.00
            },
            {
                criterion: 'Motion_precision',
                multiplier: 1.20
            }
        ]
    },

    {
        id: 'C8-R2',
        question: 'C8_actuation_type',
        answer: 'passive',
        effects: [
            {
                criterion: 'Active_actuation_compatibility',
                multiplier: 0.50
            }
        ]
    },


     // INTERACTION RULES
    // All conditions must be true.
   
    // Assist + force required + low distal mass
   
    {
        id: 'IR-1',
        conditions: [
            {
                question: 'B1_action',
                answer: 'assist'
            },
            {
                question: 'B2_force',
                answer: 'yes'
            },
            {
                question: 'C3_low_distal_mass',
                answer: 'yes'
            }
        ],
        effects: [
            {
                criterion: 'Low_distal_mass_suitability',
                multiplier: 1.20
            }
        ]
    },


   // Assist + force required + remote transmission
   
    {
        id: 'IR-2',
        conditions: [
            {
                question: 'B1_action',
                answer: 'assist'
            },
            {
                question: 'B2_force',
                answer: 'yes'
            },
            {
                question: 'C2_remote',
                answer: 'yes'
            }
        ],
        effects: [
            {
                criterion: 'Remote_transmission',
                multiplier: 1.20
            }
        ]
    },


    // Guide or maintain trajectory + rotation
   
    {
        id: 'IR-3',
        conditions: [
            {
                question: 'B1_action',
                answer: 'guide'
            },
            {
                question: 'C6_movement',
                answer: 'rotation'
            }
        ],
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 1.10
            }
        ]
    },


     // Guide or maintain trajectory + translation
  
    {
        id: 'IR-4',
        conditions: [
            {
                question: 'B1_action',
                answer: 'guide'
                   
            },
            {
                question: 'C6_movement',
                answer: 'translation'
            }
        ],
        effects: [
            {
                criterion: 'Supports_translation',
                multiplier: 1.10
            }
        ]
    },


   // Guide or maintain trajectory + combined movement
   
    {
        id: 'IR-5',
        conditions: [
            {
                question: 'B1_action',
                answer:'guide'
                    
            },
            {
                question: 'C6_movement',
                answer: 'combined'
            }
        ],
        effects: [
            {
                criterion: 'Supports_combined_motion',
                multiplier: 1.10
            }
        ]
    },


    // Return to position + local + passive + low complexity
   
    {
        id: 'IR-6',
        conditions: [
            {
                question: 'B1_action',
                answer: 'return_to_position'
            },
            {
                question: 'C2_remote',
                answer: 'no'
            },
            {
                question: 'C8_actuation_type',
                answer: 'passive'
            },
            {
                question: 'C7_complexity',
                answer: 'low'
            }
        ],
        effects: [
            {
                criterion: 'Assistance_partial_range',
                multiplier: 1.20
            },
            {
                criterion: 'Complexity_level',
                multiplier: 1.15
            }
        ]
    },


    // Return to position + local + rotation
   
    {
        id: 'IR-7',
        conditions: [
            {
                question: 'B1_action',
                answer: 'return_to_position'
            },
            {
                question: 'C2_remote',
                answer: 'no'
            },
            {
                question: 'C6_movement',
                answer: 'rotation'
            }
        ],
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 1.15
            },
            {
                criterion: 'Motion_precision',
                multiplier: 1.10
            }
        ]
    },


    // Uniaxial + local + rotation + low complexity
   
    {
        id: 'IR-8',
        conditions: [
            {
                question: 'A3_motion_type',
                answer: 'uniaxial'
            },
            {
                question: 'C2_remote',
                answer: 'no'
            },
            {
                question: 'C6_movement',
                answer: 'rotation'
            },
            {
                question: 'C7_complexity',
                answer: 'low'
            }
        ],
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 1.20
            },
            {
                criterion: 'Motion_precision',
                multiplier: 1.20
            }
        ]
    },


    // Active + local + rotation
  
   
    {
        id: 'IR-9',
        conditions: [
            {
                question: 'C8_actuation_type',
                answer: 'active'
            },
            {
                question: 'C2_remote',
                answer: 'no'
            },
            {
                question: 'C6_movement',
                answer: 'rotation'
            }
        ],
        effects: [
            {
                criterion: 'Supports_rotation',
                multiplier: 1.15
            },
            {
                criterion: 'Motion_precision',
                multiplier: 1.10
            },
            {
                criterion: 'Active_actuation_compatibility',
                multiplier: 1.30
            }
        ]
    },


    // Variable assistance + remote transmission + low distal mass
   
    {
        id: 'IR-10',
        conditions: [
            {
                question: 'C1_assistance',
                answer: 'variable_with_angle'
            },
            {
                question: 'C2_remote',
                answer: 'yes'
            },
            {
                question: 'C3_low_distal_mass',
                answer: 'yes'
            }
        ],
        effects: [
            {
                criterion: 'Assistance_variable_with_angle',
                multiplier: 1.50
            }
        ]
    }

];