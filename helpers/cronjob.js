const {
    Sequelize, sequelize, User, UserMarketplace, Product, ProductMarketplace
} = require("../models/index");
const tokped = require('./tokped');
const shopee = require('./shopee');
const Op = Sequelize.Op;
const USER_ID = Number(process.env.USER_ID)

class Cronjob {
    static async UpdateStockShopee(
        // req, res
    ) {
        try {
            let dataShopee = null
            let dateNow = new Date()
            const userMarketFindShopee = await UserMarketplace.findOne({
                where: {
                    user_id: USER_ID,
                    marketplace_id: 2
                }, raw: true
            })

            if(userMarketFindShopee) {
                if(userMarketFindShopee.expired>dateNow&&userMarketFindShopee.access_token) {
                    dataShopee = {
                        access_token: userMarketFindShopee.access_token,
                        shop_id: userMarketFindShopee.shop_id,
                        shop_name: userMarketFindShopee.shop_name,
                        shop_url: userMarketFindShopee.shop_url,
                        expired: userMarketFindShopee.expired
                    }
                }else{
                    const dataAuth = await shopee.authentication(userMarketFindShopee)
                    if(dataAuth.access_token) {
                        dataShopee= {
                            access_token: dataAuth.access_token,
                            shop_id: userMarketFindShopee.shop_id,
                            shop_name: userMarketFindShopee.shop_name,
                            shop_url: userMarketFindShopee.shop_url,
                            expired: userMarketFindShopee.expired
                        }
                    }
                }
            }
            
            const productExt = await ProductMarketplace.findAll({
                where : {
                    marketplace_id : 2
                }, raw: true
            })
            if(productExt.length) {
                if(dataShopee) {
                    for await (const el of productExt) {
                        if(el.product_guid) {
                            await shopee.updateStock(dataShopee, Number(el.product_guid), Number(el.stock))
                        }
                    }
                }
            }
        } catch(err) {
            console.log(err)
        }
    }

    static async UpdateStockTokped(
        // req, res
    ) {
        try {
            let dataTokped = null
            let dateNow = new Date()
            const userMarketFindTokped = await UserMarketplace.findOne({
                where: {
                    user_id: USER_ID,
                    marketplace_id: 1
                }, raw: true
            })
            if(userMarketFindTokped) {
                if(userMarketFindTokped.expired>dateNow&&userMarketFindTokped.access_token) {
                    dataTokped = {
                        access_token: userMarketFindTokped.access_token,
                        shop_id: userMarketFindTokped.shop_id,
                        shop_name: userMarketFindTokped.shop_name,
                        shop_url: userMarketFindTokped.shop_url,
                        expired: userMarketFindTokped.expired
                    }
                }else{
                    const dataAuth = await tokped.authentication(userMarketFindTokped)
                    if(dataAuth.access_token) {
                        dataTokped= {
                            access_token: dataAuth.access_token,
                            shop_id: userMarketFindTokped.shop_id,
                            shop_name: userMarketFindTokped.shop_name,
                            shop_url: userMarketFindTokped.shop_url,
                            expired: userMarketFindTokped.expired
                        }
                    }
                }
            }
            
            const productExt = await ProductMarketplace.findAll({
                where : {
                    marketplace_id : 1
                }, raw: true
            })
            if(productExt.length) {
                if(dataTokped) {
                    for await (const el of productExt) {
                        if(el.product_guid) {
                            await tokped.updateStock(dataTokped, Number(el.product_guid), Number(el.stock))
                        }
                    }
                }
            }
        }catch(err) {
            console.log("err")
        }        
    }
}
module.exports = Cronjob;