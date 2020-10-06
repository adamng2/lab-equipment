import { Asset } from "./asset";
import { Dimensional } from "./dimensional";

export interface Equipment {
    //primitives
    equipment_id: string;

    department_owner: string;
    equipment_description: string;
    manufacturer_id: string;
    model_number: string;

    //sub-objects
    dimensional: Dimensional;
    mechanical: any;
    electrical: any;
    building_automation: any;
    operational: any;
    data: any;
    asset: Asset;
}

