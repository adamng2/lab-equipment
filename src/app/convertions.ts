const metricLengths = {
  "m": 100,
  "cm": 1,
  "ft": 30.48,
  "in": 2.54,
}

const metricWeights = {
  "kg": 1,
  "lb": 0.453592
}

export const conversionMap = {
  "dimensional": {
    "equipment_width": {
      "units_key": "equipment_width_units",
      ...metricLengths
    },
    "footprint_length": {
      "units_key": "footprint_length_units",
      ...metricLengths
    },
    "footprint_height": {
      "units_key": "footprint_height_units",
      ...metricLengths
    },
    "clearance_width": {
      "units_key": "clearance_width_units",
      ...metricLengths
    },
    "clearance_length": {
      "units_key": "clearance_length_units",
      ...metricLengths
    },
    "equipment_weight": {
      "units_key": "equipment_weight_units",
      ...metricWeights
    },
  },
  "electrical": {
    "voltage": {
      "units_key": "voltage_units",
      "vac": 1,
      "vdc": 0.7071
    }
  }
}

/*
Convert values using conversionMap and form before submission
*/
export const convertFormValue = (form_value: any) => {
  Object.keys(conversionMap).forEach(form_group_name => {
    const form_group = form_value[form_group_name];
    Object.keys(conversionMap[form_group_name]).forEach(key => {
      const units_key = conversionMap[form_group_name][key].units_key;
      form_group[key] = (form_group[key] * conversionMap[form_group_name][key][form_group[units_key]]).toFixed(2);
      delete form_group[units_key];
    });
  })
}