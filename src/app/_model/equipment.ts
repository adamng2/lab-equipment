import { Asset } from "./asset";
import { Dimensional } from "./dimensional";

export class Equipment {

  id: number;
  //base
  equipment_id: string;
  equipment_description: string;
  // manufacturer_id: string;
  manufacturer: any;
  model_number: string;

  //sub-objects
  department_owner?: any;
  dimensional: Dimensional;
  // mechanical: any;
  // electrical: any;
  // building_automation: any;
  // operational: any;
  // data: any;
  asset: Asset;

  constructor(options: {
    equipment_id?: string;
    department_owner?: any;
    manufacturer?: any;
    equipment_description?: string;
    // manufacturer_id?: string;
    model_number?: string;

    asset?: Asset;
    dimensional?: Dimensional;
    } = {}) {
      this.equipment_id = options.equipment_id || '';
      this.equipment_description = options.equipment_description || '';
      // this.manufacturer_id = options.manufacturer_id || '';
      this.model_number = options.model_number || '';

      this.asset = options.asset || null;
      this.dimensional = options.dimensional || null;
      this.department_owner = options.department_owner || null;
      this.department_owner = options.manufacturer || null;
  }


}

