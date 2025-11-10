import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('\n❌ MongoDB connection string not found!');
      console.error('\n📝 Please create a .env file in the backend directory with:');
      console.error('   MONGODB_URI=your_mongodb_connection_string');
      console.error('\n💡 You can get a free MongoDB Atlas connection string at:');
      console.error('   https://www.mongodb.com/cloud/atlas');
      console.error('\n   Or use local MongoDB:');
      console.error('   MONGODB_URI=mongodb://localhost:27017/ecommerce');
      console.error('\n');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('\n❌ MongoDB Connection Error:');
    console.error(`   ${errorMessage}`);
    console.error('\n💡 Please check:');
    console.error('   1. Your MongoDB connection string is correct');
    console.error('   2. MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0)');
    console.error('   3. MongoDB credentials are correct');
    console.error('   4. If using local MongoDB, ensure it is running');
    console.error('\n');
    process.exit(1);
  }
};

export default connectDB;
