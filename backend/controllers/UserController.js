const UserService = require("../services/UserService")

class UserController {
    static async signup(req, res) {
        try {
            const user = await UserService.signup(req.body)
            res.status(201).send({ 'message': 'User created succesfully', user })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async login(req, res) {
        try {
            const user = await UserService.login(req.body)
            res.status(200).send({
                'message': 'User LoggedIn succesfully!', user: user.user,
                token: user.token
            })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
    static async logout(req, res) {
        try {
            const token = req?.headers['authorization'].split(" ")[1]
            if(!token){
                return res.status(400).send('No token provided')
            }
            const resp = await UserService.logout(token)
            res.status(200).send(resp)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

module.exports = UserController;