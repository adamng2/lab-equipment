export interface Asset {

  unspsc_code: string;
  unspsc_title: string;
  equipment_current_building_location: string;

  acquisition_date: string;
  age_in_years: number;
  acquisition_value: number;
  accumulated_amortization: number;
  current_value: number;
  replacement_cost: number;
  relocation_cost: number;
  available_redundancy: string;


  core_to_capability: string;
  is_obsolete: number;
  is_kept_for_spare_parts: number;

  maximum_out_of_service_time: number;
  // estimated_remaining_useful_life: string;
  relocation_out_of_service_time: number;

  is_end_of_service: number;
  is_end_of_financial_life: number;
  cost_to_keep_running: number;
  can_be_relocated: number;
  asset_decision: string;

  department_asset_code: string;
}