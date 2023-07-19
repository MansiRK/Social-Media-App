const NotifyModel = require('../models/notifyModel')



const createNotify = async (req, res) => {
    try {
        const { id, recipients, url, text, content, image } = req.body

        if (recipients.includes(req.user._id.toString())) return;

        const notify = new NotifyModel({
            id, recipients, url, text, content, image, user: req.user._id
        })

        await notify.save()
        return res.status(200).json(
            { message: "You have new notification!" ,
            notify 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to get new notification. ${err.message }`
        })
    }
}

const removeNotify = async (req, res) => {
    try {
        const notify = await NotifyModel.findOneAndDelete({
            id: req.params.id, url: req.query.url
        })

        return res.status(200).json(
            { message: "You successfully removed notification!",
            notify 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to remove notification. ${err.message }`
        })
    }
}

const getNotifies = async (req, res) => {
    try {
        const notifies = await NotifyModel.find({ recipients: req.user._id })
            .sort('-createdAt').populate('user', 'avatar username')

        return res.status(200).json
        ({ message: "Fetched all notifications successfully!",
         notifies
         })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to fetch all notifications. ${err.message }`
    })
    }
}

const isReadNotify = async (req, res) => {
    try {
        const notifies = await NotifyModel.findOneAndUpdate({ _id: req.params.id }, {
            isRead: true
        })

        return res.status(200).json({ 
            message: "You read this notification!",
            notifies 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to read notification. ${err.message }`
        })
    }
}

const deleteAllNotifies = async (req, res) => {
    try {
        const notifies = await NotifyModel.deleteMany({ recipients: req.user._id })

        return res.status(200).json(
            { message: "Deleted all notifications successfully!",
            notifies 
        })
    } catch (err) {
        return res.status(500).json(
            { message: `Failed to delete all notifications. ${err.message }`
        })
    }
}



module.exports = {
    createNotify,
    removeNotify,
    isReadNotify,
    deleteAllNotifies,
    getNotifies
}