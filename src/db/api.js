const Student = require("../model/student")

const getAllStudent = async () =>{
    const data = await Student.find()
    return data
}

export {getAllStudent}