require("dotenv").config();
const express = require("express");
const { mongooseDb_connect } = require("./database/mongooseDb");
const app = express();
const cors = require("cors");
const port = process.env.port || 9999;
const authRoute = require("./routes/authRoutes");
const orderRoute = require("./routes/clientOrderRoutes");
const customerRoute = require("./routes/CustomerRoutes");
const clientHomeRoute = require("./routes/clientHomeRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoutes");
const adminRoute = require("./routes/AdminRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const chatRoute = require("./routes/ChatRoutes");
const MessageRoute = require("./routes/MessageRoutes");

// const allowedOrigins = ['https://stellular-otter-74d475.netlify.app', 'https://teal-semifreddo-4f16b4.netlify.app'];

// app.use(cors({
//     origin: ['https://darkshop-ecommerce-client.vercel.app', 'https://darkshop-ecommerce-dashboard.vercel.app'],
//     credentials: true
// }));

// app.use(
// 	cors({
// 		origin: [
// 			"https://darkshop-ecommerce-client.vercel.app",
// 			"https://darkshop-ecommerce-dashboard.vercel.app",
// 		],
// 	}),
// );

const options = [
	cors({
		origin: "*",
		methods: "*",
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
];

app.use(options);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
	res.status(200).json({ message: "1.Happy Vercel? with ROOT route?!✅" }),
);
app.get("/api", (req, res) =>
	res.status(200).json({ message: "Happy hacking youth ?!✅" }),
);

app.use("/api/v1", authRoute);
app.use("/api/v2", categoryRoute);
app.use("/api/v3", productRoute);
app.use("/api/v4", adminRoute);
app.use("/api/v5", reviewRoute);

app.use("/api/v6", chatRoute);
app.use("/api/v7", MessageRoute);

app.use("/api/v8", orderRoute);
app.use("/api/v9", customerRoute);
app.use("/api/v10", clientHomeRoute);

mongooseDb_connect();

const server = app.listen(port, () => {
	console.log(`✅ Server is running at : http://localhost:${port}`);
});

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: "*",
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	},
});
// const io = require("socket.io")(server, {
// 	cors: [
// 		"http://localhost:5173",
// 		"http://localhost:5174",
// 		"http://localhost:5175",
// 	],
// });

let onlineUsers = [];
let chatId;

io.on("connection", socket => {
	socket.on("add_user", user => {
		console.log(`user connected is ~ ${socket.id}`);
		onlineUsers = [...onlineUsers, { ...user, socketid: socket.id }];
		io.emit("onlineUsers", onlineUsers);
	});

	socket.on("join", chatid => {
		console.log(`✅ user join room ~ ${chatid}`);
		chatId = chatid;
		socket.join(chatid);
	});

	socket.on("leave", chatid => {
		console.log(`⛔ user leave room ~ ${chatid}`);
		socket.leave(chatid);
	});

	socket.on("message_send", props => {
		const { _id, sender, chat, content, images, createdAt } = props;

		const nanAryRoomUsers = io.sockets.adapter.rooms.get(chat._id);
		const roomUsers = Array.from(nanAryRoomUsers);
		const chatUsersAry = [chat.seller, chat.customer];
		console.log({ roomUsers: roomUsers.length, msg: "now making msg" });

		if (roomUsers.length === 1) {
			console.log({ roomUsers: roomUsers.length, msg: "now send solo msg" });
			const f2 = chatUsersAry.find(u => u._id !== sender._id);
			const find = onlineUsers.find(ou => ou._id === f2._id);
			if (find) {
				return io.to(find.socketid).emit("unseen_recive_message", props);
			}
		} else {
			console.log({
				roomUsers: roomUsers.length,
				msg: "now send successed duo msg",
			});
			socket.broadcast.to(chat._id).emit("reciveMessage", props);
		}
	});

	socket.on("logout", () => {
		onlineUsers = onlineUsers.filter(ou => ou.socketid !== socket.id);
		io.emit("onlineUsers", onlineUsers);
	});

	socket.on("disconnect", () => {
		console.log(`user disconected is ~ ${socket.id}`);
		socket.leave(chatId);
		console.log(`⛔ chat leave room is ~ ${chatId}`);
		onlineUsers = onlineUsers.filter(ou => ou.socketid !== socket.id);
		io.emit("onlineUsers", onlineUsers);
	});
});
