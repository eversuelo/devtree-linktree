import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL!);
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log('Error al conectar a MongoDB');
    console.log(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};