const { BasketDevice, Basket, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class basketController {
		async create(req, res) {
				let {id} = req.params;
				const userId = req.user.id
				const basket = await Basket.findOne({where: {userId}})
				const find = await BasketDevice.findOne({where: {deviceId: id, basketId: basket.id}})
				let basketDevice = {}
				if (find) {
						basketDevice = await find.update({...find, quantity: find.quantity += 1})
				} else {
						basketDevice = await BasketDevice.create({deviceId: id, basketId: basket.id, quantity: 1})
				}
				return res.json(basketDevice)
		}

		async getAll(req, res) {
				let devices = []
				const userId = req.user.id
				const basket = await Basket.findOne({where: {userId}})
				const basketDevices = await BasketDevice.findAll({where: {basketId: basket.id}})
				for (const item of basketDevices) {
						const device = (await Device.findOne({where: {id: item.deviceId}})).toJSON()
						device.quantity = item.quantity
						devices.push(device)
				}
				res.json(devices)
		}
		async remove(req, res) {
				const { id } = req.params;
				const userId = req.user.id
				const basket = await Basket.findOne({where: {userId}})
				const find = await BasketDevice.findOne({where: {deviceId: id, basketId: basket.id}})
				let basketDevice = {}
				if (find.quantity > 1) {
						basketDevice = await find.update({...find, quantity: find.quantity -= 1})
				} else {
						basketDevice = await BasketDevice.destroy({where: {deviceId: id, basketId: basket.id}})
				}
				return res.json(basketDevice)
		}
}

module.exports = new basketController()