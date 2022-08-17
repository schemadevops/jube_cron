const {
    User, UserMarketplace, ConfigMarketplace
} = require("../models/index");
const crypto = require('crypto');
const axios = require('axios').default;

const API = process.env.API_TOKPED
const AUTH_API = process.env.AUTH_API_TOKPED
const APP_ID = Number(process.env.APP_ID_TOKPED)
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

class tokped {
    static authentication(userMarketplace) {
        return new Promise( async (resolve, reject) => {
            try {
                const urlTokped = `${AUTH_API}/token?grant_type=client_credentials`
                const baseToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
                
                const authTokped = await axios({
                    method: 'post',
                    headers: {
                        'Authorization': `Basic ${baseToken}`
                    },
                    url: urlTokped,
                    data: ''
                })
                if(authTokped.status == 200 && authTokped.data) {
                    let expiredDate = new Date();
                    expiredDate.setSeconds( expiredDate.getSeconds() + Number(authTokped.data.expires_in) );
                    await UserMarketplace.update(
                        { access_token: authTokped.data.access_token, expired: expiredDate },
                        { where: { user_id: userMarketplace.user_id, marketplace_id:userMarketplace.marketplace_id } }
                    )
                    resolve(authTokped.data);
                }else{
                    throw new Error('auth tokped error')
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static getAllProduct(dataTokped, row=10, start=0) {
        return new Promise( async (resolve, reject) => {
            try {
                const param = `/inventory/v1/fs/${APP_ID}/product/list`
                const keyword = `?shop_id=${dataTokped.shop_id}&rows=${row}&start=${start}`
                const url = `${API}${param}${keyword}`

                const findProduct = await axios({
                    method: 'get',
                    headers: {
                        'Authorization': `Bearer ${dataTokped.access_token}`
                    },
                    url: url
                })

                resolve(findProduct)
            }catch(err) {
                reject(err)
            }
        })
    }
    static getDetailProduct(dataTokped, product_id) {
        return new Promise( async (resolve, reject) => {
            try {
                const param = `/inventory/v1/fs/${APP_ID}/product/info`
                const keyword = `?product_id=${product_id}`
                const url = `${API}${param}${keyword}`
                
                const findProduct = await axios({
                    method: 'get',
                    headers: {
                        'Authorization': `Bearer ${dataTokped.access_token}`
                    },
                    url: url
                })

                if(findProduct&&findProduct.data){
                    resolve(findProduct.data)
                }else{
                    reject('product not found')
                }

            }catch(err) {
                reject(err)
            }
        })
    }

    static updateStock(dataTokped, product_id, stock_value) {
        return new Promise( async (resolve, reject) => {
            try {
                const param = `/inventory/v1/fs/${APP_ID}/stock/update`
                const keyword = `?shop_id=${dataTokped.shop_id}`
                const url = `${API}${param}${keyword}`
                const data = [
                    {
                        product_id:product_id,
                        new_stock:stock_value
                    }
                ]
                
                const updateStock = await axios({
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${dataTokped.access_token}`
                    },
                    url: url,
                    data: data
                })

                if(updateStock.status == 200) {
                    resolve("success")
                }else{
                    reject("error update stok tokped")
                }
            }catch(err) {
                reject(err)
            }
        })
    }
}
module.exports = tokped;