// seedRestaurants.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Restaurant = require("./models/restaurantModel");
const FoodItem = require("./models/foodItemModel");

const MONGO_URI = "mongodb+srv://aswany10621:eiHqBXAymLRlYfUs@cluster0.azaniza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Optional: clear existing data
    await Restaurant.deleteMany();
    await FoodItem.deleteMany();

    // Restaurant 1
    const restaurant1 = new Restaurant({
      name: "Spice Garden",
      description: "Authentic South Indian cuisine with a modern twist.",
      address: "MG Road, Statue, Trivandrum",
      location: "Trivandrum",
      cuisine: "South Indian",
      image: "http://localhost:3001/images/spicegarden.jpg"
    });
    const savedRestaurant1 = await restaurant1.save();

    const foodItems1 = [
      {
        name: "Dosa",
        description: "Crispy dosa with sambar and chutney",
        price: 70,
        category: "Main Dish",
        image: "http://localhost:3001/images/dosa.jpg",
        restaurant: savedRestaurant1._id
      },
      {
        name: "Idli",
        description: "Soft steamed idlis served with sambar",
        price: 50,
        category: "Main Dish",
        image: "http://localhost:3001/images/idli.jpg",
        restaurant: savedRestaurant1._id
      },
      {
        name: "Filter Coffee",
        description: "Traditional South Indian filter coffee",
        price: 30,
        category: "Drinks & Juices",
        image: "http://localhost:3001/images/filtercoffee.jpg",
        restaurant: savedRestaurant1._id
      }
    ];

    // Restaurant 2
    const restaurant2 = new Restaurant({
      name: "Burger Hub",
      description: "Juicy and delicious American-style burgers.",
      address:  "Kowdiar Junction, Trivandrum",
      location: "Trivandrum",
      cuisine: "American",
      image: "http://localhost:3001/images/burgerhub.jpg"
    });
    const savedRestaurant2 = await restaurant2.save();

    const foodItems2 = [
      {
        name: "Cheese Burger",
        description: "Grilled beef patty with melted cheese",
        price: 120,
        category: "Main Dish",
        image: "http://localhost:3001/images/cheeseburger.jpg",
        restaurant: savedRestaurant2._id
      },
      {
        name: "French Fries",
        description: "Crispy golden fries",
        price: 60,
        category: "Starters",
        image: "http://localhost:3001/images/frenchfries.jpg",
        restaurant: savedRestaurant2._id
      },
      {
        name: "Coke",
        description: "Chilled Coca-Cola",
        price: 40,
        category: "Drinks & Juices",
        image: "http://localhost:3001/images/coke.jpg",
        restaurant: savedRestaurant2._id
      }
    ];

    // Restaurant 3
    const restaurant3 = new Restaurant({
      name: "Pizza World",
      description: "Wood-fired Italian pizzas and more.",
      address: "12 Park Street,Asramam Road, Kollam",
      location: "Kollam",
      cuisine: "Italian",
      image: "http://localhost:3001/images/pizzaworld.jpg"
    });
    const savedRestaurant3 = await restaurant3.save();

    const foodItems3 = [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with mozzarella and basil",
        price: 150,
        category: "Main Dish",
        image: "http://localhost:3001/images/margherita.jpg",
        restaurant: savedRestaurant3._id
      },
      {
        name: "Garlic Bread",
        description: "Toasted garlic bread with herbs",
        price: 80,
        category: "Starters",
        image: "http://localhost:3001/images/garlic-bread.jpg",
        restaurant: savedRestaurant3._id
      },
      {
        name: "Tiramisu",
        description: "Coffee-flavored Italian dessert",
        price: 90,
        category: "Desserts",
        image: "http://localhost:3001/images/tiramasu.jpg",
        restaurant: savedRestaurant3._id
      }
    ];

    // Restaurant 4
    const restaurant4 = new Restaurant({
      name: "Sushi Samba",
      description: "Fresh sushi and Japanese delights.",
      address: "88 Chinnakada Roundabout, Kollam",
      location: "Kollam",
      cuisine: "Japanese",
      image: "http://localhost:3001/images/sushisamba.jpg"
    });
    const savedRestaurant4 = await restaurant4.save();

    const foodItems4 = [
      {
        name: "Salmon Sushi",
        description: "Fresh salmon over vinegared rice",
        price: 200,
        category: "Main Dish",
        image: "http://localhost:3001/images/salmonsushi.jpg",
        restaurant: savedRestaurant4._id
      },
      {
        name: "Edamame",
        description: "Boiled and salted soybeans",
        price: 90,
        category: "Starters",
        image: "http://localhost:3001/images/edamame.jpg",
        restaurant: savedRestaurant4._id
      },
      {
        name: "Mochi Ice Cream",
        description: "Sweet rice cake with ice cream filling",
        price: 70,
        category: "Desserts",
        image: "http://localhost:3001/images/mochi.jpg",
        restaurant: savedRestaurant4._id
      }
    ];

    // Restaurant 5
    const restaurant5 = new Restaurant({
      name: "Tandoori Treats",
      description: "North Indian tandoori specialties.",
      address: "Technopark Campus, Kazhakkoottam",
      location: "Trivandrum",
      cuisine: "North Indian",
      image: "http://localhost:3001/images/tandooritreats.jpg"
    });
    const savedRestaurant5 = await restaurant5.save();

    const foodItems5 = [
      {
        name: "Tandoori Chicken",
        description: "Spicy grilled chicken marinated in yogurt",
        price: 180,
        category: "Main Dish",
        image: "http://localhost:3001/images/tandoori_chicken.jpg",
        restaurant: savedRestaurant5._id
      },
      {
        name: "Paneer Tikka",
        description: "Grilled paneer cubes with spices",
        price: 160,
        category: "Starters",
        image: "http://localhost:3001/images/paneer_tikka.jpg",
        restaurant: savedRestaurant5._id
      },
      {
        name: "Lassi",
        description: "Traditional sweet yogurt drink",
        price: 50,
        category: "Drinks & Juices",
        image: "http://localhost:3001/images/lassi.jpg",
        restaurant: savedRestaurant5._id
      }
    ];
     // Restaurant 6
