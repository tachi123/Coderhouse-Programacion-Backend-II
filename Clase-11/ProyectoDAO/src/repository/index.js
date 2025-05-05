import ContactDAO from '../dao/factory.js';

import ContactRepository from './contact.repository.js';
import ProductRepository from './product.repository.js';

export const contactService = new ContactRepository(ContactDAO);
export const productService = new ProductRepository();