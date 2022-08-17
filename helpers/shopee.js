const {
    User, UserMarketplace, ConfigMarketplace
} = require("../models/index");
const crypto = require('crypto');
const axios = require('axios').default;

const API = process.env.API_SHOPEE
const APP_ID = Number(process.env.APP_ID_SHOPEE)
const API_KEY = process.env.API_KEY
const PATH_API = process.env.PATH_API

class shopee {
    static authentication(userMarketplace) {
        return new Promise( async (resolve, reject) => {
            try {
                const path = `${PATH_API}auth/access_token/get`
                const time = new Date().getTime() / 1000
                const base_string = `${APP_ID}${path}${time}`
                const sign = crypto.createHmac('sha256', API_KEY)
                    .update(base_string)
                    .digest('hex');
                
                const urlShopee = `${API}${path}?timestamp=${time}&partner_id=${APP_ID}&sign=${sign}`;
                const dataSend = {
                    shop_id: userMarketplace.shop_id,
                    refresh_token: userMarketplace.refresh_token,
                    partner_id: APP_ID
                }
                const authShopee = await axios({
                    method: 'post',
                    url: urlShopee,
                    data: dataSend
                })
                if(authShopee.status == 200 && authShopee.data) {
                    let expiredDate = new Date();
                    expiredDate.setSeconds( expiredDate.getSeconds() + Number(authShopee.data.expire_in) );
                    await UserMarketplace.update(
                        { access_token: authShopee.data.access_token, refresh_token: authShopee.data.refresh_token, expired: expiredDate },
                        { where: { user_id: userMarketplace.user_id, marketplace_id:userMarketplace.marketplace_id } }
                    )
                    resolve(authShopee.data);
                }else{
                    throw new Error('auth shopee error')
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static getAllProduct(userMarketplace, offset=0, page_size=10, item_status='NORMAL') {
        return new Promise( async (resolve, reject) => {
            try {
                const path = `${PATH_API}product/get_item_list`
                const time = new Date().getTime() / 1000
                const base_string = `${APP_ID}${path}${time}${userMarketplace.access_token}${userMarketplace.shop_id}`
                const sign = crypto.createHmac('sha256', API_KEY)
                    .update(base_string)
                    .digest('hex');
                const urlShopee = `${API}${path}?timestamp=${time}&partner_id=${APP_ID}&sign=${sign}&access_token=${userMarketplace.access_token}&shop_id=${userMarketplace.shop_id}&offset=${offset}&page_size=${page_size}&item_status=${item_status}`;
                
                const getProduct = await axios({
                    method: 'get',
                    url: urlShopee
                })
                let result = null
                if(getProduct&&getProduct.status==200&&getProduct.data) {
                    result = getProduct.data
                }
                resolve(result);
            }catch(err) {
                reject(err)
            }
        })
    }

    static get_item_base_info(userMarketplace, arrId) {
        return new Promise( async (resolve, reject) => {
            try {
                const path = `${PATH_API}product/get_item_base_info`
                const time = new Date().getTime() / 1000
                const base_string = `${APP_ID}${path}${time.toFixed()}${userMarketplace.access_token}${userMarketplace.shop_id}`
                const sign = crypto.createHmac('sha256', API_KEY)
                    .update(base_string)
                    .digest('hex');
                const arrJoin = arrId.join()
                const urlShopee = `${API}${path}?timestamp=${time.toFixed()}&partner_id=${APP_ID}&sign=${sign}&access_token=${userMarketplace.access_token}&shop_id=${userMarketplace.shop_id}&item_id_list=${arrJoin}`;

                const getProduct = await axios({
                    method: 'get',
                    url: urlShopee
                })
                if(getProduct&&getProduct.status==200&&getProduct.data) {
                    resolve(getProduct.data.response.item_list)
                }else{
                    resolve(null)
                }
            }catch(err) {
                reject(err)
            }
        })
    }

    static getDetailProduct(userMarketplace, productId) {
        return new Promise( async (resolve, reject) => {
            try {
                const path = `${PATH_API}product/get_item_base_info`
                const time = new Date().getTime() / 1000
                const base_string = `${APP_ID}${path}${time.toFixed()}${userMarketplace.access_token}${userMarketplace.shop_id}`
                const sign = crypto.createHmac('sha256', API_KEY)
                    .update(base_string)
                    .digest('hex');
                
                
                const urlShopee = `${API}${path}?timestamp=${time.toFixed()}&partner_id=${APP_ID}&sign=${sign}&access_token=${userMarketplace.access_token}&shop_id=${userMarketplace.shop_id}&item_id_list=${productId}`;

                const getProduct = await axios({
                    method: 'get',
                    url: urlShopee
                })
                if(getProduct&&getProduct.status==200&&getProduct.data) {
                    resolve(getProduct.data.response.item_list)
                }else{
                    resolve(null)
                }
            }catch(err) {
                reject(err)
            }
        })
    }

    static updateStock(userMarketplace, productId, stock_value) {
        return new Promise( async (resolve, reject) => {
            try {
                const path = `${PATH_API}product/update_stock`
                const time = new Date().getTime() / 1000
                const base_string = `${APP_ID}${path}${time.toFixed()}${userMarketplace.access_token}${userMarketplace.shop_id}`
                const sign = crypto.createHmac('sha256', API_KEY)
                    .update(base_string)
                    .digest('hex');
                
                
                const urlShopee = `${API}${path}?timestamp=${time.toFixed()}&partner_id=${APP_ID}&sign=${sign}&access_token=${userMarketplace.access_token}&shop_id=${userMarketplace.shop_id}`;
                const dataSend = {
                    item_id: productId,
                    stock_list: [
                        {
                            normal_stock: stock_value
                        }
                    ]
                }
                const updateStock = await axios({
                    method: 'post',
                    url: urlShopee,
                    data: dataSend
                })
                resolve(dataSend)
                if(updateStock&&updateStock.status==200) {
                    resolve('success')
                }else{
                    reject("error update stok shopee")
                }
            }catch(err) {
                reject(err)
            }
        })
    }


    
}
module.exports = shopee;