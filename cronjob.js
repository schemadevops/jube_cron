const cron=require("node-cron");
const { UpdateStockShopee, UpdateStockTokped } = require('./helpers/cronjob')


class Cronjob {
    static StartingCron(){
        // run every 1 minute
        cron.schedule('*/30 * * * * *', () => {
            UpdateStockShopee()
        });
        
        cron.schedule('*/30 * * * * *', () => {
            UpdateStockTokped()
        });
    }

}

module.exports=Cronjob;