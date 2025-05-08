import Order from '../dao/order.dao.js';
import Business from '../dao/business.dao.js';
import UserRepository from '../repositories/user.repository.js';

const orderService = new Order();
const businessService = new Business();
const userService = new UserRepository();

export const getOrders = async (req, res) => {
    let result = await orderService.getOrders();
    res.send({status: "success", result})
}

export const getOrderById = async (req, res) => {
    const { oid } = req.params;
    let order = await orderService.getOrderById(oid);
    res.send({status: "success", result: order})
}

export const createOrder = async (req, res) => {
    const { userId, businessId, products } = req.body;
    const user = await userService.getUserById(userId);
    //Tengo que buscar el negocio para validar que los productos de la orden esten en el negocio
    const business = await businessService.getBusinessById(businessId);
    let productosFiltrados = business.products.filter(product => products.includes(product.id));
    //Calcular el precio
    let sum = productosFiltrados.reduce( (acum, prev) => acum + prev.price, 0);
    //Invento un número de orden
    let orderNumber = Date.now() + Math.floor(Math.random()*10000+1);
    let order = {
        number: orderNumber,
        business: businessId,
        user: userId,
        products: productosFiltrados.map(product => product.id),
        totalPrice: sum,
        status: "PENDIENTE"
    }
    let resultOrder = await orderService.saveOrder(order);
    user.orders.push(resultOrder._id);
    await userService.updateUser(userId, user);
    res.send({status: "success", result: resultOrder})
}

export const resolveOrder = async (req, res) => {
    const resolve = req.query.resolve;
    let order = await orderService.getOrderById(req.params.oid);
    order.status = resolve;
    let result = await orderService.resolveOrder(order._id, order);
    res.send({status: "success", result})
}