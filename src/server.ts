import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server:Server 

async function bootstrap() {
	try {
        await mongoose.connect(config.databaseURL as string)
		server = app.listen(config.port, () => {
			console.log(`PH University app is running on port ${config.port}`);
		});
	} catch (error) {
		console.log(error);
	}
}



bootstrap()

process.on('unhandledRejection',()=>{
	console.log(`🤬 🤬 🤬 Unhandled Rejection has been detected, Shutting down ...`)
	if(server){
		server.close(()=>{
			process.exit(1)
		})
	}
	process.exit(1)
})

process.on('uncaughtException',()=>{
	console.log(`☹️  Uncaught Exception has been detected. Shutting down ...`)
	process.exit(1)
})