const restaurant6 = new Restaurant({
  name: "Arabian Delights",
  description: "Delicious Middle Eastern and Arabian dishes.",
  address: "Pattom, Trivandrum",
  location: "Trivandrum",
  cuisine: "Arabian",
  image: "http://localhost:3001/images/arabiandelights.jpg"
});
const savedRestaurant6 = await restaurant6.save();

const foodItems6 = [
  {
    name: "Chicken Biriyani",
    description: "Fragrant basmati rice with spicy chicken masala",
    price: 160,
    category: "Main Dish",
    image: "http://localhost:3001/images/chickenbiriyani.jpg",
    restaurant: savedRestaurant6._id
  },
  {
    name: "Mutton Mandi",
    description: "Arabic-style rice with tender mutton pieces",
    price: 200,
    category: "Main Dish",
    image: "http://localhost:3001/images/muttonmandi.jpg",
    restaurant: savedRestaurant6._id
  },
  {
    name: "Falooda",
    description: "Chilled dessert drink with ice cream, basil seeds, and vermicelli",
    price: 90,
    category: "Desserts",
    image: "http://localhost:3001/images/falooda.jpg",
    restaurant: savedRestaurant6._id
  }
];

   // Restaurant 7
const restaurant7 = new Restaurant({
  name: "Ocean Bites",
  description: "Fresh seafood dishes by the backwaters.",
  address: "Asramam Road, Kollam",
  location: "Kollam",
  cuisine: "Seafood",
  image: "http://localhost:3001/images/oceanbites.jpg"
});
const savedRestaurant7 = await restaurant7.save();

const foodItems7 = [
  {
    name: "Grilled Prawns",
    description: "Freshwater prawns grilled with herbs",
    price: 180,
    category: "Main Dish",
    image: "http://localhost:3001/images/grilledprawns.jpg",
    restaurant: savedRestaurant7._id
  },
  {
    name: "Fish Fingers",
    description: "Crispy fried fish fillets",
    price: 90,
    category: "Starters",
    image: "http://localhost:3001/images/fishfingers.jpg",
    restaurant: savedRestaurant7._id
  },
  {
    name: "Pineapple Lemon Soda",
    description: "Fresh pineapple lemon water served chilled",
    price: 50,
    category: "Drinks & Juices",
    image: "http://localhost:3001/images/lemon.jpg",
    restaurant: savedRestaurant7._id
  }
    ];

    // Insert all food items
    await FoodItem.insertMany([
      ...foodItems1,
      ...foodItems2,
      ...foodItems3,
      ...foodItems4,
      ...foodItems5,
      ...foodItems6,
      ...foodItems7,
    ]);

    console.log("All restaurants and food items seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedData();
