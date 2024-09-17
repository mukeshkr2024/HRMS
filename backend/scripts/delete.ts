import { Address } from "../src/models/address.model";
import Announcement from "../src/models/announcements";
import { Asset } from "../src/models/assets.models";
import { Compensation } from "../src/models/compensation.model";
import { ContactInformation } from "../src/models/contact-information.model";
import { Department } from "../src/models/department.model";
import { Employee } from "../src/models/employee.model";
import { File } from "../src/models/file.model";
import { Folder } from "../src/models/folder.model";
import { Goal } from "../src/models/goal.model";
import { GoalUpdate } from "../src/models/goalUpdates.model";
import { GoalVisibility } from "../src/models/goalVisibility.model";
import { Hierarchy } from "../src/models/hierarchy.model";
import { Leave } from "../src/models/leaves.model";
import { Position } from "../src/models/position.model";
import { Task } from "../src/models/task.model";

export const deleteDatabaseDb = async () => {
    try {

        // await Address.deleteMany();
        // await Announcement.deleteMany();
        // await Asset.deleteMany(),
        //     await Compensation.deleteMany();
        // await ContactInformation.deleteMany();
        // await Department.deleteMany();
        // await Employee.deleteMany();
        // await File.deleteMany();
        // await Folder.deleteMany();
        // await Goal.deleteMany();
        // await GoalUpdate.deleteMany();
        // await GoalVisibility.deleteMany();
        // await Hierarchy.deleteMany();
        // await Leave.deleteMany();
        // await Leave.deleteMany();
        // await Position.deleteMany();
        // await Task.deleteMany();

    } catch (error) {
        console.log(error);
    }
}