import db from "../models/index";
const { Op } = require("sequelize");
let handleCreateNewAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.type || !data.value || !data.code) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let res = await db.AllCode.findOne({
                    where: { code: data.code }
                })

                if (res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Mã code đã tồn tại !'
                    })
                } else {
                    await db.AllCode.create({
                        type: data.type,
                        value: data.value,
                        code: data.code
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let AllCode = await db.AllCode.findAll({
                    where: { type: typeInput }
                })
                resolve({
                    errCode: 0,
                    data: AllCode
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleUpdateAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.value || !data.code || !data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = await db.AllCode.findOne({
                    where: {
                        id: data.id
                    },
                    raw: false
                })
                if (res) {
                    res.value = data.value
                    res.code = data.code
                    await res.save();
                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailAllCodeById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let data = await db.AllCode.findOne({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let handleDeleteAllCode = (AllCodeId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!AllCodeId) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing required parameters !`
                })
            } else {
                let foundAllCode = await db.AllCode.findOne({
                    where: { id: AllCodeId }
                })
                if (!foundAllCode) {
                    resolve({
                        errCode: 2,
                        errMessage: `The AllCode isn't exist`
                    })
                }
                await db.AllCode.destroy({
                    where: { id: AllCodeId }
                })
                resolve({
                    errCode: 0,
                    message: `The AllCode is deleted`
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getListAllCodeService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectFilter = {
                where: { type: data.type },
             
            }
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }
            if(data.keyword !=='') objectFilter.where = {...objectFilter.where, value: {[Op.substring]: data.keyword  } }
                let AllCode = await db.AllCode.findAndCountAll(objectFilter)
                resolve({
                    errCode: 0,
                    data: AllCode.rows,
                    count: AllCode.count
                })
         
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCategoryBlog = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {

                let AllCode = await db.AllCode.findAll({
                    where: { type: typeInput }
                })
                for(let i = 0 ; i< AllCode.length ; i++){
                    let blog = await db.Blog.findAll({where:{subjectId:AllCode[i].code}})
                    if(blog) 
                    AllCode[i].countPost = blog.length
                }
                  
               
                resolve({
                    errCode: 0,
                    data: AllCode
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleCreateNewAllCode: handleCreateNewAllCode,
    getAllCodeService: getAllCodeService,
    handleUpdateAllCode: handleUpdateAllCode,
    getDetailAllCodeById: getDetailAllCodeById,
    handleDeleteAllCode: handleDeleteAllCode,
    getListAllCodeService: getListAllCodeService,
    getAllCategoryBlog:getAllCategoryBlog
}