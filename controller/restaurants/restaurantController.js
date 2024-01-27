const Restaurant = require('../../models/restaurantSchema');

const restaurantController = {
  // Create a new restaurant
  // Create a new restaurant
  create: async (req, res) => {
    try {
      const { name, address, phoneNumber, isOpen, restaurantId, items } = req.body;

      // Check if a restaurant with the same restaurantId already exists
      const existingRestaurant = await Restaurant.findOne({ restaurantId });
      if (existingRestaurant) {
        return res.status(400).json({ success: false, message: 'Restaurant with the same ID already exists' });
      }

      const newRestaurant = new Restaurant({ name, address, phoneNumber, isOpen, restaurantId, items });
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
};

module.exports = restaurantController;