import { Asset } from "./asset";
import { Dimensional } from "./dimensional";

export class Equipment {

  id: number;

  //base
  equipment_id: string;
  name: string;
  producer: any;
  model_number: string;
  serial_number: string;
  equipment_description: string;
  link_to_manual: string;
  notes: string;
 
  // manufacturer_id: string;
  //sub-objects
  // department_owner?: any;
  dimensional: Dimensional;
  // mechanical: any;
  // electrical: any;
  // building_automation: any;
  // operational: any;
  // data: any;
  asset: Asset;

  constructor(options: {
    name?: string;
    link_to_manual?: string;
    notes?: string;
    equipment_id?: string;
    // department_owner?: any;
    producer?: any;
    equipment_description?: string;
    // manufacturer_id?: string;
    model_number?: string;
    serial_number?: string;

    asset?: Asset;
    dimensional?: Dimensional;
    } = {}) {
      this.equipment_id = options.equipment_id || '';
      this.equipment_description = options.equipment_description || '';
      // this.manufacturer_id = options.manufacturer_id || '';
      this.model_number = options.model_number || '';
      this.serial_number = options.serial_number || '';
      this.notes = options.notes || '';
      this.link_to_manual = options.link_to_manual || '';
      this.name = options.name || '';

      this.asset = options.asset || null;
      this.dimensional = options.dimensional || null;
      // this.department_owner = options.department_owner || null;
      this.producer = options.producer || null;
  }


}

