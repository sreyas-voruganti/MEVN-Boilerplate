const User = require('../models/User')

module.exports = {
  register: async (req, res) => {
    try {
      const users = await User.countDocuments({ $or: [{ username: req.body.username }, { email: req.body.email }] })
      if (users) return res.status(400).json({ error: 'A user with the given username or email already exists.' })
      const user = new User({
        username: req.body.username,
        email: req.body.email
      })
      await user.setPassword(req.body.password)
      await user.save()
      res.status(201).json({ token: user.generateToken() })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) return res.status(404).json({ error: "A user with the given username doesn't exist." })
      if (!await user.verifyPassword(req.body.password)) return res.status(400).json({ error: 'Incorrect password.' })
      res.status(200).json({ token: await user.generateToken() })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
