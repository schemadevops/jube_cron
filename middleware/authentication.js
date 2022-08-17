
let { verifyToken } = require("../helpers/jwt");
const shopee = require("../helpers/shopee");
const tokped = require("../helpers/tokped");
const { User, UserMarketplace, Sequelize } = require("../models/index");
const Op = Sequelize.Op;

const USER_ID = Number(process.env.USER_ID)

const Auth = (req, res, next) => {
    let token = req.headers.token ? req.headers.token : null
    verifyToken(token, async (err, decoded) => {
        try {
            if (err) {
                next(err)
            } else if (decoded) {
                let user = await User.findOne({ where: { user_id: decoded.user_id } })                    
                if (!user) {
                    res.status(401).json({ message: "Not Authorized" });
                } else if(!user.username) {
                    res.status(401).json({ message: "Not Authorized" });
                } else if(user.username !== decoded.username) {
                    res.status(401).json({ message: "Not Authorized" });
                } else{
                    // ini auth shopee dan tokped
                    let dataShopee = null
                    let dataTokped = null
                    let dateNow = new Date()
                    const userMarketFind = await UserMarketplace.findAll({
                        where: {
                            user_id: USER_ID,
                        }, raw: true
                    });                    
                    const userMarketFindShopee = userMarketFind.find(el => el.marketplace_id == 2)
                    if(userMarketFindShopee) {
                        if(userMarketFindShopee.expired>dateNow) {
                            if(userMarketFindShopee.access_token) {
                                dataShopee = {
                                    access_token: userMarketFindShopee.access_token,
                                    shop_id: userMarketFindShopee.shop_id,
                                    shop_name: userMarketFindShopee.shop_name,
                                    shop_url: userMarketFindShopee.shop_url,
                                    expired: userMarketFindShopee.expired
                                }
                            }else{
                                next({ status: 401, message: `authentication shopee failed because access_token not found in db` });
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
                            }else{
                                next({ status: 401, message: `authentication shopee failed` });
                            }
                        }
                    }else{
                        next({ status: 401, message: `authentication shopee failed because data not found in db` });
                    }
                    const userMarketFindTokped = userMarketFind.find(el => el.marketplace_id == 1)
                    if(userMarketFindTokped) {
                        if(userMarketFindTokped.expired>dateNow) {
                            if(userMarketFindTokped.access_token) {
                                dataTokped = {
                                    access_token: userMarketFindTokped.access_token,
                                    shop_id: userMarketFindTokped.shop_id,
                                    shop_name: userMarketFindTokped.shop_name,
                                    shop_url: userMarketFindTokped.shop_url,
                                    expired: userMarketFindTokped.expired
                                }
                            }else{
                                next({ status: 401, message: `authentication tokped failed because access_token not found in db` });
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
                            }else{
                                next({ status: 401, message: `authentication tokped failed` });
                            }
                        }
                    }else{
                        next({ status: 401, message: `authentication tokped failed because data not found in db` });
                    }

                    req.decoded = {
                        ...decoded,
                        dataTokped,
                        dataShopee
                    };
                    next();
                }
            }else{
                next({ status: 401, message: `You must login first as public` });
            }
        }catch(err) {
            next(err)
        }
    })
}

module.exports = {
    Auth
}