const router = require("express").Router()

router.get(
    '/',
    async (req, res, next) => {
        try {
            // const data = await User.findAll()
            res.status(200).json({message: "server running"})
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router