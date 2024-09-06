import { Employee } from "../src/models/employee.model";

export const main = async () => {
    try {

        const updatedEmployee = await Employee.findByIdAndUpdate("66daf5fb09dc3927b039fae8", {
            reportsTo: "66d9a4bc6ce1d7bbfb55b10a",
            name: "Mohit kumar"
        })

        console.log(updatedEmployee);

    } catch (error) {
        console.log(error);

    }
}