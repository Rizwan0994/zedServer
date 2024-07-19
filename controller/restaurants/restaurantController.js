const Restaurant = require('../../models/restaurantSchema');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const restaurantController = {
// Create a new restaurant
create: async (req, res) => {
  try {
    const { name, address, phoneNumber, isOpen, items, email, password } = req.body;

    // Check if a restaurant with the provided email already exists
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ success: false, message: 'A restaurant with this email already exists' });
    }

    // Assign an _id to each item
    const itemsWithId = items.map(item => ({ _id: new mongoose.Types.ObjectId(), ...item }));

    const newRestaurant = new Restaurant({ name, address, phoneNumber, isOpen, items: itemsWithId, email, password });
    const savedRestaurant = await newRestaurant.save();

    // Use the _id field as restaurantId
    const restaurantId = savedRestaurant._id;
    savedRestaurant.restaurantId = restaurantId;
    await savedRestaurant.save();

    res.status(200).json({ success: true, restaurant: savedRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating restaurant', error: error.message });
  }
},


  // Get a list of all restaurants
  list: async (req, res) => {
    try {
      let fields = '-__v'; // exclude the __v field by default
      const token = req.header('auth-token');
      if (token) {
        let decoded;
        try {
          decoded = jwt.verify(token, 'zedAppAdmin'); // try verifying with the admin secret key
          console.log(decoded);
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Token expired' });
          } else if (error instanceof jwt.JsonWebTokenError) {
            try {
              decoded = jwt.verify(token, 'zedAppResturant'); // if failed, try verifying the restaurant owner secret key
              
            } catch (error) {
              if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ success: false, message: 'Token expired' });
              } else if (error instanceof jwt.JsonWebTokenError) {
                decoded = jwt.verify(token, 'zedApp'); // if failed, try verifying with 'zedApp'
              } else {
                throw error;
              }
            }
          } else {
            throw error;
          }
        }
        if (decoded.userType !== 'SuperAdmin') {
          fields += ' -email -password'; // if not admin, exclude email and password
        }
      }
      const restaurants = await Restaurant.find().select(fields);
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting restaurants', error: error.message });
    }
  },

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
      const restaurant = await Restaurant.findOne({ restaurantId} );

      if (!restaurant) {
        return res.status(400).json({ success: false, message: 'Restaurant not found!' });
      }
  
      const updatedRestaurant = await Restaurant.findOneAndUpdate({ restaurantId }, updateData, { new: true });
      res.status(200).json({ success: true, restaurant: updatedRestaurant });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating restaurant', error: error.message });
    }
  },


// Delete a restaurant
delete: async (req, res) => {
  try {
    const {restaurantId}  = req.body;
    console.log(restaurantId);
    const restaurant = await Restaurant.findOne({ restaurantId} );

    if (!restaurant) {
      return res.status(400).json({ success: false, message: 'Restaurant not found or already deleted' });
    }

    await Restaurant.findOneAndDelete({ restaurantId });
    res.status(200).json({ success: true, message: 'Restaurant deleted successfully', deletedRestaurantId: restaurantId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting restaurant', error: error.message });
  }
},
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const restaurant = await Restaurant.findOne({ email, password });

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
  
      // Check if item has a name property
      if (!item.name) {
        return res.status(400).json({ success: false, message: 'Item must have a name' });
      }
  
      // Check if item has a price property
      if (!item.price) {
        return res.status(400).json({ success: false, message: 'Item must have a price' });
      }
  
      // Assign a new ObjectId to the item
      item._id = new mongoose.Types.ObjectId();
  
      restaurant.items.push(item);
      const updatedRestaurant = await restaurant.save();
      res.status(200).json({ success: true, restaurant: updatedRestaurant });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding item', error: error.message });
    }
  },
};

module.exports = restaurantController;