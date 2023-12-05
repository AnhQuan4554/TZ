export class ClientSettings {
  static biocharMaterialInputMetricNames = ['biochar-dryer-input-biomass'];
  static biocharMaterialOutputMetricNames = [
    'biochar-pyrolyser-output-biochar',
  ];

  static biocharEnergyInputMetricNames = [
    'biochar-dryer-input-electricity',
    'biochar-grinder-input-electricity',
    'biochar-pyrolyser-input-electricity',
  ];

  static biocharEmissionMetricNames = [
    'biochar-grid-emission-carbon',
    'biochar-gas-emission-carbon',
  ];

  static biocharAbatementMetricNames = ['biochar-reduced-carbon'];

  static biocharProcesses = [
    {
      name: 'Biomass',
      group: 'Production Process',
      step: 1,
      metrics: [
        {
          label: 'Quantity',
          keys: ['biochar-dryer-input-biomass'],
          uom: 't',
        },
      ],
    },
    {
      name: 'Drying',
      group: 'Production Process',
      step: 2,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['biochar-dryer-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: ['biochar-dryer-input-electricity-carbon'],
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Grinding',
      group: 'Production Process',
      step: 3,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['biochar-grinder-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: ['biochar-grinder-input-electricity-carbon'],
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Pyrolysis',
      group: 'Production Process',
      step: 4,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['biochar-pyrolyser-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Gas emission',
          keys: ['biochar-pyrolyser-output-emissions'],
          uom: 'Nm3',
        },
        {
          label: 'Carbon emission',
          keys: [
            'biochar-pyrolyser-input-electricity-carbon',
            'biochar-pyrolyser-output-emissions-carbon',
          ],
          uom: 'kg',
        },
      ],
    },
  ];

  static ironoreMaterialInputMetricNames = ['ironore-crusher-input-iron_ore'];
  static ironoreMaterialOutputMetricNames = ['ironore-magsep-output-iron_conc'];
  static ironoreEnergyInputMetricNames = [
    'ironore-crusher-input-electricity',
    'ironore-evf-input-electricity',
    'ironore-mill-input-electricity',
    'ironore-magsep-input-electricity',
  ];

  static ironoreEmissionMetricNames = [
    'ironore-grid-emission-carbon',
    'ironore-gas-emission-carbon',
  ];

  static ironoreProcesses = [
    {
      name: 'Run of Mine Stockpile',
      group: 'Production Process',
      step: 1,
      metrics: [
        {
          label: 'Quantity',
          keys: ['ironore-crusher-input-iron_ore'],
          uom: 't',
        },
      ],
    },
    {
      name: 'Crusher',
      group: 'Production Process',
      step: 2,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['ironore-crusher-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: ['ironore-crusher-input-electricity-carbon'],
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Electromagnetic Vibration Feeder',
      group: 'Production Process',
      step: 3,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['ironore-evf-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: ['ironore-evf-input-electricity-carbon'],
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Mill',
      group: 'Production Process',
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['ironore-mill-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: ['ironore-mill-input-electricity-carbon'],
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Magnetic Separator',
      group: 'Production Process',
      step: 4,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['ironore-magsep-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: ['ironore-magsep-input-electricity-carbon'],
          uom: 'kg',
        },
      ],
    },
  ];

  static hismeltIronoreMaterialInputMetricNames = [
    'hismelt-oredryer-input-iron_conc',
  ];

  static hismeltBiocharMaterialInputMetricNames = [
    'hismelt-charmill-input-biochar',
  ];

  static hismeltEnergyInputMetricNames = [
    'hismelt-srv-input-electricity',
    'hismelt-charmill-input-electricity',
    'hismelt-ogc-input-electricity',
    'hismelt-boiler-input-electricity',
    'hismelt-oredryer-input-electricity',
    'hismelt-oxygenplant-input-electricity',
    'hismelt-compressor-input-electricity',
    'hismelt-hotblaststoves-input-electricity',
    'hismelt-otherusers-input-electricity',
    'hismelt-fgd-input-electricity',
  ];

  static hismeltEnergyOutputMetricNames = ['hismelt-boiler-output-electricity'];

  static hismeltMaterialOutputMetricNames = ['hismelt-srv-output-pig_iron'];
  static hismeltEmissionMetricNames = [
    'hismelt-gas-emission-carbon',
    // 'hismelt-grid-emission-carbon', // no carbon emission for self-generated energy
  ];

  static hismeltCarbonFootprintMetricNames = [
    'hismelt-gas-emission-carbon',
    // 'hismelt-grid-emission-carbon', // no carbon emission for self-generated energy
    'hismelt-input-biochar-carbon',
    'hismelt-input-ironore-carbon',
  ];

  static hismeltAbatementMetricNames = ['hismelt-reduced-carbon'];

  static hismeltProcesses = [
    {
      name: 'Char Mill',
      group: 'Pig Iron Production',
      step: 1,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-charmill-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
        {
          label: 'SRV Offgas In',
          keys: ['hismelt-charmill-input-srv_offgas'],
          uom: 'Nm3',
        },
      ],
    },
    {
      name: 'Ore Dryer',
      group: 'Pig Iron Production',
      step: 2,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-oredryer-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
        {
          label: 'OGC Offgas In',
          keys: ['hismelt-oredryer-input-ogc_offgas'],
          uom: 'Nm3',
        },
      ],
    },
    {
      name: 'SRV',
      group: 'Pig Iron Production',
      step: 3,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-srv-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
        {
          label: 'Pig Iron produced',
          keys: ['hismelt-srv-output-pig_iron'],
          uom: 't',
        },
        {
          label: 'Slag produced',
          keys: ['hismelt-srv-output-slag'],
          uom: 't',
        },
      ],
    },
    {
      name: 'OGC',
      group: 'Off-gas Processing',
      step: 1,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-ogc-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
        {
          label: 'Fuel gas out',
          keys: ['hismelt-ogc-output-ogc_offgas'],
          uom: 'Nm3',
        },
      ],
    },

    {
      name: 'Boiler',
      group: 'Off-gas Processing',
      step: 2,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-boiler-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
        {
          label: 'Energy Production',
          keys: ['hismelt-boiler-output-electricity'],
          uom: 'MWh',
        },
      ],
    },
    {
      name: 'Oxygen Plant',
      group: 'Off-gas Processing',
      step: 3,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-oxygenplant-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Compressor',
      group: 'Off-gas Processing',
      step: 4,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-compressor-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Hot Blast Stoves',
      group: 'Off-gas Processing',
      step: 5,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-hotblaststoves-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
      ],
    },
    {
      name: 'FGD',
      group: 'Off-gas Processing',
      step: 6,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-fgd-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Gas emission',
          keys: ['hismelt-fgd-output-emissions'],
          uom: 'Nm3',
        },
        {
          label: 'Carbon emission',
          keys: [
            // 'hismelt-fgd-input-electricity-carbon', // no carbon emission for self-generated energy
            'hismelt-fgd-output-emissions-carbon',
          ],
          uom: 'kg',
        },
      ],
    },
    {
      name: 'Other Users',
      group: 'Other',
      step: 1,
      metrics: [
        {
          label: 'Energy consumption',
          keys: ['hismelt-otherusers-input-electricity'],
          uom: 'MWh',
        },
        {
          label: 'Carbon emission',
          keys: [], // no carbon emission for self-generated energy
          uom: 'kg',
        },
      ],
    },
  ];

  static carbonEmissionMetricNames = [
    'biochar-grid-emission-carbon',
    'biochar-gas-emission-carbon',
    'ironore-grid-emission-carbon',
    'ironore-gas-emission-carbon',
    // 'hismelt-grid-emission-carbon', // no carbon emission for self-generated energy
    'hismelt-gas-emission-carbon',
  ];

  static carbonAbatementMetricNames = [
    'hismelt-reduced-carbon',
    'biochar-reduced-carbon',
  ];
}
