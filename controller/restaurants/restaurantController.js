const Restaurant = require('../../models/restaurantSchema');
const jwt = require('jsonwebtoken');
const restaurantController = {
  // Create a new restaurant
  create: async (req, res) => {
    try {
      const { name, address, phoneNumber, isOpen, items, ownerEmail, ownerPassword } = req.body;

      // Generate a unique restaurantId
      const count = await Restaurant.countDocuments({});
      const restaurantId = `RS-${count + 1}`;

      const newRestaurant = new Restaurant({ name, address, phoneNumber, isOpen, restaurantId, items, ownerEmail, ownerPassword });
      const savedRestaurant = await newRestaurant.save();
      res.status(200).json({ success: true, restaurant: savedRestaurant });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating restaurant', error: error.message });
    }
  },

  // Get a list of all restaurants
  list: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting restaurants', error: error.message });
    }
  },

 // Find a restaurant by ID
// Find a restaurant by ID
findById: async (req, res) => {
  try {
    const { restaurantId } = req.params;
    console.log(restaurantId);
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error finding restaurant', error: error.message });
  }
}, 
  // Update a restaurant
  update: async (req, res) => {
    try {
      const { restaurantId, ...updateData } = req.body;
      const updatedRestaurant = await Restaurant.findOneAndUpdate({ restaurantId }, updateData, { new: true });
      res.status(200).json({ success: true, restaurant: updatedRestaurant });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating restaurant', error: error.message });
    }
  },

  // Delete a restaurant
  delete: async (req, res) => {
    try {
      const { restaurantId } = req.body;
      await Restaurant.findOneAndDelete({ restaurantId });
      res.status(200).json({ success: true, message: 'Restaurant deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting restaurant', error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { ownerEmail, ownerPassword } = req.body;
      const restaurant = await Restaurant.findOne({ ownerEmail, ownerPassword });

      if (!restaurant) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      // Create and assign a token
      const token = jwt.sign({ _id: restaurant._id }, 'zedApp');
      res.header('auth-token', token).status(200).json({ success: true, restaurant, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
  },
  addItem: async (req, res) => {
    try {
      const { restaurantId, item } = req.body;
      const restaurant = await Restaurant.findOne({ restaurantId });

      if (!restaurant) {
        return res.status(400).json({ success: false, message: 'Restaurant not found' });
      }

      restaurant.items.push(item);
      const updatedRestaurant = await restaurant.save();
      res.status(200).json({ success: true, restaurant: updatedRestaurant });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding item', error: error.message });
    }
  },
};

module.exports = restaurantController;