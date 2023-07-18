const NotifyModel = require('../models/notifyModel')



const createNotify = async (req, res) => {
    try {
        const { id, recipients, url, text, content, image } = req.body

        if (recipients.includes(req.user._id.toString())) return;

        const notify = new NotifyModel({
            id, recipients, url, text, content, image, user: req.user._id
        })

        await notify.save()
        return res.json({ notify })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const removeNotify = async (req, res) => {
    try {
        const notify = await NotifyModel.findOneAndDelete({
            id: req.params.id, url: req.query.url
        })

        return res.json({ notify })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const getNotifies = async (req, res) => {
    try {
        const NotifyModel = await NotifyModel.find({ recipients: req.user._id })
            .sort('-createdAt').populate('user', 'avatar username')

        return res.json({ NotifyModel })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const isReadNotify = async (req, res) => {
    try {
        const NotifyModel = await NotifyModel.findOneAndUpdate({ _id: req.params.id }, {
            isRead: true
        })

        return res.json({ NotifyModel })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const deleteAllNotifies = async (req, res) => {
    try {
        const NotifyModel = await NotifyModel.deleteMany({ recipients: req.user._id })

        return res.json({ NotifyModel })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}



module.exports = {
    createNotify,
    removeNotify,
    isReadNotify,
    deleteAllNotifies,
    getNotifies
}