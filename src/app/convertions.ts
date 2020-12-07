export const conversionMap = {
  "electrical": {
    "voltage": {
      "units_key": "voltage_units",
      "vac": 1,
      "vdc": 1 / Math.sqrt(2)
    }
  }
}

export const convertFormValue = (form_value: any) => {
  Object.keys(conversionMap).forEach(form_group_name => {
    const form_group = form_value[form_group_name];
    Object.keys(conversionMap[form_group_name]).forEach(key => {
      const units_key = conversionMap[form_group_name][key].units_key;
      form_group[key] = (form_group[key] * conversionMap[form_group_name][key][form_group[units_key]]).toFixed(2);
      console.log(form_group[key])
      delete form_group[units_key];
    });
  })
}